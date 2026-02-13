"""Hume AI TTS MCP Server — Generate expressive speech via Hume's Octave TTS API."""

import os
import json
import base64
import httpx
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("hume_tts_mcp")

BASE_URL = "https://api.hume.ai/v0/tts"
API_KEY = os.environ.get("HUME_API_KEY", "")


def get_headers() -> dict:
    return {
        "Content-Type": "application/json",
        "X-Hume-Api-Key": API_KEY,
    }


# --- Input Models ---

class Utterance(BaseModel):
    """A single utterance (text segment) to synthesize."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    text: str = Field(
        ...,
        description="Text to synthesize as speech",
        min_length=1,
    )
    description: Optional[str] = Field(
        default=None,
        description="Acting instructions for this utterance (e.g., 'warm and reassuring', "
                    "'excited and energetic', 'slow and contemplative')",
    )


class HumeSynthesizeInput(BaseModel):
    """Input for synthesizing speech from text."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    utterances: List[Utterance] = Field(
        ...,
        description="List of text utterances to synthesize. First utterance should include voice specification.",
        min_length=1,
    )
    voice_id: Optional[str] = Field(
        default=None,
        description="Voice ID to use. Get IDs from hume_list_voices. If omitted, uses default voice.",
    )
    voice_name: Optional[str] = Field(
        default=None,
        description="Voice name to use (alternative to voice_id). Set provider to 'HUME_AI' for library voices.",
    )
    voice_provider: Optional[str] = Field(
        default=None,
        description="Voice provider: 'CUSTOM_VOICE' (default, your voices) or 'HUME_AI' (voice library)",
    )
    output_dir: Optional[str] = Field(
        default=None,
        description="Directory to save audio files. If provided, saves each utterance as a separate MP3 file.",
    )
    filename_prefix: Optional[str] = Field(
        default="utterance",
        description="Prefix for output filenames (e.g., 'slide' produces slide-01.mp3, slide-02.mp3)",
    )


class HumeListVoicesInput(BaseModel):
    """Input for listing available voices."""
    model_config = ConfigDict(extra="forbid")

    provider: Optional[str] = Field(
        default=None,
        description="Filter by provider: 'CUSTOM_VOICE' or 'HUME_AI'",
    )


class HumeDesignVoiceInput(BaseModel):
    """Input for designing a new voice from a natural language description."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    name: str = Field(
        ...,
        description="Name for the new voice (e.g., 'RetroNarrator', 'WarmInstructor')",
        min_length=1,
        max_length=100,
    )
    description: str = Field(
        ...,
        description="Natural language description of the voice characteristics "
                    "(e.g., 'warm male narrator, 1960s educational film tone, slightly earnest, measured pace')",
        min_length=1,
    )
    sample_text: Optional[str] = Field(
        default="Welcome to today's training session. We're going to cover some important concepts that will help you work more effectively.",
        description="Sample text to generate a preview with the new voice",
    )


class HumeBatchSynthesizeInput(BaseModel):
    """Input for batch synthesis — generate audio for multiple slides at once."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    texts: List[str] = Field(
        ...,
        description="List of text segments, one per slide. Each becomes a separate audio file.",
        min_length=1,
    )
    voice_id: Optional[str] = Field(
        default=None,
        description="Voice ID to use for all segments",
    )
    acting_instructions: Optional[str] = Field(
        default=None,
        description="Acting instructions applied to all segments (e.g., 'warm, measured, educational')",
    )
    output_dir: str = Field(
        ...,
        description="Directory to save audio files (e.g., 'assets/module-01/')",
    )
    filename_prefix: Optional[str] = Field(
        default="slide",
        description="Prefix for output filenames (e.g., 'slide' produces slide-01.mp3, slide-02.mp3)",
    )


# --- Tools ---

@mcp.tool(
    name="hume_synthesize",
    annotations={
        "title": "Synthesize Speech with Hume TTS",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def hume_synthesize(params: HumeSynthesizeInput) -> str:
    """Synthesize speech from text using Hume AI's Octave TTS.

    Generates expressive, natural-sounding audio from text utterances.
    Can save output as MP3 files or return base64-encoded audio data.

    Returns:
        JSON with audio data or file paths for each utterance.
    """
    utterances_payload = []
    for i, utt in enumerate(params.utterances):
        entry: dict = {"text": utt.text}
        # Add voice to first utterance
        if i == 0:
            if params.voice_id:
                entry["voice"] = {"id": params.voice_id}
            elif params.voice_name:
                voice_spec: dict = {"name": params.voice_name}
                if params.voice_provider:
                    voice_spec["provider"] = params.voice_provider
                entry["voice"] = voice_spec
        if utt.description:
            entry["description"] = utt.description
        utterances_payload.append(entry)

    body = {
        "version": "2",
        "utterances": utterances_payload,
    }

    async with httpx.AsyncClient(timeout=120) as client:
        resp = await client.post(
            f"{BASE_URL}/json",
            headers=get_headers(),
            json=body,
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
            "hint": "Check API key and voice ID. Use hume_list_voices to see available voices.",
        })

    data = resp.json()
    results = []

    # If output_dir specified, save files
    if params.output_dir:
        os.makedirs(params.output_dir, exist_ok=True)
        generations = data.get("generations", [])
        for i, gen in enumerate(generations):
            audio_b64 = gen.get("audio")
            if audio_b64:
                filename = f"{params.filename_prefix}-{str(i + 1).zfill(2)}.mp3"
                filepath = os.path.join(params.output_dir, filename)
                with open(filepath, "wb") as f:
                    f.write(base64.b64decode(audio_b64))
                results.append({
                    "index": i,
                    "file": filepath,
                    "duration_seconds": gen.get("duration_seconds"),
                })
            else:
                results.append({"index": i, "error": "No audio in response"})

        return json.dumps({
            "status": "completed",
            "files": results,
            "output_dir": params.output_dir,
        })

    # Otherwise return metadata (not base64 — too large for context)
    generations = data.get("generations", [])
    for i, gen in enumerate(generations):
        results.append({
            "index": i,
            "duration_seconds": gen.get("duration_seconds"),
            "has_audio": bool(gen.get("audio")),
        })

    return json.dumps({
        "status": "completed",
        "generations": results,
        "note": "Audio data available but not included in response. Set output_dir to save as files.",
    })


@mcp.tool(
    name="hume_batch_synthesize",
    annotations={
        "title": "Batch Synthesize Slide Audio",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def hume_batch_synthesize(params: HumeBatchSynthesizeInput) -> str:
    """Generate audio files for multiple slides in one call.

    Takes a list of text segments (one per slide) and generates individual MP3
    files named sequentially (slide-01.mp3, slide-02.mp3, etc.).

    Ideal for producing all narration for a training module at once.

    Returns:
        JSON with file paths and durations for each slide's audio.
    """
    os.makedirs(params.output_dir, exist_ok=True)
    results = []
    errors = []

    for i, text in enumerate(params.texts):
        utterance: dict = {"text": text}

        # Add voice to every request
        if params.voice_id:
            utterance["voice"] = {"id": params.voice_id}

        if params.acting_instructions:
            utterance["description"] = params.acting_instructions

        body = {
            "version": "2",
            "utterances": [utterance],
        }

        try:
            async with httpx.AsyncClient(timeout=120) as client:
                resp = await client.post(
                    f"{BASE_URL}/json",
                    headers=get_headers(),
                    json=body,
                )

            if resp.status_code != 200:
                errors.append({"index": i, "status_code": resp.status_code, "message": resp.text})
                continue

            data = resp.json()
            generations = data.get("generations", [])

            if generations and generations[0].get("audio"):
                filename = f"{params.filename_prefix}-{str(i + 1).zfill(2)}.mp3"
                filepath = os.path.join(params.output_dir, filename)
                with open(filepath, "wb") as f:
                    f.write(base64.b64decode(generations[0]["audio"]))
                results.append({
                    "index": i,
                    "file": filepath,
                    "duration_seconds": generations[0].get("duration_seconds"),
                })
            else:
                errors.append({"index": i, "error": "No audio in response"})

        except Exception as e:
            errors.append({"index": i, "error": str(e)})

    return json.dumps({
        "status": "completed",
        "total_slides": len(params.texts),
        "successful": len(results),
        "failed": len(errors),
        "files": results,
        "errors": errors if errors else None,
        "output_dir": params.output_dir,
    })


@mcp.tool(
    name="hume_list_voices",
    annotations={
        "title": "List Available Voices",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True,
    },
)
async def hume_list_voices(params: Optional[HumeListVoicesInput] = None) -> str:
    """List available TTS voices from your account and the Hume voice library.

    Returns voice IDs and names for use with synthesis tools.
    """
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            f"{BASE_URL}/voices",
            headers=get_headers(),
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
        })

    data = resp.json()

    # Filter by provider if specified
    if params and params.provider:
        voices = [v for v in data if v.get("provider") == params.provider]
    else:
        voices = data

    # Return concise list
    result = []
    for v in voices:
        result.append({
            "id": v.get("id"),
            "name": v.get("name"),
            "provider": v.get("provider"),
            "description": v.get("description", "")[:200],
        })

    return json.dumps({"voices": result, "count": len(result)})


@mcp.tool(
    name="hume_design_voice",
    annotations={
        "title": "Design a Custom Voice",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def hume_design_voice(params: HumeDesignVoiceInput) -> str:
    """Create a new custom voice from a natural language description.

    Describe the voice characteristics (tone, accent, pace, emotion) and Hume
    will generate a voice matching that description. Returns a voice ID for use
    with synthesis tools.

    Returns:
        JSON with voice ID, name, and preview audio info.
    """
    body = {
        "name": params.name,
        "description": params.description,
    }

    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{BASE_URL}/voices/design",
            headers=get_headers(),
            json=body,
        )

    if resp.status_code not in (200, 201):
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
            "hint": "Check API key and description. Try a more specific voice description.",
        })

    data = resp.json()
    return json.dumps({
        "status": "created",
        "voice_id": data.get("id"),
        "name": data.get("name"),
        "description": data.get("description"),
        "next_step": "Use this voice_id with hume_synthesize or hume_batch_synthesize.",
    })


if __name__ == "__main__":
    mcp.run()

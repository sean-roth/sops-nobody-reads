"""Gamma MCP Server — Generate presentations, documents, and websites via Gamma API."""

import os
import json
import httpx
from typing import Optional, List
from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("gamma_mcp")

BASE_URL = "https://public-api.gamma.app/v1.0"
API_KEY = os.environ.get("GAMMA_API_KEY", "")


def get_headers() -> dict:
    return {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
    }


# --- Enums ---

class TextMode(str, Enum):
    GENERATE = "generate"
    CONDENSE = "condense"
    PRESERVE = "preserve"


class Format(str, Enum):
    PRESENTATION = "presentation"
    DOCUMENT = "document"
    SOCIAL = "social"
    WEBPAGE = "webpage"


class ImageSource(str, Enum):
    AI_GENERATED = "aiGenerated"
    PICTOGRAPHIC = "pictographic"
    PEXELS = "pexels"
    GIPHY = "giphy"
    WEB_ALL = "webAllImages"
    WEB_FREE = "webFreeToUse"
    WEB_COMMERCIAL = "webFreeToUseCommercially"
    PLACEHOLDER = "placeholder"
    NO_IMAGES = "noImages"


class TextAmount(str, Enum):
    BRIEF = "brief"
    MEDIUM = "medium"
    DETAILED = "detailed"
    EXTENSIVE = "extensive"


class ExportFormat(str, Enum):
    PDF = "pdf"
    PPTX = "pptx"


# --- Input Models ---

class GammaGenerateInput(BaseModel):
    """Input for generating a new gamma (presentation, document, etc.)."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    input_text: str = Field(
        ...,
        description="Content to generate from. Can be a short prompt, detailed outline, or full text. "
                    "Include image URLs inline where you want them. Use \\n---\\n to force card breaks.",
        min_length=1,
    )
    text_mode: TextMode = Field(
        default=TextMode.GENERATE,
        description="How to handle input text: 'generate' (rewrite/expand), 'condense' (summarize), 'preserve' (keep exact text)",
    )
    format: Format = Field(
        default=Format.PRESENTATION,
        description="Output format: presentation, document, social, or webpage",
    )
    num_cards: Optional[int] = Field(
        default=10,
        description="Number of slides/cards to generate (1-75)",
        ge=1,
        le=75,
    )
    card_split: Optional[str] = Field(
        default="auto",
        description="'auto' (respect numCards) or 'inputTextBreaks' (split on \\n---\\n markers)",
    )
    theme_id: Optional[str] = Field(
        default=None,
        description="Theme ID from your Gamma workspace. Use gamma_list_themes to get available themes.",
    )
    additional_instructions: Optional[str] = Field(
        default=None,
        description="Extra instructions for content, layout, or style (max 2000 chars)",
        max_length=2000,
    )
    export_as: Optional[ExportFormat] = Field(
        default=None,
        description="Export format: 'pdf' or 'pptx'. Omit to only get Gamma URL.",
    )
    # Text options
    text_amount: Optional[TextAmount] = Field(
        default=None,
        description="How much text per card: brief, medium, detailed, extensive",
    )
    text_tone: Optional[str] = Field(
        default=None,
        description="Tone/voice for generated text (e.g., 'professional, warm', 'casual, humorous')",
        max_length=500,
    )
    text_audience: Optional[str] = Field(
        default=None,
        description="Target audience (e.g., 'new employees', 'C-suite executives', 'seven year olds')",
        max_length=500,
    )
    text_language: Optional[str] = Field(
        default="en",
        description="Output language code (default: 'en')",
    )
    # Image options
    image_source: Optional[ImageSource] = Field(
        default=None,
        description="Image source. Use 'noImages' if providing your own image URLs in input_text.",
    )
    image_style: Optional[str] = Field(
        default=None,
        description="AI image style directive (e.g., 'photorealistic', '1960s educational illustration, muted colors')",
        max_length=500,
    )
    image_model: Optional[str] = Field(
        default=None,
        description="AI image model (e.g., 'flux-1-pro', 'imagen-4-pro'). Only applies when image_source is 'aiGenerated'.",
    )
    # Folder
    folder_ids: Optional[List[str]] = Field(
        default=None,
        description="Folder IDs to save the gamma into",
    )


class GammaStatusInput(BaseModel):
    """Input for checking generation status."""
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    generation_id: str = Field(
        ...,
        description="Generation ID returned from gamma_generate",
        min_length=1,
    )


# --- Tools ---

@mcp.tool(
    name="gamma_generate",
    annotations={
        "title": "Generate Gamma Presentation/Document",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def gamma_generate(params: GammaGenerateInput) -> str:
    """Generate a presentation, document, social post, or website using Gamma AI.

    Submits a generation request and returns a generation ID. Use gamma_check_status
    to poll for completion and get the final Gamma URL and optional export download link.

    Returns:
        JSON with generationId for status polling.
    """
    body: dict = {
        "inputText": params.input_text,
        "textMode": params.text_mode.value,
        "format": params.format.value,
    }

    if params.num_cards is not None:
        body["numCards"] = params.num_cards
    if params.card_split:
        body["cardSplit"] = params.card_split
    if params.theme_id:
        body["themeId"] = params.theme_id
    if params.additional_instructions:
        body["additionalInstructions"] = params.additional_instructions
    if params.export_as:
        body["exportAs"] = params.export_as.value
    if params.folder_ids:
        body["folderIds"] = params.folder_ids

    # Text options
    text_options = {}
    if params.text_amount:
        text_options["amount"] = params.text_amount.value
    if params.text_tone:
        text_options["tone"] = params.text_tone
    if params.text_audience:
        text_options["audience"] = params.text_audience
    if params.text_language:
        text_options["language"] = params.text_language
    if text_options:
        body["textOptions"] = text_options

    # Image options
    image_options = {}
    if params.image_source:
        image_options["source"] = params.image_source.value
    if params.image_style:
        image_options["style"] = params.image_style
    if params.image_model:
        image_options["model"] = params.image_model
    if image_options:
        body["imageOptions"] = image_options

    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{BASE_URL}/generations",
            headers=get_headers(),
            json=body,
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
            "hint": "Check API key and input parameters. Use gamma_list_themes to verify theme IDs.",
        })

    data = resp.json()
    return json.dumps({
        "generationId": data.get("generationId"),
        "status": "submitted",
        "next_step": "Call gamma_check_status with this generationId to poll for completion.",
    })


@mcp.tool(
    name="gamma_check_status",
    annotations={
        "title": "Check Gamma Generation Status",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True,
    },
)
async def gamma_check_status(params: GammaStatusInput) -> str:
    """Check the status of a Gamma generation request.

    Poll this endpoint after calling gamma_generate. Returns 'pending' while
    generating, 'completed' with the Gamma URL and optional export link when done.

    Returns:
        JSON with status, gammaUrl, exportUrl (if requested), and credits used.
    """
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            f"{BASE_URL}/generations/{params.generation_id}",
            headers=get_headers(),
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
        })

    data = resp.json()
    result = {
        "generationId": data.get("generationId"),
        "status": data.get("status"),
    }

    if data.get("status") == "completed":
        result["gammaUrl"] = data.get("gammaUrl")
        if "exportUrl" in data:
            result["exportUrl"] = data["exportUrl"]
        if "credits" in data:
            result["credits"] = data["credits"]
    elif data.get("status") == "pending":
        result["hint"] = "Still generating. Wait a few seconds and poll again."

    return json.dumps(result)


@mcp.tool(
    name="gamma_list_themes",
    annotations={
        "title": "List Gamma Themes",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True,
    },
)
async def gamma_list_themes() -> str:
    """List available themes from your Gamma workspace.

    Returns theme IDs and names for use with gamma_generate's theme_id parameter.
    """
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            f"{BASE_URL}/themes",
            headers=get_headers(),
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
        })

    return json.dumps(resp.json())


@mcp.tool(
    name="gamma_list_folders",
    annotations={
        "title": "List Gamma Folders",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True,
    },
)
async def gamma_list_folders() -> str:
    """List available folders from your Gamma workspace.

    Returns folder IDs and names for organizing generated gammas.
    """
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            f"{BASE_URL}/folders",
            headers=get_headers(),
        )

    if resp.status_code != 200:
        return json.dumps({
            "error": True,
            "status_code": resp.status_code,
            "message": resp.text,
        })

    return json.dumps(resp.json())


if __name__ == "__main__":
    mcp.run()

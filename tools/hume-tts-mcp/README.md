# Hume AI TTS MCP Server

MCP server for generating expressive speech via Hume AI's Octave TTS API.

## Setup

```bash
cd tools/hume-tts-mcp
pip install -r requirements.txt
export HUME_API_KEY="your-api-key-here"
```

## Tools

| Tool | Description |
|------|-------------|
| `hume_synthesize` | Synthesize speech from text utterances with voice and acting controls |
| `hume_batch_synthesize` | Generate audio for all slides in a module at once (slide-01.mp3, slide-02.mp3, etc.) |
| `hume_list_voices` | List available voices (custom and library) |
| `hume_design_voice` | Create a new custom voice from a natural language description |

## Claude Desktop Config

```json
{
  "mcpServers": {
    "hume_tts": {
      "command": "python",
      "args": ["path/to/tools/hume-tts-mcp/server.py"],
      "env": {
        "HUME_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Typical Workflow

### 1. Design a project voice
```
hume_design_voice(
  name="RetroNarrator",
  description="warm male narrator, 1960s educational film tone, slightly earnest, measured pace"
)
```

### 2. Generate all module audio
```
hume_batch_synthesize(
  texts=["slide 1 narration...", "slide 2 narration...", ...],
  voice_id="<voice-id-from-step-1>",
  acting_instructions="warm, measured, educational",
  output_dir="assets/module-01/",
  filename_prefix="slide"
)
```

### 3. Output
```
assets/module-01/
├── slide-01.mp3
├── slide-02.mp3
├── slide-03.mp3
└── ...
```

## Cost Estimate

At Hume Growth plan pricing (~$0.10/1,000 chars):
- A 25-minute module (~20,000 characters) costs ~$2.00
- A 6-module course costs ~$12.00 total

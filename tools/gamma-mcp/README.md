# Gamma MCP Server

MCP server for generating presentations, documents, social posts, and websites via the Gamma API.

## Setup

```bash
cd tools/gamma-mcp
pip install -r requirements.txt
export GAMMA_API_KEY="your-api-key-here"
```

## Tools

| Tool | Description |
|------|-------------|
| `gamma_generate` | Generate a presentation/document/social/webpage from text input |
| `gamma_check_status` | Poll generation status and get final URL/export link |
| `gamma_list_themes` | List available workspace themes |
| `gamma_list_folders` | List available workspace folders |

## Claude Desktop Config

```json
{
  "mcpServers": {
    "gamma": {
      "command": "python",
      "args": ["path/to/tools/gamma-mcp/server.py"],
      "env": {
        "GAMMA_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage Flow

1. Call `gamma_generate` with your content and options
2. Receive a `generationId`
3. Poll `gamma_check_status` until status is `completed`
4. Get the `gammaUrl` (and `exportUrl` if PDF/PPTX export was requested)

## Key Parameters

- `text_mode`: `generate` (expand), `condense` (summarize), `preserve` (keep exact text)
- `format`: `presentation`, `document`, `social`, `webpage`
- `image_source`: `aiGenerated`, `noImages` (when providing your own URLs), `pexels`, etc.
- `image_style`: Style directive for AI images (e.g., '1960s educational illustration')
- `export_as`: `pdf` or `pptx` for downloadable export

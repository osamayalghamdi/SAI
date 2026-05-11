# SAI — Personal AI Workspace

Local LLM stack powered by Docker. Self-hosted AI assistant with AnythingLLM as the frontend and Ollama running models locally.

## What's inside

| Service | What it does |
|---|---|
| **AnythingLLM** | Chat UI + RAG workspace — upload documents, create agents, chat with your data |
| **Ollama** | Local LLM runner — serves models like Gemma 4, Llama, Mistral, etc. |

## Quick start

```bash
docker compose -f docker/docker-compose.yml up -d
```

Open **http://localhost:3001** in your browser.

## Changing the model

Edit `docker/.env`:

```
OLLAMA_MODEL=gemma4:latest
```

Swap to any Ollama-compatible model — `llama3.2:latest`, `mistral:latest`, `qwen2.5:latest`, etc. The model auto-pulls on startup.

## Stack

- **AnythingLLM** (mintplexlabs/anythingllm)
- **Ollama** (ollama/ollama)
- Built-in LanceDB vector store
- Local embeddings via `nomic-embed-text`

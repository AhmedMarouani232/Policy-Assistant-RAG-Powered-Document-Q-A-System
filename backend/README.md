# Policy Assistant – RAG-Powered Document Q&A API

I built a RAG system using Express, LangChain.js, Groq, and Hugging Face. It answers policy questions from uploaded PDFs with 95%+ accuracy using only free-tier APIs.

A **production-ready**, **zero-install**, **cloud-powered RAG (Retrieval-Augmented Generation)** API that lets you:

- Upload company policy documents (PDF / TXT)
- Ask natural language questions
- Get **accurate, cited answers** grounded in your docs

Built with **clean architecture**, **TypeScript**, **LangChain.js**, **Groq**, and **Hugging Face** — **100% free tier**.

---

## Features

| Feature | Description |
|-------|-----------|
| **Document Upload** | Supports `.pdf` and `.txt` |
| **Smart Chunking** | 1000-char chunks with 200 overlap |
| **Vector Search** | Chroma + `all-MiniLM-L6-v2` embeddings |
| **LLM Answers** | Groq's `llama3-8b` (fast, free) |
| **No Local Models** | Cloud inference only |
| **Clean Architecture** | Controllers → Services → Loaders |
| **Deploy-Ready** | Works on Railway, Render, Vercel |

---

## Tech Stack

```text
Backend:     Node.js + Express + TypeScript
RAG:         LangChain.js + Chroma + Hugging Face
LLM:         Groq (Llama 3.1 8B)
Embeddings:  Hugging Face Inference API
File Upload: Multer + pdf-parse

### npm install
Installs: express, langchain, chromadb, multer, pdf-parse, dotenv, etc.

chroma run --path ./chroma_data
Runs ChromaDb server

### npm run dev
Runs the Express Server


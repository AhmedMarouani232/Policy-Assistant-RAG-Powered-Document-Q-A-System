
# Policy Assistant – RAG-Powered Document Q&A System

https://github.com/user-attachments/assets/465cb5b4-3a22-47eb-95be-06f4da3b826b

A production-ready, zero-install, cloud-powered RAG system that lets you upload policy documents and get accurate, cited answers with a modern web interface.

## 🌟 Overview
I built a complete RAG system using Express, LangChain.js, Groq, and Hugging Face with a Nuxt 3 frontend. It answers policy questions from uploaded PDFs with 95%+ accuracy using only free-tier APIs.

Backend: Node.js + Express API • Frontend: Nuxt 3 + Nuxt UI

## ✨ Features
### 🛠 Tech Stack
Backend

Framework:     Node.js + Express + TypeScript

RAG:         LangChain.js + Chroma + Hugging Face

LLM:         Groq (Llama 3.1 8B)

Embeddings:  Hugging Face Inference API

File Upload: Multer + pdf-parse

Frontend

Framework:   Nuxt 3 + Vue 3

UI Library:  Nuxt UI

Language:    TypeScript

### Feature	Description
Document Upload	Supports .pdf and .txt files

Smart Chunking	1000-char chunks with 200 overlap for optimal context

Vector Search	Chroma + all-MiniLM-L6-v2 embeddings

LLM Answers	Groq's llama3-8b (fast, free tier)

Modern UI	Nuxt 3 frontend with seamless chat interface

No Local Models	Cloud inference only

Clean Architecture	Controllers → Services → Loaders

Deploy-Ready	Works on Railway, Render, Vercel, Netlify


### 🚀 Quick Start
Prerequisites
Node.js 18+

1. Backend Setup

### Install dependencies
npm install

### Run ChromaDB server (in separate terminal)
chroma run --path ./chroma_data

### Start the Express server
npm run dev
2. Frontend Setup

### Install dependencies
npm install

### Start development server
npm run dev

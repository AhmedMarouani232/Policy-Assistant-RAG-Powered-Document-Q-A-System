import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { ChatGroq } from '@langchain/groq';
import { Document } from '@langchain/core/documents';
import { getVectorStore, setVectorStore } from './vector.store.ts';
import { loadDocument } from '../loaders/document.loader.ts';
import fs from 'fs';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import 'dotenv/config';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export async function indexDocuments(files: Express.Multer.File[]) {
  const docs: Document[] = [];

  for (const file of files) {
    const loaded = await loadDocument(file.path, file.originalname);

    // Sanitize metadata for each document
    loaded.forEach(d => {
      d.metadata = {
        filename: file.originalname,
        source: file.path,
      };
    });

    docs.push(...loaded);

    fs.unlinkSync(file.path); // cleanup
  }

  // Split into chunks
  const chunks = await splitter.splitDocuments(docs);

  // Ensure chunk metadata is safe (primitives only)
  chunks.forEach(c => {
    c.metadata = {
      filename: c.metadata?.filename || "unknown",
      source: c.metadata?.source || "unknown",
    };
  });

  // Embeddings
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HF_API_KEY!,
  });

  // Create vector store — metadata is already inside each Document
  const vectorStore = await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: "policies",
  });

  setVectorStore(vectorStore);

  return chunks.length;
}


export async function queryRAG(question: string) {
  const vectorStore = getVectorStore();
  if (!vectorStore) throw new Error("No documents indexed yet.");

  const retriever = vectorStore.asRetriever({ k: 4 });
  const relevant = await retriever._getRelevantDocuments(question);

  const llm = new ChatGroq({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY!,
  });

  const context = relevant.map(d => d.pageContent).join("\n\n");
  const prompt = `Use ONLY this context. If unsure, say "I don't know."

Context:
${context}

Question: ${question}

Answer in 1-2 sentences:`;

  const result = await llm.invoke(prompt);
  return result.content;
}

import type { Request, Response } from 'express';
import { queryRAG } from '../services/rag.service.ts';
import type { QueryRequest } from '../types/index.ts';

export async function askQuestion(req: Request<{}, {}, QueryRequest>, res: Response) {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ answer: 'Question is required' });
    const answer = await queryRAG(question);
    res.json({ answer });
  } catch (error: any) {
    res.status(500).json({ answer: error.message });
  }
}
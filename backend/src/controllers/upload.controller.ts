import express from "express";
import type { Request, Response } from "express";
import { indexDocuments } from '../services/rag.service.ts';
import type {UploadResponse}  from '../types/index.ts';


export async function uploadDocs(req: Request, res: Response<UploadResponse>) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const count = await indexDocuments(req.files as Express.Multer.File[]);
    res.json({ message: `Indexed ${count} chunks from ${req.files.length} files` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
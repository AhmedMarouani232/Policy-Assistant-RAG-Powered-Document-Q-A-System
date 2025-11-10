import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { TextLoader } from "@langchain/classic/document_loaders/fs/text"
import path from 'path';

export async function loadDocument(filePath: string, name: string) {
    const ext = path.extname(name).toLowerCase();
    if(ext == ".pdf"){
        const Loaded = new PDFLoader(filePath);
        return await Loaded.load();
    }else if (ext == ".txt"){
        const loader = new TextLoader(filePath);
        return await loader.load();    
    }
    throw new Error('Unsupported file type. Use PDF or TXT.');
}
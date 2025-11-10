import { Chroma } from '@langchain/community/vectorstores/chroma';


let vectorStore: Chroma | null = null;

export const getVectorStore = () => vectorStore;
export const setVectorStore = (store: Chroma) => { vectorStore = store; };
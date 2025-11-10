import { Router } from 'express';
import { uploadDocs } from '../controllers/upload.controller.ts';
import multer from 'Multer';


const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('docs'), uploadDocs);

export default router;


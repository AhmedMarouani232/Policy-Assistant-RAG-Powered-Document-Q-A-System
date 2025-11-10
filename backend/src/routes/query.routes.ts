import { Router } from 'express';
import { askQuestion } from '../controllers/query.controller.ts';

const router = Router();

router.post('/', askQuestion);

export default router;
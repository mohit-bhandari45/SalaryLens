import { Router } from 'express';
import { getMySalary, createSalary } from '../controllers/salaryController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/me', authenticate as any, getMySalary as any);
router.post('/', authenticate as any, createSalary as any);

export default router;

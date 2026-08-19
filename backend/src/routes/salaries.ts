import { Router } from 'express';
import { getSalaries } from '../controllers/salaryController.js';

const router = Router();

// Example endpoint to get salaries (Mock logic for now, will implement properly later)
router.get('/', getSalaries);

export default router;

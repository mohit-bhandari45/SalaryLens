import { Router } from 'express';
import { getHealthCheck } from '../controllers/healthController.js';

const router = Router();

// Basic health check endpoint
router.get('/', getHealthCheck);

export default router;

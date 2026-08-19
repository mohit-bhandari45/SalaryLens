import express from 'express';
import cors from 'cors';

// Route imports
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import salaryRoutes from './routes/salaries.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/salaries', salaryRoutes);

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SalaryLens API is running' });
});

// Example endpoint to get salaries (Mock logic for now, will implement properly later)
app.get('/api/salaries', async (req, res) => {
    try {
        const salaries = await prisma.salarySubmission.findMany();
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch salaries' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

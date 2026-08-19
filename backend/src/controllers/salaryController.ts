import type { Request, Response } from 'express';
import prisma from '../config/db.js';

export const getSalaries = async (req: Request, res: Response) => {
    try {
        const salaries = await prisma.salarySubmission.findMany();
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch salaries' });
    }
};

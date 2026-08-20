import type { Response } from 'express';
import prisma from '../config/db.js';
import type { AuthRequest } from '../middleware/auth.js';
import { salarySubmissionSchema } from '../validations/salary.js';

export const getMySalary = async (req: AuthRequest, res: Response) => {
    try {
        const submission = await prisma.salarySubmission.findUnique({
            where: { userId: req.user!.id },
        });
        res.json(submission || null);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch salary' });
    }
};

export const createSalary = async (req: AuthRequest, res: Response) => {
    try {
        const parsed = salarySubmissionSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: parsed.error.flatten().fieldErrors,
            });
        }

        const submission = await prisma.salarySubmission.upsert({
            where: { userId: req.user!.id },
            update: parsed.data,
            create: {
                ...parsed.data,
                userId: req.user!.id,
            },
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create salary submission' });
    }
};

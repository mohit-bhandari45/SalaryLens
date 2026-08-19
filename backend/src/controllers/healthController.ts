import type { Request, Response } from 'express';

export const getHealthCheck = (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'SalaryLens API is running' });
};

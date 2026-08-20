import { z } from 'zod';

export const salarySubmissionSchema = z.object({
    role: z.string().min(1, 'Role is required').max(100),
    experienceYears: z.number().min(0, 'Experience must be non-negative').max(50),
    location: z.string().min(1, 'Location is required').max(100),
    salary: z.number().positive('Salary must be positive'),
    salaryPeriod: z.enum({ monthly: 'monthly', annually: 'annually' }),
    companyType: z.enum({
        agency: 'agency',
        startup: 'startup',
        product: 'product',
        service: 'service',
        freelance: 'freelance',
        government: 'government',
        non_profit: 'non_profit',
    }),
    workMode: z.enum({ remote: 'remote', hybrid: 'hybrid', onsite: 'onsite' }),
});

export type SalarySubmissionInput = z.infer<typeof salarySubmissionSchema>;

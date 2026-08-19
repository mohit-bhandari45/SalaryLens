import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_salarylens_key_2026';

export const generateToken = (userId: string, username: string) => {
    return jwt.sign(
        { id: userId, username },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

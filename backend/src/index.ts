import dotenv from 'dotenv';
import prisma from './db.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await prisma.$connect();
        console.log(`✅ Successfully connected to the database`);
    } catch (error) {
        console.error(`❌ Failed to connect to the database:`, error);
    }
});

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './db.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    // Check if an account with this email exists but without googleId
                    const email = profile.emails?.[0]?.value;
                    if (email) {
                        user = await prisma.user.findUnique({ where: { email } });
                        if (user) {
                            // Link google ID to existing account
                            user = await prisma.user.update({
                                where: { email },
                                data: { googleId: profile.id },
                            });
                        }
                    }
                }

                if (!user) {
                    // Create new user
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            email: profile.emails?.[0]?.value || '',
                            username: profile.displayName || `user_${profile.id}`,
                        },
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;

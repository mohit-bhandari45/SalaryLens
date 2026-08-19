import { Router } from 'express';
import passport from 'passport';
import { register, login, googleCallback } from '../controllers/authController.js';

const router = Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Google Sign-In init
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// Google callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/auth?error=GoogleAuthFailed' }), googleCallback);

export default router;

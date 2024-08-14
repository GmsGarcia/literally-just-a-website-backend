import express from 'express';
import cors from 'cors';
import db from './src/configs/db.js';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import initializePassport from './src/strategies/login.js';
//Routes
import { registerRouter } from './src/routes/auth/register.js';
import { dashboardRouter } from './src/routes/auth/dashboard.js';
import { logoutRouter } from './src/routes/auth/logout.js';
import { chatRouter } from './chat.js';

const app = express();
dotenv.config()

initializePassport(passport)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Login failed!' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json({ message: 'Login successful!', user: user });
        });
    })(req, res, next);
});

app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/logout', logoutRouter)
app.use('/chat', chatRouter)

app.listen(8550, () => {
    console.log('App listening on http://localhost:8550');
});

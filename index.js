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

app.get('/', (req, res) => {
    res.send(':P')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/sucesso',
    failureRedirect: '/falha',
    failureMessage: true
}))

app.get('/sucesso', (req, res) => {
    res.send('Login successful!');
});

app.get('/falha', (req, res) => {
    res.send('Login failed!');
});


app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/logout', logoutRouter)


app.listen('8550')
import express from 'express';
import db from './src/configs/db.js';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import { registerRouter } from './src/routes/register.js';
import initializePassport from './src/strategies/login.js';

dotenv.config();
const app = express();

initializePassport(passport)

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
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

app.use('/register', registerRouter)

app.listen('8550')
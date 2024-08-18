import express from 'express';
import cors from 'cors';
import session from 'express-session';
//Importing Routes
import { chatRouter } from './chat.js';
import { infoRouter } from './src/routes/auth/userInfo.js';
import { authRouter } from './src/routes/auth/auth.js';

const app = express();

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

// Using routes
app.use('/chat', chatRouter)
app.use('/info', infoRouter)
app.use(authRouter)

app.listen(8550, () => {
    console.log('App listening on http://localhost:8550');
});

import express from 'express';
import cors from 'cors';
import session from 'express-session';
//Importing Routes
import { chatRouter } from './chat.js';
import { infoRouter } from './src/routes/auth/userInfo.js';
import { authRouter } from './src/routes/auth/auth.js';

const app = express();

// parsing text
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// storing user's session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
// using cors to allow frontend to communicate with backend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Using routes
app.use(chatRouter)
app.use('/info', infoRouter)
app.use(authRouter)

app.listen(8550, () => {
    console.log('App listening on http://localhost:8550');
});
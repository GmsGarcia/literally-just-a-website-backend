import express from 'express';
import db from './src/configs/db.js';
const app = express();

// Routers
import { registerRouter } from './src/routes/register.js';

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send(':P')
})

app.use('/register', registerRouter)

app.listen('8550')
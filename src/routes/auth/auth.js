import express from 'express'
import bcrypt from 'bcrypt'
import db from '../../configs/db.js'
import bodyParser from 'body-parser';
import initializePassport from '../../strategies/login.js';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.use(bodyParser.json())
authRouter.use(express.urlencoded({extended: false}))

//Passport Initialization (authentication middleware for Node.js)
initializePassport(passport)
authRouter.use(passport.initialize())
authRouter.use(passport.session())


// "Dashboard" = This code checks if you are logged in or not
authRouter.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in :(' })
    } else {
        res.status(200).json({ message: 'Welcome to your dashboard!' })
    }
})

// Logs user out of the session
authRouter.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Logout error:', err); 
            return res.status(500).json({ message: 'An error occurred during logout.' });
        } else {
            console.log('Logout successful')
            return res.status(200).json({ message: 'Successfully logged out.' })
        }
    })
})

// Route that registers users to the database
authRouter.post('/register', async (req, res) => {
    try {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, await bcrypt.hash(req.body.password, 10)], function (err) {
            if (err) throw res.send("desculpa nao deu :P"), console.log(err);
            res.send("Registado :P")
        })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).send("SERVER ERROR :P")
    }
})

// Login Route
authRouter.post('/login', (req, res, next) => {
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
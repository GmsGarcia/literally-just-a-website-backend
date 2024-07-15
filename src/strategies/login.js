import { Strategy as localStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import db from '../configs/db.js'

function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function initializePassport(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Username does not exist' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    };


    passport.use(new localStrategy(authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) {
                return done(err);
            }
            done(null, results[0]);
        });
    })
}

export default initializePassport
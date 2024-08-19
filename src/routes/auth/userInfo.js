import express from "express";
import passport from "passport";
import initializePassport from '../../strategies/login.js';

export const infoRouter = express.Router();

//Initializing passport
initializePassport(passport)
infoRouter.use(passport.initialize())
infoRouter.use(passport.session())

//Just prints user's data
infoRouter.get("/", async (req, res) => {
  return res.status(200).json({ user: req.user });
});

// Random route that selects everything from users table
infoRouter.get('/select', (req, res) => {
  db.query('SELECT * FROM users', function (err, result) {
      if (err) throw res.send("error :P");
      res.send(result)
  }) 
})
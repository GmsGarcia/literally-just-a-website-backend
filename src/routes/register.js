import express from 'express'
import bcrypt from 'bcrypt'
import db from '../configs/db.js'
import bodyParser from 'body-parser';

export const registerRouter = express.Router();

registerRouter.use(bodyParser.json())
registerRouter.use(express.urlencoded({extended: false}))

registerRouter.get('/', (req, res) => {
    db.query('SELECT * FROM users', function (err, result) {
        if (err) throw res.send("error :P");
        res.send(result)
    }) 
})

registerRouter.post('/', async (req, res) => {
    try {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, bcrypt.hash(req.body.password, 10)], function (err) {
            if (err) throw res.send("desculpa nao deu :P"), console.log(err);
            res.send("Registado :P")
        })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).send("error :P")
    }
})

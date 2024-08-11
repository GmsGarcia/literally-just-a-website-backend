import express from 'express'

export const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    } else {
        res.send('You are on your dashboard.')
    }
})
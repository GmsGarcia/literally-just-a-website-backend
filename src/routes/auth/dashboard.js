import express from 'express'

export const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in :(' })
    } else {
        res.status(200).json({ message: 'Welcome to your dashboard!' })
    }
})
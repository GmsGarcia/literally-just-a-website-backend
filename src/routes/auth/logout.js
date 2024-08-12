import express from "express"

export const logoutRouter = express.Router()

logoutRouter.get('/', (req, res) => {
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

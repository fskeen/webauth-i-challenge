const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./accountsModel');

const router = express.Router();
/**
 * Create a user
 * Log in
 * Get users
*/
router.use(express.json());
router.post('/register', (req, res) => {
    let account = req.body;
    account.password = bcrypt.hashSync(account.password, 14);

    db.createAccount(account)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Error creating account."})
        })
})



module.exports = router;
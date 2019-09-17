const express = require('express');
const bcrypt = require('bcryptjs');

const { restricted } = require('../../middleware/auth')
const db = require('./accountsModel');

const router = express.Router();
/**
 * Create a user
 * Log in
 * Get users
*/
router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).json({message: "Log in to see user list!"})
})

router.post('/register', (req, res) => {
    let account = req.body;
    account.password = bcrypt.hashSync(account.password, 14);

    db.createAccount(account)
        .then(user => {
            req.session.user = user;
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Error creating account."})
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({ message: 'You cannot pass!' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
})

router.get('/users', restricted, (req, res) => {
    db.getProtectedResource()
        .then(list => res.status(200).json(list))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to get list from server."})
        })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if (err){
                res.status(500).json({message: "Error loggin' out, pardner."})
             } else {
                res.status(200).json({message: 'bye'})
             }
        });
    } else {
        res.status(200).json({message: "Already logged out."})
    }
})


module.exports = router;
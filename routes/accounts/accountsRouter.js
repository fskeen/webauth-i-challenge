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

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'You cannot pass!' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
})

// server.post('/api/login', (req, res) => {
//     let { username, password } = req.body;
  
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           res.status(200).json({ message: `Welcome ${user.username}!` });
//         } else {
//           res.status(401).json({ message: 'You cannot pass!' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   });


module.exports = router;
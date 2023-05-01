const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { users } = require('../models/models')

// POST register
router.post('/register', (req, res, next) => {
    const newUser = req.body
    newUser.org = org
    newUser.passwordHash = newUser.generateHash(req.body.password);
    users.create(newUser, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }) 


// POST login
router.post('/loginn', (req, res, next) => {
  clients.findOne({ email: req.body.email }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Username/Password not valid.')
    } else if (!data.validPassword(req.body.password)) {
      return 'Invalid Username/Password'
    } else {
      res.json(data)
    }
  })

});

module.exports = router

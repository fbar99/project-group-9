const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { users } = require('../models/models')

// POST register
router.post('/register', (req, res, next) => {
    //new user is created with request body and password hash is generated
    const newUser = new users(req.body)
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
router.post('/login', (req, res, next) => {
  //looks for existing account and validates password against hashed value
  users.findOne({ email: req.body.email, org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Username/Password not valid.')
    } else if (!data.validPassword(req.body.password)) {
      res.status(400).send('Username/Password not valid.') 
    } else {
      res.json(data.role);
    }
  })

});

module.exports = router

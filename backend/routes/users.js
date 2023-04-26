const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { users } = require('../models/models')

// POST login
router.post('/', (req, res, next) => {
})

module.exports = router

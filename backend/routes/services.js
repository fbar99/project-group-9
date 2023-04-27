const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/services')

// GET entries based on search query
router.get('/search/services', (req, res, next) => {
    const dbQuery = { orgs: org }
    switch (req.query.searchBy) {
      case 'name':
        dbQuery.name = { $regex: `^${req.query.name}`, $options: 'i' }
        dbQuery.status = { $regex: `^${req.query.status}`, $options: 'i' }
        break
      default:
        return res.status(400).send('invalid searchBy')
    }
    services.find(dbQuery, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // POST new service
router.post('/', (req, res, next) => {
    const newService = req.body
    newService.org = [org]
    services.create(newService, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // PUT update service
router.put('/update/:id', (req, res, next) => {
    services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })


module.exports = router
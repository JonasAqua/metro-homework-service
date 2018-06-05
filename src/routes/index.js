const express = require('express')
const fetch = require('node-fetch')
const Homework = require('../models/homework')
const api = require('../services/api')
const router = express.Router()

router.get('/', (req, res, next) => {
  Homework.getAll().then(homeworkList => {
    res.json(homeworkList)
  }).catch(error => {
    next(error)
  })
})

// TODO: Make more readable
router.post('/:homeworkId/finish', (req, res, next) => {
  const homeworkId = req.params.homeworkId
  Homework.findById(homeworkId).then(homework => {
    const userId = req.get('userId')
    homework.finish(userId, (err, response) => {
      // User already finished homework
      if (response === false) {
        return res.json({success: false, message: "User already completed homework!"})
      }
      // User did not already finish homework
      api.increasePoints(userId, homework.maxPoints, (err, status, json) => {
        console.log(json)
        if (err) {
          next(err)
        }
        res.json({ success: true })
      })
    })
  }).catch(error => {
    if (error) {
      next(error)
    }
  })
})

router.get('/:homeworkId/file', (req, res, next) => {
  const homeworkId = req.params.homeworkId
  Homework.findById(homeworkId).then(homework => {
    const fileName = homework.fileName
    api.getBufferFromFile(fileName, (err, status, buffer) => {
      if (err) {
        next(err)
      }
      res.set({'Content-Type': 'application/pdf'})
      res.send(buffer)
    })
  })
})

module.exports = router

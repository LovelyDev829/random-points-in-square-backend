let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Model
let userSchema = require('../models/User.js')

// CREATE
router.route('/create-user').post((req, res, next) => {
  const { email, userName } = req.body
  console.log("create-user", req.body)
  userSchema.find({ email: email }, (error, data) => {
    if (error) {
      res.json({ success: false, message: "There was an error..." })
    }
    else if (data[0]) {
      console.log("Already existing email address...")
      res.json({ success: false, message: "Already existing email address..." })
    } else {
      userSchema.find({ userName: userName }, (error, data) => {
        if (error) {
          res.json({ success: false, message: "There was an error..." })
        }
        else if (data[0]) {
          console.log("Already existing user name...")
          res.json({ success: false, message: "Already existing user name..." })
        } else {
          var today = new Date()
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
          const registeredDateTime = date + time;
          userSchema.create({ ...req.body, registeredDateTime: registeredDateTime }, (error, data) => {
            if (error) {
              res.json({ success: false })
            } else {
              console.log("Added a new user")
              res.json({ success: true, data: data })
            }
          })
        }
      })
    }
  })
})

router.route('/check-user').post((req, res) => {
  const { email, password } = req.body;
  console.log("check-user", req.body)
  userSchema.find({ email: email, password: password }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = router

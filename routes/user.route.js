const CryptoJS = require("crypto-js");
const CRYPT_KEY = 'LovelyDev892_key_001'
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Model
let userSchema = require('../models/User.js')

// CREATE
router.route('/create-user').post((req, res, next) => {
  console.log("sdfsd", req.body.data)
  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(req.body.data, CRYPT_KEY).toString(CryptoJS.enc.Utf8));
  console.log("temp--->", req.body.data, decryptedData)
  const { email, userName, password } = decryptedData
  console.log("create-user", decryptedData)
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
          const registeredDateTime = date + ' / ' + time;
          userSchema.create({ ...decryptedData, registeredDateTime: registeredDateTime }, (error, data) => {
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

router.route('/check-user').post((req, res, next) => {
  console.log("check-user", req.body.data)
  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(req.body.data, CRYPT_KEY).toString(CryptoJS.enc.Utf8));
  const { email, password } = decryptedData;
  console.log("decryptedData", decryptedData)
  userSchema.findOne({ email: email }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      var decryptedPass = JSON.parse(CryptoJS.AES.decrypt(data.password, CRYPT_KEY).toString(CryptoJS.enc.Utf8));
      if(decryptedPass === password){
        console.log("res-data", data)
        res.json(data)
      }
      else return next({success: false})
    }
  })
})


module.exports = router

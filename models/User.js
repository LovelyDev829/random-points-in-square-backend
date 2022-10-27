const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  uesrName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  registeredDate: {
    type: String
  },
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', userSchema)
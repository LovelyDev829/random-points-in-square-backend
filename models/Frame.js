const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

let frameSchema = new Schema({
  frame: {
    type: String
  },
  comment: {
    type: String
  },
  commentDateTime: {
    type: String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: User
  },
  userName:{
    type: String
  },
  frameFps:{
    type: String
  },
  shutterFps:{
    type: Number
  },
  frequency: {
    type: String
  }
}, {
  collection: 'frames'
})

module.exports = mongoose.model('Frame', frameSchema)
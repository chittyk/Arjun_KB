const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
    default: 'FirstName'
  },
  Lname: {
    type: String,
    default: 'LastName'
  },
  bio: {
    type: String,
    default: 'Write your bio here...'
  },
  profile: {
    type: String,
    default: 'dummy.png' // or a default image filename
  },
  phone: {
    type: String,
    default:'1234567890',
    sparse: true // helps avoid conflict if not required
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  github:{
    type:String,
    default:"https://github.com/userid"
  },
  linkedIn:{
    type:String,
    default:"https://www.linkedin.com/in/userId/"
  }
}, { timestamps: true }); // adds createdAt & updatedAt fields

module.exports = mongoose.model('User', userSchema);

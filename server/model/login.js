
const mongoose=require('mongoose')

//  login schema
const LoginSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const logindb = new mongoose.model("logindb", LoginSchema);
  module.exports = logindb;
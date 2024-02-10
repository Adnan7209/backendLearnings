const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required : true,
    },
    lastName:{
      type:String,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    jobTitle:{
      type:String,
    },
    gender:{
      type:String,
      required:true,
      enum:['male','female']
    },
  
  },{timestamps:true});


  const userModel = mongoose.model('user',userSchema); 

  module.exports = userModel;
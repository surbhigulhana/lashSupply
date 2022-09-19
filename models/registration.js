const mongoose = require("mongoose");

const schema=new mongoose.Schema({
  uid:{type:'ObjectId'},
    firstname:{
      type:String,
      required:true
    },
    Lastname:{
      type:String,
      required:true
    },
   Phone:{
    type:String,
    required:true
   },
    email:{
      type:String,
      required: true,unique:true
    },
    Password:{
      type:String,
      required:true
    },
    Status:{
      type:String,
      default:'Active'
  },
    
   
});

const Registration=new mongoose.model("registration",schema);

module.exports = Registration;

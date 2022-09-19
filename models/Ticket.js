var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  uid:{type:'ObjectId'},
 
  Tnumber: {
    type: String,

  },
  UserName:{
    type:String
  },
  UserEmail:{
    type:String
  },
  Phone:{
    type:String
  },
  
  Issue:{
    type:String
  },
  Status:{
    type:String,
    default:"Pending"
  },

  
 
});

const Ticket = new mongoose.model("Ticket", schema3);

module.exports = Ticket;
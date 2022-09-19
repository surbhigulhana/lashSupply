var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  uid:{type:'ObjectId'},
 
  Pname: {
    type: String,

  },
  UserName:{
    type:String,
    unique:true,
    required:true
  },
  Phone:{
    type:String
  },
  PurchaseDate:{
    type:String
  },
  TotalAmt:{
    type:String
  },
  Status:{
    type:String,
    default:"Pending"
  },
  ShipAdd:{
    type:String
  },
  BillingAdd:{
    type:String
  },
  filename:{
    type:String
  }

  
  
 
});

const Order = new mongoose.model("Order", schema3);

module.exports = Order;
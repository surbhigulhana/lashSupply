var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  uid:{type:'ObjectId'},
 
  Pname: {
    type: String,

  },
  UserEmail:{
    type:String
  },
  Mode:{
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
});

const Payment = new mongoose.model("Payment", schema3);

module.exports = Payment;
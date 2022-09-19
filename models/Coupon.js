
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  CouponName: {
    type: String,   

  },
  CouponType:{
    type:String
  },
  DiscountPercent:{
    type:String,
  },
  DiscountAmt:{
    type:String,
  },
  CartValue:{
    type:String,
  }
  
});

const Coupon = new mongoose.model("Coupon", schema3);

module.exports = Coupon;
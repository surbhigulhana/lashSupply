
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  Name: {
    type: String,   

  }
  
});

const Product = new mongoose.model("Product", schema3);

module.exports = Product;
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  AttributeName: {
    type: String,

  }
  
  
 
});

const attribute = new mongoose.model("attribute", schema3);

module.exports = attribute;
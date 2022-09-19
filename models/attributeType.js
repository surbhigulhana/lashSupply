var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  AttributeName: {
    type: String,ref:'attribute'

  }
  ,AttributeType:{
    type:String
  }
  
 
});

const attributeType = new mongoose.model("attributeType", schema3);

module.exports = attributeType;
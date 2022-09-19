var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  CateName: {
    type: String,   required:true

  },
  desc:{
    type:String,required:true
  }
  
});

const Category = new mongoose.model("Category", schema3);

module.exports = Category;
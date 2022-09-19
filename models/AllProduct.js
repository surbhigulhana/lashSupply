var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  Name: {
    type: String,
  },
  Desc: {
    type: String,
  },
  CateName: {
    type: String,
  },
  MinPrice: {
    type: String,
  },
  MaxPrice: {
    type: String,
  },
  SkuNo: {
    type: String,
  },
  AttributeName: {
    type: String,ref:"attribute"
  },
  AttributeType: {
    type: String,ref:"attributeType"
  },
  filename: {
    type: String,
  },
  Price: {
    type: String,
  },
  Inventory: {
    type: String,
  },
});

const ProductData = new mongoose.model("ProductData", schema3);

module.exports = ProductData;

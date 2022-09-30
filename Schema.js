const mongoose = require('mongoose');
const Product = new mongoose.Schema({
  pName:{type:String,required:true,/*unique:true*/},
  pYear:{type:String,required:true}, 
  pModel:{type:String,required:true},
  pEngine:{type:String,required:true},
  pImage:{type:String},
})

module.exports = mongoose.model('Product',Product);

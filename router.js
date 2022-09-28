const Router  = require('express').Router;
const ProdSchema  = require('./Schema');
const prodRout = new Router();
// prodRout.get('/product');
prodRout.post('/post',async(req,res)=>{
  try{
    const {pName,pYear,pModel,pEngine} = req.body;
    const prod = await ProdSchema.create({pName,pYear,pModel,pEngine});
    res.json(prod);
    console.log(req.body);
    // res.status(200).json('ПРивет как ты ');
  }catch(e){
    res.status(500).json(e);
  }
});
prodRout.get('/getAll',async(req,res)=>{
  try{
    const products = await ProdSchema.find();
    return res.json(products);
  }catch(e){
    res.status(500).json(e);
  }
});
// prodRout.getOne('/product/:id');
// prodRout.getMore('/products');
// prodRout.put('/product');
// prodRout.delete('/product/:id');

module.exports = prodRout;
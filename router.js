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
prodRout.get('getId/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(req.params);
    const product = await ProdSchema.findById(id);
    return res.json(product);
  }catch(e){
    res.status(500).json(e);
  }
});
prodRout.get('/filter',async(req,res)=>{
  try{
    const {pYear,pModel}=req.params;
    console.log(req.params);
    const product = await ProdSchema.find({pYear,pModel});
    return res.json(product);
  }catch(e){
    res.status(500).json(e);
  }
});
prodRout.get('/test',async(req,res)=>{
  try{
    // const {pYear,pModel}=req.query;
    // console.log(req.query);
    const product = await ProdSchema.find(req.query);
    return res.json(product); 
  }catch(e){
    res.status(500).json(e);
  }
});
// prodRout.getMore('/products');
// prodRout.put('/product');
// prodRout.delete('/product/:id');

module.exports = prodRout;
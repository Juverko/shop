const express =require('express');
const PORT = 5000;
const app = express();
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/shop?readPreference=primary&ssl=false';
const router = require('./router.js');
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api',router);

async function start(){
  try{
    await mongoose.connect(dbUrl,{useUnifiedTopology:true,useNewUrlParser:true});
    app.listen(PORT,()=>{console.log("старт!!!!");})
  }catch(e){
    console.log(e);
  }
}
start();


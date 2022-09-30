let content = document.querySelector('.content');
let posX = 0;
document.querySelector('.next').addEventListener("click",()=>{
  posX+=275;
  content.style.transform = `translateX(${-posX}px)`;
  
  let ogr = (document.querySelectorAll('.product').length-5)*275;
  if(posX>ogr){
    posX = ogr-275;
    console.log('pizdec'+posX);
  }
  

})
document.querySelector('.prev').addEventListener("click",()=>{
  posX-=275;
  content.style.transform = `translateX(${-posX}px)`;
  if(posX<255){
    posX=255;
  }
  console.log(posX);
})
async function getRes(url){
  let res = await fetch(url);
  // let res = await fetch('http://localhost:5000/api/test?pYear=2012&pModel=5 series');
  return res.text();
  
}
getRes('http://localhost:5000/api/getAll').then(data=>{
  return JSON.parse(data);
}).then(res=>{
  let SetProd ={
    pName:new Set(),
    pModel:new Set(),
    pEngine:new Set(),
    pYear:new Set()
  }
  for(let k in res){
    let prod =res[k];
    console.log(prod);
    let element = document.createElement('div');
    element.classList.add('product');
    element.innerHTML=`<div class='image'></div><div class='pName'>${prod.pName}</div><div class='pModel'>${prod.pModel}</div><div class='pEngine'>${prod.pEngine}</div><div class='pYear'>${prod.pYear}</div>`;
    document.querySelector('.content').appendChild(element)
    
    
    function selecPull(elem,parent) {
      let option = document.createElement('option');
    option.classList.add('prodOp');
    option.innerHTML = `${elem}`;
    document.querySelector(parent).appendChild(option)
    } 
    SetProd.pModel.add(prod.pModel);
    SetProd.pName.add(prod.pName);
    SetProd.pEngine.add(prod.pEngine);
    SetProd.pYear.add(prod.pYear); 
  }
  console.log(SetProd.pModel);
  function removeRep(setElem,cls){
    for(let k of setElem){ 
      selecPull(k,cls);
    }
  }
  removeRep(SetProd.pModel,'.pModelSel');
  removeRep(SetProd.pName,'.pNameSel');
  removeRep(SetProd.pYear,'.pYearSel');
  removeRep(SetProd.pEngine,'.pEngineSel');
  
})

document.querySelector('.selection .submit').addEventListener("click",(e)=>{
  
  let selectpName = document.querySelector('.pNameSel');
  let selectPModel = document.querySelector('.pModelSel');
  let selectpYear = document.querySelector('.pYearSel');
  let selectpEngine = document.querySelector('.pEngineSel');

  let UrlQuery = '';
  function cUrl(key,selectValue){
    if(selectValue==''){
      console.log(selectPModel);
      
    }else{
      UrlQuery+=`&${key}=${selectValue}`;
    }
  }
  cUrl(`pName`,selectpName.value);
  cUrl(`pModel`,selectPModel.value);
  cUrl(`pYear`,selectpYear.value);
  cUrl(`pEngine`,selectpEngine.value);

  console.log(UrlQuery);

  document.querySelector('.content').innerHTML=null;
  if(document.querySelectorAll('.product').length<=5){
    content.style.justifyContent = 'center';
  }else{
    content.style.justifyContent = 'start';
  }
  e.preventDefault();
  
  getRes(`http://localhost:5000/api/test?${UrlQuery}`).then(data=>{

    return JSON.parse(data);
  }).then(res=>{
    for(let k in res){
          let prod =res[k];
          console.log(prod);
          let element = document.createElement('div');
          element.classList.add('product');
          element.innerHTML=`<div class='image'></div><div class='pName'>${prod.pName}</div><div class='pModel'>${prod.pModel}</div><div class='pEngine'>${prod.pEngine}</div><div class='pYear'>${prod.pYear}</div>`;
          document.querySelector('.content').appendChild(element)
      }
  })
  // .then(res=>{ 
  //   for(let k in res){
  //     let prod =res[k];
  //     console.log(prod);
  //     let element = document.createElement('div');
  //     element.classList.add('product');
  //     element.innerHTML=`<div class='image'></div><div class='pName'>${prod.pName}</div><div class='pModel'>${prod.pModel}</div><div class='pEngine'>${prod.pEngine}</div><div class='pYear'>${prod.pYear}</div>`;
  //     document.querySelector('.content').appendChild(element)
  // })
})
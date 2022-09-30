let addBlock = document.querySelector('.add');


addBlock.addEventListener('click',(e)=>{
  e.preventDefault();
  let pNameSel = document.querySelector('#pNameSel').value;
  let pModelSel = document.querySelector('#pModelSel').value;
  let pYearSel = document.querySelector('#pYearSel').value;
  let pEngineSel = document.querySelector('#pEngineSel').value;
  async function addProduct() {
    let res = await fetch('http://localhost:5000/api/post',{
      method:'POST',
      body:JSON.stringify({"pName":pNameSel,"pYear":pYearSel,"pModel":pModelSel,"pEngine":pEngineSel}),
      headers:{'Content-type':'application/json;charset=UTF-8'}
    })
    return res.text();
  }
  addProduct().then(data=>{
    console.log(data);
  })
  
})

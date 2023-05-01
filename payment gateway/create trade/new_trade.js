const form = document.querySelector('#trade_post'),
sellerRate = document.querySelector('#seller_rate'),
formBtn = document.querySelector('#submit'),
selected = document.querySelector("#buy_select"),
purchaseAmount = document.querySelector('#amount_to_buy');


sellerRate.addEventListener("input",()=>{
  const inputValue = sellerRate.value.trim();
  if(/^\d+$/.test(inputValue)){
     console.log("value is a number")
     formBtn.disabled = false;
     formBtn.style.backgroundColor = "rgb(46, 204, 113)";
  }else{
      formBtn.disabled = true;
      formBtn.style.backgroundColor = "red";
  }
})
purchaseAmount.addEventListener("input",()=>{
  const inputValue = purchaseAmount.value.trim();
  if(/^\d+$/.test(inputValue)){
     console.log("value is a number")
     formBtn.disabled = false;
     formBtn.style.backgroundColor = "rgb(46, 204, 113)";
  }else{
      formBtn.disabled = true;
      formBtn.style.backgroundColor = "red";
  }
})


form.addEventListener('submit', e => {
  e.preventDefault();
  if(sellerRate.value == "" || selected.value ==""){
    e.preventDefault();
    window.alert('One or more value cannot be empty')
    formBtn.disabled = true;
  }
  console.log("From here 2");
  console.log(FormData)
  
});
function loadData(){
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange =function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.response);
    }
  }
  xhr.onload=function(){
    // const data = JSON.parse(this.response);
    
    console.log(this.responseText);
}
  xhr.open("get","/payment gateway/php/new_trade.php",true);
  xhr.send();
}

loadData();

fetch("/payment gateway/php/new_trade.php")
.then(response=>response.json())
.then(data=>console.log(data))
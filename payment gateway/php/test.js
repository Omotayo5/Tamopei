function loadData(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange =function(){
      if(this.readyState == 4 && this.status == 200){
        console.log(this.response);
      }
    }
    xhr.onload=response=>response.json();
      
      console.log(this.responseText);
  
    xhr.open("get","new_trade.php",true);
    xhr.send();
  }
  
  loadData();
  
  fetch("new_trade.php")
  .then(response=>response.json())
  .then(data=>console.log(data))
// const userId = buy_tableBody.querySelector(' tr td .card-info1 span');
document.addEventListener('DOMContentLoaded',()=>{
  buy_tableBod = document.querySelector(".buy_other_methods");
  var userI =  buy_tableBod.querySelectorAll(
    " tr td input"
  );
  buy_tableBod.querySelectorAll("tr").forEach((child) => {child.lastElementChild.querySelector(".card-buy button").addEventListener("click", (e) => {
        //Geting the inner html which will serve as the poster
        console.log(userI);
        // const url = "../php/payment-receiving-methods.php";
        // const xmlhttp = new XMLHttpRequest();
        // xmlhttp.open("POST", url); //this can make us send both request and response on thesame page
        // xmlhttp.setRequestHeader(
        //   "Content-Type",
        //   "application/x-www-form-urlencoded"
        // );
        // xmlhttp.onload = () => {
        //   const paymentdata = JSON.parse(this.responseText);
        //   console.log(paymentdata);
  
        //   paymentdata.forEach((paymentD) => {
        //     console.log(paymentdata);
        //     console.log(paymentD);
  
        //   });
        // };
        // // const urlEncodedData = new URLSearchParams(formData).toString();
        // console.log(data.user_id);
        // xmlhttp.send(userI.innerHTML * 1);
        displayPopup4();
      });
    });
    
  console.log(userI.value);
  console.log(buy_tableBody);
})

async function fetchAsync() {
  let response = await fetch("../php/payment-options.php");
  let data = await response.json();
  console.log(data);
  return data;
}

fetchAsync();

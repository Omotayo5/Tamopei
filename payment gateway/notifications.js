
const buyTradeForm = document.getElementById('buy-trade-notification');
const sellTradeForm = document.getElementById('sell-trade-notification');
const buyConfirmBtn = document.querySelector('#buy-trade-notification .buy-submit');
const buyRejectBtn = document.querySelector('#buy-trade-notification .buy-reset');

const sellConfirmBtn = document.querySelector('#sell-trade-notification .sell-submit');
const sellRejectBtn = document.querySelector('#sell-trade-notification .sell-reset');



buyConfirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Order confirmed");
  const formData = new FormData(buyTradeForm);
  const xhr = new XMLHttpRequest();
  //method to work on the form, the name of the php script the form should be sent to.
  xhr.open("POST", "submit.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
    new notification*/
      console.log(xhr.responseText);
    }
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
  //   xhr.send(formData);
});

buyRejectBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log('Buy Order cancelled')
  const formData = new FormData(sellTradeForm);
  const xhr = new XMLHttpRequest();
  //method to work on the form, the name of the php script the form should be sent to.
  xhr.open("POST", "submit.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
    new notification*/
      console.log(xhr.responseText);
    }
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
})



sellConfirmBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log('Sell confirmed')
  const formData = new FormData(sellTradeForm);
  const xhr = new XMLHttpRequest();
  //method to work on the form, the name of the php script the form should be sent to.
  xhr.open("POST", "submit.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
    new notification*/
      console.log(xhr.responseText);
    }
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
});


sellRejectBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log('Sell Order cancelled')
  const formData = new FormData(sellTradeForm);
  const xhr = new XMLHttpRequest();
  //method to work on the form, the name of the php script the form should be sent to.
  xhr.open("POST", "submit.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
    new notification*/
      console.log(xhr.responseText);
    }
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
})
// console.log(nairaform)
// /*use if statement to check the type of form being submitted if its a form to release trade or accept trade
// so as to know what to send to the database*/
// const formData = new FormData(nairaform);
// const xhr = new XMLHttpRequest();
// //method to work on the form, the name of the php script the form should be sent to.
// xhr.open('POST', 'submit.php');
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
//     new notification*/ 
//     console.log(xhr.responseText);
//   }
// };
// // Convert the form data to a URL-encoded string
// const urlEncodedData = new URLSearchParams(formData).toString();
// console.log(urlEncodedData)
// xhr.send(urlEncodedData);
// //   xhr.send(formData);
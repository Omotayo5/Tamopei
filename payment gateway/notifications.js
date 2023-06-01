const notificationModalBtn = document.querySelector('#notification');
const notificationModal = document.querySelector('#notifications-modal');
const orderContainer = document.querySelector('#notifications-modal');
const itemBox = document.querySelector('.items-box');
const notificationCount = document.querySelector('.white');
const closeModal = document.querySelector('.close');
const buyTradeForm = document.getElementById('buy-trade-notification');
const sellTradeForm = document.getElementById('sell-trade-notification');
const buyConfirmBtn = document.querySelector('#buy-trade-notification .buy-submit');
const buyRejectBtn = document.querySelector('#buy-trade-notification .buy-reset');

const sellConfirmBtn = document.querySelector('#sell-trade-notification .sell-submit');
const sellRejectBtn = document.querySelector('#sell-trade-notification .sell-reset');

notificationModal.style.display = 'none';

/*Modal open and close*/
notificationModalBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  notificationModal.style.display = 'block';
  console.log('notification button');
  orderContainer.querySelectorAll('.notifications').forEach(container=>{

    //The form box cancel button to cancel the trade and in that process send a notification to the 
    //buyer that the trade has been cancelled then the specific notification will be removed from the stack.
    container.querySelector('.buy-reset').addEventListener('click',(e)=>{
      const formData = new FormData(e.target.parentElement);
      xhr.open("POST", "./php/order actions/order-release.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
          if (xhr.status === 200) {
            /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
            new notification*/
            const data = JSON.parse(xhr.responseText);
            alert(data);
          }
        };
      const urlEncodedData = new URLSearchParams(formData).toString();
      alert(urlEncodedData);
      xhr.send(urlEncodedData);
    })

    //The form box buy button to release the trade and in that process send a notification to the 
    //buyer that the trade has been released then the specific notification will be removed from the stack.
    container.querySelector(".buy-submit").addEventListener("click", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target.parentElement);
      xhr.open("POST", "./php/order actions/order_cancel.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
          if (xhr.status === 200) {
            /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
            new notification*/
            const data = JSON.parse(xhr.responseText);
            alert(data)
          }
        };
      const urlEncodedData = new URLSearchParams(formData).toString();
      alert(urlEncodedData);
      xhr.send(urlEncodedData);
    });
  })
})



//Closing the modal.
closeModal.addEventListener('click',()=>{
  notificationModal.style.display = 'none';
})


buyConfirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Order confirmed");
  //   xhr.send(formData);
});


const formData = new FormData(buyTradeForm);
const xhr = new XMLHttpRequest();
//method to work on the form, the name of the php script the form should be sent to.
xhr.open("POST", "./php/order_response.php");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onload = () => {
  if (xhr.status === 200) {
    /*The datas received from the database will be saved in an array and the length of the array will be the number of the 
  new notification*/
    const data = JSON.parse(xhr.responseText);
    notificationCount.innerHTML = data['order_data'].length;

    data['order_data'].forEach(element => {
      const orderData =html(element)
      itemBox.insertAdjacentHTML('afterend',orderData);
    });

    console.log(data['order_data']);
  }
};
// Convert the form data to a URL-encoded string
const urlEncodedData = new URLSearchParams(formData).toString();
console.log(urlEncodedData);
xhr.send(urlEncodedData);

//The html for each order.
const html = function(data){
  const newData =
  `
  <div class="notifications">
      <form id="buy-trade-notification">
          <input type="text" name="trade_type" value="buy" hidden>
          <span class="type">Buy</span>
          <input type="text" name="buyer_id" value="${data.buyer_id}" hidden>
          <input type="text" name="wallet" value="${data.wallet}" hidden>
          <span class="wallet">${data.wallet}</span>

          <input type="text" name="unit_amount" value="${data.order_unit}" hidden>
          <span class="unit-amount">${data.order_unit}</span>

          <input type="text" name="cost" value="${data.receive_amount}" hidden>
          <span class="cost">${data.receive_amount}</span>

          <button type="reset" class="buy-reset">Reject</button>
          
          <button type="submit" class="buy-submit">Release</button>
      </form>
  </div>
`
return newData;
}

/*This button will send a delete request to the database to remove the trade from the notification database
for the sell order.*/
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

// orderContainer.querySelectorAll('a').addEventListener('click',(e)=>{
//   e.preventDefault();
//   console.log(e.target)
// })
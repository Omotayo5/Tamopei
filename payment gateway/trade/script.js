import { fetchAsync } from "./safety.js";

const buy_tableBody = document.querySelector(".buy_other_methods"),
  sell_tableBody = document.querySelector(".sell_other_methods"),
  popContainer = document.querySelector("popup-container4");



const retrieved = {};
// console.log(document.querySelector(".buy_other_methods").innerHTML)
function loadData(method, url) {
  //Use javascript to set the attribute of the form, both the me
  /**/
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //The floating container form HTML string.
  const html2 = `
  <div class="floating_container" id="floating_container">
  
  <div class="sp">
  <span>Payment receiving methods</span>
  <hr>
  <p></p>
  <!-- Receiving Acounts available will be shown here in this span-->
  
  </div>
  <hr>
<div class="payment_receiving_methods">
  <h3> </h3>
  <hr>
  <form id="bank_details">
      <div class="payment-method-bank" id="bank-box">
      <div class="name-details">
      <h4>Bank name:</h4>
      <p>SPRING BANK</p>
      </div>
      <input type="text" placeholder="" name="wallet" hidden>
      <input type="text" placeholder="" name="user_id" hidden>
      <input type="text" placeholder="" name="order_unit" hidden>
      <input type="text" placeholder="" name="transaction_fee" hidden>
      <input type="text" placeholder="" name="receive" hidden>
      <input type="text" placeholder="" name="order_cost" hidden>
        <div class="name-details">
          <h4>Account name:</h4>
          <p>ADEJUYI SAMSON J</p>
        </div>
        <div class="name-details">
          <h4>Account number:</h4>
          <p>2187093564</p>
        </div>
        <hr>
        <div class="name-details" id="amount">
          <h4>Order unit</h4><input type="text" placeholder="" name="buy_amount">
        </div>
        <div class="name-details order_cost">
          <h4>Order cost:</h4>
          <p></p>
        </div>
        <div class="name-details rate">
          <h4>Curr Exchange rate:</h4>
          <p></p>
        </div>
        <div class="name-details fee">
          <h4>Transaction fee 1%:</h4>
          <p> </p>
        </div>
        <div class="name-details receive">
          <h4>Receive:</h4>
          <p>00</p>
        </div>
        <div class="btn-proceed" id="proceed">

      <a href="verify.html">
        <button type="submit" class="close-btn4" id="cancel-inner"> CONFIRM</button>
      </a>
      <button class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
    </div>
  </div>
</form>
</div>
</div>
  `;

  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    retrieved.data = datas;
    console.log(datas);
    datas.one.forEach((data) => {
      const html = `<tr>
        <td>
        <input type="tel" placeholder=" $" value="${data.user_id}" hidden>
          <div class="card-info1">

            <h3> ${data.user_name} Id<span> ${data.user_id} </span></h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3>Trade(s): <span>
                <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                  class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                  class="fa-regular fa-star"></i>
              </span></h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3 class="limit">Limit: <span>${data.lowest_rate}</span> - <span>${data.highest_rate}</span></h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1USD</h3>
          </div>
        </td>
        <td>
        <div class="methods">
            <span>${data.payment_method_1}</span>
            <span>${data.payment_method_2}</span>
            <span>${data.payment_method_3}</span>
          </div>
        </td>
        <td class="flex">
              <td>
                <div class="card-buy">
                  <button class="btn4" id="modal-btn"> Buy ${data.wallet}</button>
                </div>
              </td>

      </td>
        
    </tr>`;
      //Adding the html into the dom;
      buy_tableBody.innerHTML += html;
    });
  };
  /////////////////The function that handles the click on individual container///////////////////////////
  function handleclick(event) {
    var item = event.target;
    const order = {};
    if (item.tagName === "BUTTON") {
      document.querySelector(".popup-container4").innerHTML = html2;
      // console.log('Button clicked')
      //method to work on individual container clicked
      const userID =
        item.parentElement.parentElement.parentElement.querySelector(
          "td input"
        );
      const paymentMethod1 =
        item.parentElement.parentElement.parentElement.querySelectorAll(
          "td .methods span"
        );
      const userName =
        item.parentElement.parentElement.parentElement.querySelector(
          "td .card-info1 h3"
        );
      const wallet = item.parentElement.parentElement.parentElement.querySelector(
        "td .card-info2 .wallet span"
      );
      const purchaseAmnt = document.querySelector(
        ".payment-method-bank #amount input"
      );
      const proceedBtn = document.querySelector(
        ".payment-method-bank #proceed a"
      );
      const lowLimit = item.parentElement.parentElement.parentElement.querySelectorAll('.limit span')[0].innerHTML*1;
      const highLimit = item.parentElement.parentElement.parentElement.querySelectorAll('.limit span')[1].innerHTML*1;
      order.userID = userID.value;
      order.wallet = wallet.innerHTML;
      // order.purchaseAmnt = purchaseAmnt.value*1;
      const orderUnitInpt = document.querySelector("#floating_container .payment_receiving_methods input[name='order_unit']")
      const orderCostInpt = document.querySelector("#floating_container .payment_receiving_methods input[name='order_cost']")
      const receveInpt = document.querySelector("#floating_container .payment_receiving_methods input[name='receive']")
      const transactionFee = document.querySelector("#floating_container .payment_receiving_methods input[name='transaction_fee']")
      const rate = item.parentElement.parentElement.parentElement.querySelector("td .card-info2 .wallet").childNodes[0].textContent *1;    


      
      //Updating the amount to receive as the input value is typed
      purchaseAmnt.addEventListener('input',()=>{
        order.orderCost = (purchaseAmnt.value * 1)*rate;
        order.transactionFee = (purchaseAmnt.value * 1)*rate - ((purchaseAmnt.value * 1)*rate - (purchaseAmnt.value * 1)*rate *0.01);
        order.receiveAmnt = (purchaseAmnt.value * 1)*rate - (purchaseAmnt.value * 1)*rate *0.01
        document.querySelector('#floating_container .order_cost p').innerHTML = order.orderCost;
        document.querySelector('#floating_container .fee p').innerHTML = parseFloat((order.transactionFee*1).toFixed(2));
        document.querySelector('#floating_container .receive p').innerHTML = parseFloat(order.receiveAmnt.toFixed(2));
      })

      const userToDbID = document.querySelector(".payment_receiving_methods input[name='user_id']") ;
      userToDbID.value = order.userID * 1;
      const exchngRate = document.querySelector('#floating_container .rate p');
      exchngRate.innerHTML = rate*1;

      //Setting the name and id
      document.querySelector("#floating_container h3").innerHTML = `${userName.innerHTML} `;
      document.querySelector("#floating_container .payment_receiving_methods input").value = order.wallet;

      //mapping the available payment options to the modal boxes

      //NOTE
      /*Will remove modal box from its current position and replace some elements
      inside it with the dynamic element and insert it back into the dom because its current position is not good
      */

      //Setting the payment method data into their container
      var paymentModal = document.querySelector(".sp p");
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[0].innerHTML}</span> `;
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[1].innerHTML}</span> `;
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[2].innerHTML}</span>`;
      
      
      
      console.log(item.parentElement.parentElement.parentElement.querySelectorAll('.limit span')[0].innerHTML*1);

      //NOTE
      /* as this button is The user id will be taken and sent to the database to get the addresses of the user's available payment methods and be returned
      to fill the innerHTML*/

      ////////////////NOTE////////////////
      /* Some datas will be taken and set as the value of a hidden input element
      and when the form is submitted those data will be sent to the database and retrieved back to finish the form process*/

      //The proceed button inside the payment modal
      proceedBtn.addEventListener("click", (e) => {
        // e.stopPropagation();
        orderUnitInpt.value = purchaseAmnt.value;
        orderCostInpt.value = order.orderCost;
        receveInpt.value = order.receiveAmnt;
        transactionFee.value = parseFloat((order.transactionFee*1).toFixed(2));
        // console.log("Confirm button worked", (purchaseAmnt.value * 1)*rate);
        // console.log(order.userID * 1,userToDbID.value*1);
        // console.log(order,orderUnitInpt.value *1,orderCostInpt.value *1);

        //the data will be fetched and sent to the database;
        const apiKey = 'YOUR_API_KEY';
        const endpoint = '../php/order_request.php';
        const form = document.querySelector('.payment_receiving_methods form');

        form.addEventListener('submit',(e)=>{console.log(purchaseAmnt.value,lowLimit,highLimit)
          const formData = new FormData(form);
          if(orderUnitInpt.value.trim() !=='' && purchaseAmnt.value.trim()*1 >= lowLimit && purchaseAmnt.value.trim()*1<=highLimit){
            e.preventDefault();
                const xhr = new XMLHttpRequest();
                xhr.open('POST', endpoint);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = function () {
                  const datas = JSON.parse(this.response);
                  console.log(datas);
                
                }
                const urlEncodedData = new URLSearchParams(formData).toString();
                console.log(urlEncodedData)
                xhr.send(urlEncodedData);
          }else{
            e.preventDefault();
            alert()
          }
        })
      });
    } else {
      console.log("Not a button");
    }
  }
  /*When this container is clicked, it will look for an event that has a button name and if its found then the handleclick() function will run
  based on what the code inside it and get values pertaining to that specific container alone*/
  buy_tableBody.addEventListener("click", (e) => {
    e.stopPropagation();
    //The handle click event is what will be mapping real time data to the modal boxes dynamically
    handleclick(e);
    //The floating container button
    const floatingContainer = document.querySelector("#floating_container");
    const popUpContainer = document.querySelector(".popup-container4");

    console.log(popUpContainer);
    //displaying the pop up container that the values will be inputed in
    displayPopup4();
  });
  ////////////////////////////////////
  xhr.send();
}
///////////////BUY POST/////////////////////
const method_buy = "POST",
  url_buy = "../php/order_buy.php";
loadData(method_buy, url_buy);
/////////////////////////////////////





function loadData2(method, url) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    console.log(datas);
    datas.forEach((data) => {
      const html = `<tr>
      <td>
        <div class="card-info1">
  
          <h3> ${data.user_name} -- (${data.user_id})</h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>Trade(s): <span>
              <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i>
            </span></h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>Limit: $${data.lowest_rate} - $${data.highest_rate}</h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>1USD <i class="fa-solid fa-right-left"></i> ${data.user_rate}NGN</h3>
        </div>
      </td>
      <td>
          <div class="methods">
          <span>${data.payment_method_1},</span>
          <span>${data.payment_method_2},</span>
          <span>${data.payment_method_3},</span>
          </div>
      </td>
      <td>
        <div class="card-buy">
          <button class="btn2" id="modal-btn" style="background-color: var(--secondary);"> Sell NGN</button>
        </div>
      </td>
    </tr>`;
      sell_tableBody.innerHTML += html;
    });
  };
  // const urlEncodedData = new URLSearchParams(formData).toString();
  // console.log(formData);
  xhr.send();
}
//////////////SELL POST//////////////
const method_sell = "POST",
  url_sell = "../php/order_sell.php";
loadData2(method_sell, url_sell);

// console.log(retrieved)
const session = fetchAsync("../php/payment-options.php")

sessionStorage.setItem('session',session)
console.log(sessionStorage.getItem('session'));


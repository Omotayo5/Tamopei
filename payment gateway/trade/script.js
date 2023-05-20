const buy_tableBody = document.querySelector(".buy_other_methods"),
  sell_tableBody = document.querySelector(".sell_other_methods"),
  popContainer = document.querySelector("popup-container4");


var userID;
const retrieved = []
// console.log(document.querySelector(".buy_other_methods").innerHTML)
function loadData(method, url) {
  //Use javascript to set the attribute of the form, both the me
  /**/
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    retrieved.push(datas);
    datas.forEach((data) => {
      const html = `
      <div class="floating_container none" id="floating_container">
      <form>
      <!-- Receiving Acounts available will be shown here in this span-->
      <span> </span>
      <span> </span>
      <span> </span>
      <hr>
    <div class="payment_receiving_methods">
      <h3> ${data.user_name} Id<span> ${data.user_id} </span></h3>
      <hr>
      <form id="bank_details">
          <div class="payment-method-bank" id="bank-box">
          <div class="name-details">
          <h4>BANK NAME:</h4>
          <p>SPRING BANK</p>
          </div>
          <input type="text" placeholder="" name="wallet" hidden>
            <div class="name-details">
              <h4>ACCNT NAME:</h4>
              <p>ADEJUYI SAMSON J</p>
            </div>
            <div class="name-details">
              <h4>ACCOUNT NO:</h4>
              <p>2187093564</p>
            </div>
            <div class="name-details">
              <h4>PURCHASE AMOUNT</h4><input type="tel" placeholder="" name="buy_amount">
            </div>
            <div class="name-details">
              <h4>PURCHASE COST:</h4>
              <p>&#x20A6;74,000</p>
            </div>
            <div class="name-details">
              <h4>FEE 1%:</h4>
              <p>$1</p>
            </div>
            <div class="name-details">
              <h4>RECEIVE AMOUNT:</h4>
              <p>$99.00</p>
            </div>
            <div class="btn-proceed">

          <a href="verify.html">
            <button class="close-btn4" id="cancel-inner"> CONFIRM</button>
          </a>
          <button class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
        </div>
      </div>
    </form>
  </div>
  </form>
</div>
      <tr>
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
            <h3>Limit: ${data.lowest_rate} - ${data.highest_rate}</h3>

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
          <div class="methods">
          <div class="inline">
                <button class="btn4" id="modal-btn"> <span>${data.payment_method_1}</span></button>
                <button class="btn4" id="modal-btn"><span>${data.payment_method_2}</span></button>
                <button class="btn4" id="modal-btn"> <span>${data.payment_method_3}</span></button>
        </div>
        </div>
      </td>
        
    </tr>`;
      //Adding the html into the dom;
      buy_tableBody.innerHTML += html;
    });
    
  };
/////////////////The function that handles the click on individual container///////////////////////////
  function handleclick(event){
    var item = event.target;
    if(item.tagName === "BUTTON"){
      console.log('Button clicked')
      //method to work on individual container clicked
      var userID = item.parentElement.parentElement.parentElement.querySelector('td input').value;
      var paymentMethod1 = item.parentElement.parentElement.parentElement.querySelectorAll('td .methods span');
      var userName = item.parentElement.parentElement.parentElement.querySelector('td .card-info1 h3');
      var wallet = item.parentElement.parentElement.parentElement.querySelector('td .card-info2 .wallet span');
      
      //mapping the available payment options to the modal boxes


      //NOTE 
      /*Will remove modal box from its current position and replace some elements
      inside it with the dynamic element and insert it back into the dom because its current position is not good
      */
      var paymentModal = document
      .querySelector('#floating_container')
      .querySelectorAll('span');
      paymentModal[0].innerHTML = `${paymentMethod1[0].innerHTML} | `;
      paymentModal[1].innerHTML = `${paymentMethod1[1].innerHTML} | `;
      paymentModal[2].innerHTML = paymentMethod1[2].innerHTML;
      

      //Setting the name and id 
      document.querySelector('#floating_container h3').innerHTML = `${userName.innerHTML} `;
      document.querySelector('#floating_container .payment_receiving_methods input').value = wallet.innerHTML;
      console.log(document.querySelector('#floating_container'));
      console.log(userID *1);
      console.log(paymentMethod1[0].innerHTML,paymentMethod1[1].innerHTML,paymentMethod1[2].innerHTML);
      console.log(userName);
      console.log(paymentModal);

      //NOTE
      /* as this button is The user id will be taken and sent to the database to get the addresses of the user's available payment methods and be returned
      to fill the innerHTML*/

      ////////////////NOTE////////////////
      /* Some datas will be taken and set as the value of a hidden input element
      and when the form is submitted those data will be sent to the database and retrieved back to finish the form process*/

    }else{
      console.log('Not a button')
    }
  }

  /*When this container is clicked, it will look for an event that has a button name and if its found then the handleclick() function will run
  based on what the code inside it and get values pertaining to that specific container alone*/
  buy_tableBody.addEventListener('click',(e)=>{
    e.stopPropagation();
      //The handle click event is what will be mapping real time data to the modal boxes dynamically
      handleclick(e);
      //The floating container button
      const floatingContainer = document.querySelector('#floating_container');
      floatingContainer.classList.toggle('none');
  })
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

console.log(userID)
`              <div class="transaction">
<div class="payment-method-head">
  <H4>OTHER PAYMENT METHODS</H4>

  <div class="showbox-btn" style="background-color: var(--input); margin: .7rem 0;">
    <button class="pick-btn active" id="bank-box-btn" style="background: transparent;">BANK</button>
    <button class="pick-btn " id="chipper-box-btn" style="background: transparent;">CHIPPER</button>
    <button class="pick-btn" id="pi-box-btn" style="background: transparent;">PI NETWORK</button>
  </div>
</div>
<div class="payment-method-bank" id="bank-box">
  <div class="name-details">
    <h4>BANK NAME:</h4>
    <p>SPRING BANK</p>
  </div>
  <div class="name-details">
    <h4>ACCNT NAME:</h4>
    <p>ADEJUYI SAMSON J</p>
  </div>
  <div class="name-details">
    <h4>ACCOUNT NO:</h4>
    <p>2187093564</p>
  </div>
  <div class="name-details">
    <h4>PURCHASE AMOUNT</h4><input type="tel" placeholder=" $">
  </div>
  <div class="name-details">
    <h4>PURCHASE COST:</h4>
    <p>&#x20A6;74,000</p>
  </div>
  <div class="name-details">
    <h4>FEE 1%:</h4>
    <p>$1</p>
  </div>
  <div class="name-details">
    <h4>RECEIVE AMOUNT:</h4>
    <p>$99.00</p>
  </div>
  <div class="btn-proceed">

    <a href="verify.html">
      <button class="close-btn4" id="cancel-inner"> CONFIRM</button>
    </a>

    <button class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
  </div>
</div>
<div class="pi-box" id="pi-box" style="display: none;">

  <div class="name-details">
    <h4>METHOD NAME:</h4>
    <p>PI NETWORK</p>
  </div>
  <div class="name-details">
    <h4>WALLET ADDRESS:</h4>
    <p>#2187093564</p>
  </div>
  <div class="name-details">
    <h4>PURCHASE AMOUNT</h4> <input type="tel" placeholder=" $">
  </div>
  <div class="name-details">
    <h4>PURCHASE COST:</h4>
    <p>$100</p>
  </div>
  <div class="name-details">
    <h4>FEE 1%:</h4>
    <p>$1</p>
  </div>
  <div class="name-details">
    <h4>RECEIVE AMOUNT:</h4>
    <p>$99.00</p>
  </div>
  <div class="btn-proceed">
    <button class="popup-confirm4">CONFIRM</button>
    <button class="close-btn4" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
  </div>
</div>
<div class="chipper-box" id="chipper-box" style="display: none;">
  <div class="name-details">
    <h4>METHOD NAME:</h4>
    <p>CHIPPER CASH</p>
  </div>
  <div class="name-details">
    <h4> USERNAME:</h4>
    <p>@omotayocash</p>
  </div>
  <div class="name-details">
    <h4>PURCHASE AMOUNT</h4> <input type="tel" placeholder=" $">
  </div>
  <div class="name-details">
    <h4>PURCHASE COST:</h4>
    <p>&#x20A6;74,000</p>
  </div>
  <div class="name-details">
    <h4>FEE 1%:</h4>
    <p>$1</p>
  </div>
  <div class="name-details">
    <h4>RECEIVE AMOUNT:</h4>
    <p>$99.00</p>
  </div>
  <div class="btn-proceed">
    <button class="popup-confirm4">CONFIRM</button>
    <button class="close-btn4" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
  </div>
</div>
</div>`
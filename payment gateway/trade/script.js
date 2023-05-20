const buy_tableBody = document.querySelector(".buy_other_methods"),
  sell_tableBody = document.querySelector(".sell_other_methods"),
  popContainer = document.querySelector("popup-container4");


var userID;
const retrieved = []
// console.log(document.querySelector(".buy_other_methods").innerHTML)
function loadData(method, url) {
  //Use javascript to set the attribute of the form, both the me
  // const formData = new FormData(frm);
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    retrieved.push(datas);
    datas.forEach((data) => {
      const html = `
      <div class="floating_container none" id="floating_container">
      <span>${data.payment_method_1},</span>
      <span>${data.payment_method_2},</span>
      <span>${data.payment_method_3},</span>
  <div class="payment_receiving_methods">
  <h3> ${data.user_name}-- Id<span> ${data.user_id} </span></h3>
  <hr>
    <form  id="bank_details">
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
    </form>
  </div>
</div>
      <tr>
        <td>
        <input type="tel" placeholder=" $" value="${data.user_id}" hidden>
          <div class="card-info1">

            <h3> ${data.user_name}-- Id<span> ${data.user_id} </span></h3>

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
            <h3> ${data.user_rate}${data.wallet} <i class="fa-solid fa-right-left"></i>1USD</h3>
          </div>
        </td>
        <td>
        <div class="methods">
            <span>${data.payment_method_1},</span>
            <span>${data.payment_method_2},</span>
            <span>${data.payment_method_3},</span>
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
      buy_tableBody.innerHTML += html;




      const btn = buy_tableBody.querySelectorAll('tr td .methods .inline button');
       
      // getting the element sent to the dom inside the dom and calling an eventListener on each of them.
      btn.forEach(buttons=>{
        buttons.addEventListener(click,(e)=>{
          e.preventDefault();
          console.log(buy_tableBody.querySelectorAll('tr td .methods .inline #floating_container'))
        })
      })
      buy_tableBody.querySelectorAll("tr").forEach((child) => {
        child.lastElementChild
          .querySelector(".card-buy button")
          .addEventListener("click", (e) => {
            console.log('working button')
            const floatingContainer = document.querySelector('#floating_container');
            floatingContainer.classList.toggle('none');
            console.log(html);
            // floatingContainer.innerHTML = 'Good Morning 😂';

            // retrieved.forEach(retrieve=>{
            //   retrieve.forEach(element => {
            //     console.log(element)
            //   });
            // })
            // displayPopup4();
          });
      });
    });
    
  };
////////////////////////////////////////////
  function handleclick(event){
    var item = event.target;
    if(item.tagName === "BUTTON"){
      console.log('Button clicked')
      //method to work on individual container clicked
      var userID = item.parentElement.parentElement.parentElement.querySelector('td input').value;
      var paymentMethod1 = item.parentElement.parentElement.parentElement.querySelectorAll('td .methods span');
      var userName = item.parentElement.parentElement.parentElement.querySelector('td .card-info1 h3');
      
      //mapping the available payment options to the modal boxes
      

      var paymentModal = document
      .querySelector('#floating_container')
      .querySelectorAll('span');
      paymentModal[0].innerHTML = paymentMethod1[0].innerHTML;
      paymentModal[1].innerHTML = paymentMethod1[1].innerHTML;
      paymentModal[2].innerHTML = paymentMethod1[2].innerHTML;
      

      //Setting the name and id 
      document.querySelector('#floating_container h3').innerHTML = `${userName.innerHTML} `;
      console.log(userID *1);
      console.log(paymentMethod1[0].innerHTML,paymentMethod1[1].innerHTML,paymentMethod1[2].innerHTML);
      console.log(userName);
      console.log(paymentModal);
    }else{
      console.log('Not a button')
    }
  }
  buy_tableBody.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(e.target.tagName === "BUTTON"){
      console.log('button clicked from the second function')
      handleclick(e);
    }else{
      console.log('not a button')
    }
  })
////////////////////////////////////
  xhr.send();
}
////////////////////////////////////
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
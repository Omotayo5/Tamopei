const buy_tableBody = document.querySelector(".buy_other_methods"),
  sell_tableBody = document.querySelector(".sell_other_methods"),
  popContainer = document.querySelector("popup-container4");
// console.log(document.querySelector(".buy_other_methods").innerHTML)
function loadData(method, url) {
  //Use javascript to set the attribute of the form, both the me
  // const formData = new FormData(frm);
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    datas.forEach((data) => {
      const html = `
      <tr>
        <td>
          <div class="card-info1">

            <h3> ${data.user_name}-- Id<span>${data.user_id} </span></h3>

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
        <td>
          <div class="card-buy">
            <button class="btn4" id="modal-btn"> Buy NGN</button>
          </div>
        </td>
      </tr>`;

      // for the modal box of each container

      buy_tableBody.innerHTML += html;

      const userId = buy_tableBody.querySelector("tr td .card-info1 span");
      const options = { method: "POST", body: datas.user_id }; //optional data for the fetch api to send to the database.
      const paymentModalBank = document.querySelector('.transaction form[id="bank_details"]')
      const paymentModalAple = document.querySelector('.transaction form[id="apple_details"]')
      
      const url = "../php/payment-options.php";

      // Adding the available payment methods to the select list.
      const modalContainer = document.querySelector('.transaction');






      // getting the element sent to the dom inside the dom and calling an eventListener on each of them.
      buy_tableBody.querySelectorAll("tr").forEach((child) => {
        child.lastElementChild
          .querySelector(".card-buy button")
          .addEventListener("click", (e) => {
            console.log(userId.innerHTML * 1);

            fetch(url, options)
              .then((response) => response.json())
              .then(paymentdata =>{
                paymentdata.forEach(paymentD=>{
                  // console.log(paymentdata);
                  // console.log(paymentModal.nextElementSibling);
                  if (paymentD["bank_name"]) {
                    const bankHtml = ` 
                          <div class="payment-method-bank" id="bank-box">
                            <div class="name-details">
                              <h4>BANK NAME:</h4>
                              <p>${paymentD["bank_name"].toUpperCase()}</p>
                            </div>
                            <div class="name-details">
                              <h4>ACCNT NAME:</h4>
                              <p>${paymentD["user_name"]}</p>
                            </div>
                            <div class="name-details">
                              <h4>ACCOUNT NO:</h4>
                              <p>${paymentD["account_number"]}</p>
                            </div>
                            <div class="name-details">
                              <h4>PURCHASE AMOUNT</h4><input type="tel" placeholder=" $">
                            </div>
                            <div class="name-details">
                              <h4>PURCHASE COST:</h4>
                              <p>${data.user_rate * data.highest_rate}</p>
                            </div>
                            <div class="name-details">
                              <h4>FEE 1%:</h4>
                              <p>${data.user_rate * data.highest_rate * 0.01}</p>
                            </div>
                            <div class="name-details">
                              <h4>RECEIVE AMOUNT:</h4>
                              <p>${(data.user_rate * data.highest_rate) - (data.user_rate * data.highest_rate * 0.01)}</p>
                            </div>
                            <div class="btn-proceed">
                              <a href="verify.html">
                                <button type="reset" class="close-btn4" id="cancel-inner"> CONFIRM</button>
                              </a>
                              <button type="submit" class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
                            </div>
                          </div>
                     `
                    // paymentModalBank.innerHTML= bankHtml
                  } else if ("pi") {
                    `<form >
                  <div class="pi-box" id="pi-box" style="display: none;">
                    <div class="name-details">
                      <h4>METHOD</h4>
                      <p>PI NETWORK</p>
                    </div>
                    <div class="name-details">
                      <h4>WALLET ADDRESS:</h4>
                      <p>#2187093564</p>
                    </div>
                    <div class="name-details">
                        <h4>PURCHASE AMOUNT</h4> <input type="tel" placeholder="" name="amount">
                      </div>
                    <div class="name-details">
                      <h4>PURCHASE COST:</h4>
                      <p>${data.user_rate * data.highest_rate}</p>
                    </div>
                    <div class="name-details">
                      <h4>FEE 1%:</h4>
                      <p>${data.user_rate * data.highest_rate * 0.01}</p>
                    </div>
                    <div class="name-details">
                      <h4>RECEIVE AMOUNT:</h4>
                      <p>${(data.user_rate * data.highest_rate) - (data.user_rate * data.highest_rate * 0.1)}</p>
                    </div>
                    <div class="btn-proceed">
                    <a href="verify.html">
                      <button type="reset" class="close-btn4" id="cancel-inner"> CONFIRM</button>
                    </a>
                    <button type="submit" class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
                  </div>
                  </div>
                </form>`;
                  } else if ("google") {
                  } else if ("skrill") {
                  } else if (paymentD["apple_email"]) {
                    const appleHtml=
                    `<div class="pi-box" id="pi-box" style="display: none;">
                      <div class="name-details">
                        <h4>METHOD</h4>
                        <p>CHIPPER CASH</p>
                      </div>
                      <div class="name-details">
                        <h4> USERNAME:</h4>
                        <p>${paymentD["apple_email"]}</p>
                      </div>
                      <div class="name-details">
                        <h4>PURCHASE AMOUNT</h4> <input type="tel" placeholder="" name="amount">
                      </div>
                      <div class="name-details">
                        <h4>PURCHASE COST:</h4>
                        <p>${data.user_rate * data.highest_rate}</p>
                      </div>
                      <div class="name-details">
                        <h4>FEE 1%:</h4>
                        <p>${data.user_rate * data.highest_rate * 0.1}</p>
                      </div>
                      <div class="name-details">
                        <h4>RECEIVE AMOUNT:</h4>
                        <p>${(data.user_rate * data.highest_rate) - (data.user_rate * data.highest_rate * 0.1)}</p>
                      </div>
                      <div class="btn-proceed">
                        <a href="verify.html">
                          <button type="reset" class="close-btn4" id="cancel-inner"> CONFIRM</button>
                        </a>
                          <button type="submit" class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
                      </div>
                    </div>`
                    paymentModalAple.innerHTML =appleHtml;
                  } else if ("momo") {
                  } else if ("paypal") {
                  } else if ("") {
                  }
  
                  
                })
              }
                
                //Map the response to the modal box

                //Then insert the modal box data into the modal box.
              )
              .catch((err) => console.error(err));

            //this function is gotten from main.js script.
            displayPopup4();
          });
      });
    });
  };
  // .lastElementChild.querySelector('.card-buy button').addEventListener('click',(e)=>{
  //   e.preventDefault();
  //   console.log('button clicked')
  // })
  xhr.send();
}

const method_buy = "POST",
  url_buy = "../php/order_buy.php";
loadData(method_buy, url_buy);

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

async function fetchAsync() {
  let response = await fetch("../php/payment-options.php");
  let data = await response.json();
  console.log(data);
  return data;
}

fetchAsync();

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
</div>`;

var thisuserID = 0; //initializing the userId variable.

//Retrieve the payment methods the poster adds to his trades and paste it on individual trade modal boxes

 const buy_tableBody = document.querySelector(".buy_other_methods"),
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
      <input type="text" name="trade_index"  hidden>
      <input type="text" name="wallet" hidden>
      <input type="text" name="user_id" hidden>
      <input type="text" name="order_unit" hidden>
      <input type="text" name="transaction_fee" hidden>
      <input type="text" name="receive" hidden>
      <input type="text" name="order_cost" hidden>
      <input type="text" name="exchange_rate" hidden>
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
      <button type="reset" class="close-btn5" id="cancel" style="background-color: var(--secondary);">CANCEL</button>
    </div>
  </div>
</form>
</div>
</div>
  `;

  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    retrieved.data = datas;
    //Retrieving the current user id and checking it against the trades id to prevent user from interracting with the trade they post.
    thisuserID = datas["three"];
    console.log(datas["one"]);
    console.log(datas["three"]);
    //Looping through the trade data and posting it on the trade page
    datas.one.forEach((data) => {
      // Putting the trades data inside the container by their method;
      if (data.payment_method == "Naira") {
        const buy_order_wallet = `<tr>
        <td>
          <div class="card-info1">
          <input type="tel" value="${data.user_id}" hidden>
          <input type="tel" id="trade_ind" value="${data.ind}" hidden>
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
          <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1${data.payment_method}</h3>
          </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn" id="modal-btn"> Buy NGN</button>
          </div>
        </td>
      </tr>`;
        document
          .querySelector("#PayByWallet")
          .insertAdjacentHTML("afterbegin", buy_order_wallet);
      }
      else if (data.payment_method == "Dollar") {
        const buy_order_wallet = `<tr>
        <td>
          <div class="card-info1">
          <input type="tel" value="${data.user_id}" hidden>
          <input type="tel" id="trade_ind" value="${data.ind}" hidden>
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
          <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1${data.payment_method}</h3>
          </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn" id="modal-btn"> Buy USD</button>
          </div>
        </td>
      </tr>`;
        document
          .querySelector("#PayByWallet")
          .insertAdjacentHTML("afterbegin", buy_order_wallet);
      }
      else if (data.payment_method == "Rand") {
        const buy_order_wallet = `<tr>
        <td>
          <div class="card-info1">
          <input type="tel" value="${data.user_id}" hidden>
          <input type="tel" id="trade_ind" value="${data.ind}" hidden>
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
          <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1${data.payment_method}</h3>
          </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn" id="modal-btn"> Buy ZAR</button>
          </div>
        </td>
      </tr>`;
        document
          .querySelector("#PayByWallet")
          .insertAdjacentHTML("afterbegin", buy_order_wallet);
      }
      else if (data.payment_method == "Cedi") {
        const buy_order_wallet = `<tr>
        <td>
          <div class="card-info1">
          <input type="tel" value="${data.user_id}" hidden>
          <input type="tel" id="trade_ind" value="${data.ind}" hidden>
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
          <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1${data.payment_method}</h3>
          </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn" id="modal-btn"> Buy GHC</button>
          </div>
        </td>
      </tr>`;
        document
          .querySelector("#PayByWallet")
          .insertAdjacentHTML("afterbegin", buy_order_wallet);
      }
      else{
        const html = `<tr>
        <td>
        <input type="tel" value="${data.user_id}" hidden>
        <input type="tel" id="trade_ind" value="${data.ind}" hidden>
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
            <h3 class="wallet"> ${data.user_rate}  <span>${data.wallet}</span><i class="fa-solid fa-right-left"></i>1${data.payment_method}</h3>
          </div>
        </td>
        <td>
        <div class="methods">
            <span>${data.payment_method}</span>
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
      }
    });
  };


  /////////////////The function that handles the click on individual container///////////////////////////
  xhr.send();
}

///////////////BUY POST/////////////////////
const method_buy = "POST",
  url_buy = "../php/order_buy.php";
loadData(method_buy, url_buy);
/////////////////////////////////////

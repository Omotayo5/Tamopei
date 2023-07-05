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
      if (data.payment_method == "Dollar") {
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
      if (data.payment_method == "Rand") {
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
      if (data.payment_method == "Cedi") {
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
    });
  };
  /////////////////The function that handles the click on individual container///////////////////////////
  function handleclick(event) {
    var item = event.target;
    const order = {};

    if (item.tagName === "BUTTON") {
      console.log(thisuserID);
      document.querySelector(".popup-container4").innerHTML = html2;
      // console.log('Button clicked')

      //method to work on individual container clicked
      //Get all the values mapped to each input boxes and set it as the values of the form container inside the modal boxes.
      const userID =
        item.parentElement.parentElement.parentElement.querySelector(
          "td input"
        );
      const tradeIndex =
        item.parentElement.parentElement.parentElement.querySelector(
          "td #trade_ind"
        );
      const paymentMethod1 =
        item.parentElement.parentElement.parentElement.querySelectorAll(
          "td .methods span"
        );
      const userName =
        item.parentElement.parentElement.parentElement.querySelector(
          "td .card-info1 h3"
        );
      const wallet =
        item.parentElement.parentElement.parentElement.querySelector(
          "td .card-info2 .wallet span"
        );
      console.log(wallet);
      const purchaseAmnt = document.querySelector(
        ".payment-method-bank #amount input"
      );
      const proceedBtn = document.querySelector(
        ".payment-method-bank #proceed a"
      );
      //Checking if the account user id is thesame thing as the trade id,
      //if itśthesame then the user will not be able to interract with that specific trade
      if (thisuserID == userID.value) {
        purchaseAmnt.disabled = true;
      }

      // console.log(userID.value);
      //Getting each container innerHtml to set it as the values of the modal container when they are clicked individually.
      const lowLimit =
          item.parentElement.parentElement.parentElement.querySelectorAll(
            ".limit span"
          )[0].innerHTML * 1,
        highLimit =
          item.parentElement.parentElement.parentElement.querySelectorAll(
            ".limit span"
          )[1].innerHTML * 1,
        rate =
          item.parentElement.parentElement.parentElement.querySelector(
            "td .card-info2 .wallet"
          ).childNodes[0].textContent * 1;
      order.userID = userID.value;
      order.wallet = wallet.innerHTML;

      const tradeInd = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='trade_index']"
        ),
        orderUnitInpt = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='order_unit']"
        ),
        orderCostInpt = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='order_cost']"
        ),
        receveInpt = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='receive']"
        ),
        transactionFee = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='transaction_fee']"
        ),
        exchangeRate = document.querySelector(
          "#floating_container .payment_receiving_methods input[name='exchange_rate']"
        );

      //Updating the amount to receive as the input value is typed
      purchaseAmnt.addEventListener("input", () => {
        order.orderCost = purchaseAmnt.value * 1 * rate;
        order.transactionFee =
          purchaseAmnt.value * 1 * rate -
          (purchaseAmnt.value * 1 * rate -
            purchaseAmnt.value * 1 * rate * 0.01);
        order.receiveAmnt =
          purchaseAmnt.value * 1 * rate - purchaseAmnt.value * 1 * rate * 0.01;
        document.querySelector("#floating_container .order_cost p").innerHTML =
          order.orderCost;
        document.querySelector("#floating_container .fee p").innerHTML =
          parseFloat((order.transactionFee * 1).toFixed(2));
        document.querySelector("#floating_container .receive p").innerHTML =
          parseFloat(order.receiveAmnt.toFixed(2));
      });

      //////////////////////////////////MODAL CONTAINER VALUES////////////////////////////////////////
      //Inputing the innerHtml values taken from each trades when clicked into the modal container.
      const userToDbID = document.querySelector(
        ".payment_receiving_methods input[name='user_id']"
      );
      userToDbID.value = order.userID * 1;
      const exchngRate = document.querySelector("#floating_container .rate p");
      exchngRate.innerHTML = rate * 1;

      //Setting the name and id
      document.querySelector(
        "#floating_container h3"
      ).innerHTML = `${userName.innerHTML} `;
      document.querySelector(
        "#floating_container .payment_receiving_methods input[name='wallet']"
      ).value = order.wallet;

      //Setting the payment method data into their container
      var paymentModal = document.querySelector(".sp p");
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[0].innerHTML}</span> `;
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[1].innerHTML}</span> `;
      paymentModal.innerHTML += `<span class="one">${paymentMethod1[2].innerHTML}</span>`;
      //////////////////////////////////////////////////////////////////////////////////////////////

      console.log(
        item.parentElement.parentElement.parentElement.querySelectorAll(
          ".limit span"
        )[0].innerHTML * 1
      );

      //NOTE
      /* as this button is The user id will be taken and sent to the database to get the addresses of the user's available payment methods and be returned
      to fill the innerHTML*/

      ////////////////NOTE////////////////
      /* Some datas will be taken and set as the value of a hidden input element
      and when the form is submitted those data will be sent to the database and retrieved back to finish the form process*/

      //The proceed button inside the payment modal
      proceedBtn.addEventListener("click", (e) => {
        // e.stopPropagation();
        tradeInd.value = tradeIndex.value;
        orderUnitInpt.value = purchaseAmnt.value;
        orderCostInpt.value = order.orderCost;
        receveInpt.value = order.receiveAmnt;
        exchangeRate.value = rate * 1;
        transactionFee.value = parseFloat(
          (order.transactionFee * 1).toFixed(2)
        );

        // console.log("Confirm button worked", (purchaseAmnt.value * 1)*rate);
        console.log(order.userID * 1, userToDbID.value * 1);
        // console.log(order,orderUnitInpt.value *1,orderCostInpt.value *1);

        //the data will be fetched and sent to the database;
        const apiKey = "YOUR_API_KEY";
        const endpoint = "../php/order_request.php";
        const form = document.querySelector(".payment_receiving_methods form");

        form.addEventListener("submit", (e) => {
          console.log(purchaseAmnt.value, lowLimit, highLimit);
          const formData = new FormData(form);
          if (
            orderUnitInpt.value.trim() !== "" &&
            purchaseAmnt.value.trim() * 1 >= lowLimit &&
            purchaseAmnt.value.trim() * 1 <= highLimit
          ) {
            e.preventDefault();
            const xhr = new XMLHttpRequest();
            xhr.open("POST", endpoint);
            xhr.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );
            xhr.onload = function () {
              const datas = this.response;
              console.log(datas);
            };
            const urlEncodedData = new URLSearchParams(formData).toString();
            console.log(urlEncodedData);
            xhr.send(urlEncodedData);
          } else {
            e.preventDefault();
          }
        });
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

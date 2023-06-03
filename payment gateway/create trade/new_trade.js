const form = document.querySelector("#trade_post_sell"),
  sellerRate = document.querySelector("#selling_rate"),
  formBtn = document.querySelector("#submit"),
  selected = document.querySelectorAll("#buy_select"),
  purchaseAmount = document.querySelector("#amount_to_buy"),
  availableCurrencyDisplay = document.querySelectorAll("#available_curr"),
  receivedAmntDisplay = document.querySelector(".value_display_calculated span"),
  checked = document.querySelectorAll("input[type='checkbox']"),
  highLimit = document.querySelector("#high_limit"),
  sellBtn = document.querySelector(".sell"),
  walletBtn = document.querySelectorAll(".btn-c");

walletBtn.forEach((button) =>
  button.addEventListener("click", (e) => {
    e.preventDefault();
  })
);


//Checking théiput values
sellerRate.addEventListener("input", () => {
  const inputValue = sellerRate.value.trim();
  if (/^\d+$/.test(inputValue)) {
    console.log("value is a number");
    formBtn.disabled = false;
    formBtn.style.backgroundColor = "rgb(46, 204, 113)";
  } else {
    formBtn.disabled = true;
    formBtn.style.backgroundColor = "red";
  }
});
purchaseAmount.addEventListener("input", () => {
  const inputValue = purchaseAmount.value.trim();
  if (/^\d+$/.test(inputValue)) {
    console.log("value is a number");
    formBtn.disabled = false;
    formBtn.style.backgroundColor = "rgb(46, 204, 113)";
  } else {
    formBtn.disabled = true;
    formBtn.style.backgroundColor = "red";
  }
  receivedAmntDisplay.innerHTML = purchaseAmount.value * sellerRate.value;
});


//Function to get and send data to and from database.
function loadData(method,url,frm) {
  //Use javascript to set the attribute of the form, both the me
  const formData = new FormData(frm);
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const data = JSON.parse(this.response);
    console.log(data);
  };
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
}

//Fetching the curency wallet values and using it on the page;
const walletAvailable = document.querySelector(".value_display span");
const useData = function (data) {
  for (const key in data) {
    const curr = {
      walletName: key,
      walletValue: data[key]};
    // console.log(curr);
    var availableCurrOption = `<option  name="${curr.walletName}" value="${curr.walletName}">${curr.walletName} Wallet</option>`;
    availableCurrencyDisplay.forEach((available) =>
      available.insertAdjacentHTML("afterend", availableCurrOption)
    );
    selected.forEach((select) => {
      select.addEventListener("click", (e) => {
        switch (e.target.value) {
          case "Naira":
            walletAvailable.innerHTML = `₦ ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            break;
          case "Dollar":
            walletAvailable.innerHTML = `$ ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            break;
          case "Cedi":
            walletAvailable.innerHTML = `GHC ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            break;
          case "Rand":
            walletAvailable.innerHTML = `R ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            break;
          default:
            walletAvailable.innerHTML = "";
            break;
        }
      });
    });
  }
};


//Removing the selected wallet for p2p from the payment options


//SELL FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    sellerRate.value == "" &&
    Array.from(checked).some((boxes) => boxes.checked) == 0
  ) {
    e.preventDefault();
    alert("One or more value cannot be empty or unchecked");
    formBtn.disabled = true;
  } else {
    loadData("POST","../php/new_trade.php",form);
    console.log("From here 2");
  }
  //Checking if the values the user has is lower than the value the user wants to sell.
  if (
    parseInt(highLimit.value) >
    parseInt(walletAvailable.innerHTML.split(" ")[1])
  ) {
    sellBtn.disabled = true;
    alert("You cannot post a sell order higher than your balance 😥");
    e.preventDefault();
  }
  console.log(parseInt(walletAvailable.innerHTML.split(" ")[1]));
  console.log(parseInt(highLimit.value),sellerRate.value,);
});

fetch("../php/user-wallet.php")
.then((response) => response.json())
.then((data) => useData(data))
.catch((err) => console.log(err));

//Functioning Perfectly
const form2 = document.querySelector("#trade_post_buy");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    sellerRate.value == "" &&
    Array.from(checked).some((boxes) => boxes.checked) == 0
  ) {
    e.preventDefault();
    alert("One or more value cannot be empty or unchecked");
    formBtn.disabled = true;
  } else {
    loadData("POST",'../php/p2p-buy.php',form2);
    console.log("From here 2");
  }
});

const paymentOptions = document.querySelector('#wallet4');

fetch("../php/payment-options.php")
  .then((response) => response.json())
  .then((data) =>{
    data.forEach((datas) => {
      if(datas['apple_email']){
        var html = ` <div class="symbol-c">
        <p>APPLEPAY</p> <input type="checkbox" name="inputs[]" value="ApplePay" id="">
      </div>`
      paymentOptions.insertAdjacentHTML('afterbegin',html)
      }
      if(datas['bank_name']){
        var html = `<div class="symbol-c">
        <p>BANK </p> <input type="checkbox" name="inputs[]" id="" value="Bank">
        </div>`
          paymentOptions.insertAdjacentHTML('afterbegin',html)
        console.log(datas['bank_name'])
      }
      if(datas['google_address']){
        var html = `<div class="symbol-c">
            <p>GOGGLEPAY</p> <input type="checkbox" name="inputs[]" value="Google pay" id="">
        </div>`
        paymentOptions.insertAdjacentHTML('afterbegin',html)
      }
    })
    console.log(data)
  }
  )
  .catch((err) => console.log(err));
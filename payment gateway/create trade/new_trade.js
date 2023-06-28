/*
1. fix the css of the sell modal post button
2. fix how to fetch the user saved payment methods and show it on the trade post modal box
3. Fix the buy modal receive amount calculations.
4. Set the data inside the buy input box as the highest limit to buy.
5. Fetch the currency monitoring Api and retrieve the live data to be set as current exchange rate / dollar.
*/

const form = document.querySelector("#trade_post_sell"),
  sellForm = document.querySelector("#sell_post form"),
  sell_other_method_btn = document.querySelector("#dropbtn4"),
  buyForm = document.querySelector("#buy_post form"),
  buy_other_methods_btn = document.querySelector("#dropbtn1"),
  sellerRate = document.querySelector("#selling_rate"),
  formBtn = document.querySelector("#submit"),
  selected = document.querySelectorAll("#buy_select"),
  purchaseAmount = document.querySelector("#amount_to_buy"),
  availableCurrencyDisplay = document.querySelectorAll("#available_curr"),
  receivedAmntDisplay = document.querySelector(
    ".value_display_calculated span"
  ),

  checked = document.querySelectorAll("input[type='checkbox']"),
  highLimit = document.querySelector("#high_limit"),
  sellBtn = document.querySelector(".sell"),
  walletBtn = document.querySelectorAll(".btn-c");

walletBtn.forEach((button) =>
  button.addEventListener("click", (e) => {
    e.preventDefault();
  })
);
////////////////////////////////////////////////////////////

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
  document.querySelector("#high_limit").value = inputValue;
  receivedAmntDisplay.innerHTML = inputValue * 1 * (sellerRate.value * 1);
  console.log(sellerRate.value * 1);
});

//Function to get and send data to and from database.
async function loadData(method, url, frm) {
  try {
    const formData = new FormData();
    formData.append()

    
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(formData)
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

//Fetching the curency wallet values and using it on the page;
const walletAvailable = document.querySelector(".value_display span");
const useData = function (data) {
  for (const key in data) {
    const curr = {
      walletName: key,
      walletValue: data[key],
    };
    // console.log(curr);
    var availableCurrOption = `<option  name="${curr.walletName}" value="${curr.walletName}">${curr.walletName} Wallet</option>`;
    availableCurrencyDisplay.forEach((available) =>
      available.insertAdjacentHTML("afterend", availableCurrOption)
    );
    selected.forEach((select) => {
      select.addEventListener("click", (e) => {
        //disable the other methods

        switch (e.target.value) {
          case "Naira":
            walletAvailable.innerHTML = `₦ ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            document.querySelector("#dropbtn1").setAttribute("disabled", "");
            break;
          case "Dollar":
            walletAvailable.innerHTML = `$ ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            document.querySelector("#dropbtn1").setAttribute("disabled", "");

            break;
          case "Cedi":
            walletAvailable.innerHTML = `GHC ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            document.querySelector("#dropbtn1").setAttribute("disabled", "");
            break;
          case "Rand":
            walletAvailable.innerHTML = `R ${data[e.target.value]} `;
            document.querySelector(`#${e.target.value}`).disabled = true;
            document.querySelector("#dropbtn1").setAttribute("disabled", "");
            break;
          default:
            walletAvailable.innerHTML = "";
            break;
        }
      });
    });
  }
};

///////////////////////////////////
selected[0].addEventListener("click", (e) => {
  switch (e.target.value) {
    case "Naira":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Dollar":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Rand":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Cedi":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    default:
      break;
  }
});

selected[1].addEventListener("click", (e) => {
  switch (e.target.value) {
    case "Naira":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Dollar":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Rand":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    case "Cedi":
      document.querySelector(`#buy${e.target.value}`).disabled = true;
      console.log(`#buy${e.target.value}`);
      break;
    default:
      break;
  }
});

//SELL FORM WALLET TO WALLET
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    sellerRate.value == "" ||
    Array.from(checked).some((boxes) => boxes.checked) == 0
  ) {
    e.preventDefault();
    alert("One or more value cannot be empty or unchecked");
    formBtn.disabled = true;
  } else if (
    parseInt(highLimit.value) >
    parseInt(walletAvailable.innerHTML.split(" ")[1])
  ) {
    sellBtn.disabled = true;
    alert("You cannot post a sell order higher or lower than your balance 😥");
    e.preventDefault();
  } else {
    formBtn.disabled = false;
    sellBtn.disabled = false;
    loadData("POST", "../php/new_trade.php", form);
    console.log("From here 2");
  }
  // console.log(parseInt(walletAvailable.innerHTML.split(" ")[1]));
  // console.log(parseInt(highLimit.value),sellerRate.value,);
});


fetch("../php/user-wallet.php")
  .then((response) => response.json())
  .then((data) => useData(data))
  .catch((err) => console.log(err));


//Buy FORM WALLET TO WALLET
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
  }else if (
    parseInt(highLimit.value) >
    parseInt(walletAvailable.innerHTML.split(" ")[1])
  ){
    sellBtn.disabled = true;
    alert("You cannot post a sell order higher than your balance 😥");
    e.preventDefault();
  }
   else {
    loadData("POST", "../php/p2p-buy.php", form2);
    console.log("From here 2");
  }
});

//Getting user saved payment receiving methods from the database
const paymentOptions = document.querySelector("#wallet4");

fetch("../php/payment-options.php")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((datas) => {
      if (datas["apple_email"]) {
        var html = ` <div class="symbol-c">
        <p>APPLEPAY</p> <input type="checkbox" name="inputs[]" value="ApplePay" id="">
      </div>`;
        paymentOptions.insertAdjacentHTML("beforeend", html);
      }
      if (datas["bank_name"]) {
        var html = `<div class="symbol-c">
        <p>BANK </p> <input type="checkbox" name="inputs[]" id="" value="Bank">
        </div>`;
        paymentOptions.insertAdjacentHTML("beforeend", html);
        console.log(datas["bank_name"]);
      }
      if (datas["google_address"]) {
        var html = `<div class="symbol-c">
            <p>GOGGLEPAY</p> <input type="checkbox" name="inputs[]" value="Google pay" id="">
        </div>`;
        paymentOptions.insertAdjacentHTML("beforeend", html);
      }
    });
    console.log(data);
  })
  .catch((err) => console.log(err));

  
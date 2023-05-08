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



function loadData() {
  //Use javascript to set the attribute of the form, both the me
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/new_trade.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const data = this.response;
    console.log(data);
  };
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(formData);
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
    var availableCurrOption = `<option value="${curr.walletName}" name="${curr.walletName}">${curr.walletName} Wallet</option>`;
    availableCurrencyDisplay.forEach((available) =>
      available.insertAdjacentHTML("afterend", availableCurrOption)
    );
    selected.forEach((select) => {
      select.addEventListener("click", (e) => {
        switch (e.target.value) {
          case "Naira":
            walletAvailable.innerHTML = `₦ ${data[e.target.value]} `;
            break;
          case "Dollar":
            walletAvailable.innerHTML = `$ ${data[e.target.value]} `;
            break;
          case "Cedi":
            walletAvailable.innerHTML = `GHC ${data[e.target.value]} `;
            break;
          case "Rand":
            walletAvailable.innerHTML = `R ${data[e.target.value]} `;
            break;
          default:
            walletAvailable.innerHTML = "";
            break;
        }
      });
    });
  }
};


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
    loadData();
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
  // console.log(parseInt(walletAvailable.innerHTML.split(" ")[1]));
  // console.log(parseInt(highLimit.value));
});



fetch("../php/user-wallet.php")
.then((response) => response.json())
.then((data) => useData(data))
.catch((err) => console.log(err));

//Functioning Perfectly
const form2 = document.querySelector("#trade_post_buy");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form2);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/p2p-buy.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    const data = this.response;
    console.log(data);
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(formData);
  xhr.send(urlEncodedData);
  // xhr.send(formData);
});

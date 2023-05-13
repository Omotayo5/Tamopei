var nairaform = document.getElementById('bank_account_settings'),
Chipper = document.getElementById('chipper_account_settings'),
applePay = document.getElementById('apple_pay_account_settings'),
momoAcc = document.getElementById('momo_account_settings'),
piWallet = document.getElementById('pi_account_settings'),
PayPal = document.getElementById('paypal_account_settings'),
Skrill = document.getElementById('skrill_account_settings'),
cashApp = document.getElementById('cashApp_account_settings'),
googlePay = document.getElementById('googlepay_account_settings');



const payments = [
  (bank = document.querySelector("#bank")),
  (chipper = document.querySelector("#chipper")),
  (apple = document.querySelector("#apple")),
  (momo = document.querySelector("#momo")),
  (pi = document.querySelector("#pi")),
  (payPal = document.querySelector("#paypal")),
  (skrill = document.querySelector("#skrill")),
  (cash = document.querySelector("#cash")),
  (google = document.querySelector("#google")),
];




payments.forEach((payment) => {
  payment.style.display = "none";
});

const selected = document
  .querySelector("#select")
  .addEventListener("click", (e) => {
    switch (e.target.value) {
      case "bank":
        payments[0].style.display = "block";
        console.log("bank");
        break;
      case "chipper":
        payments[1].style.display = "block";
        console.log("chipper");
        break;
      case "apple_pay":
        payments[2].style.display = "block";
        console.log("apple");
        break;
      case "momo":
        payments[3].style.display = "block";
        break;
      case "pi":
        payments[4].style.display = "block";
        break;
      case "paypal":
        payments[5].style.display = "block";
        break;
      case "skrill":
        payments[6].style.display = "block";
        break;
      case "cash":
        payments[7].style.display = "block";
        break;
      case "google":
        payments[8].style.display = "block";
      default:
        break;
    }
  });

// sellerRate.addEventListener("input", () => {
//   const inputValue = sellerRate.value.trim();
//   if (/^\d+$/.test(inputValue)) {
//     console.log("value is a number");
//     formBtn.disabled = false;
//     formBtn.style.backgroundColor = "rgb(46, 204, 113)";
//   } else {
//     formBtn.disabled = true;
//     formBtn.style.backgroundColor = "red";
//   }
// });
// purchaseAmount.addEventListener("input", () => {
//   const inputValue = purchaseAmount.value.trim();
//   if (/^\d+$/.test(inputValue)) {
//     console.log("value is a number");
//     formBtn.disabled = false;
//     formBtn.style.backgroundColor = "rgb(46, 204, 113)";
//   } else {
//     formBtn.disabled = true;
//     formBtn.style.backgroundColor = "red";
//   }
//   receivedAmntDisplay.innerHTML = purchaseAmount.value * sellerRate.value;
// });

//Function to get and send data to and from database.
function loadData(method, url, frm) {
  //Use javascript to set the attribute of the form, both the me
  const formData = new FormData(frm);
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const data = this.response;
    console.log(data);
  };
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData);
  xhr.send(urlEncodedData);
}

nairaform.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',nairaform);
    console.log('Posted naira');
});

Chipper.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',Chipper);
    console.log('Posted chipper');
});

applePay.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',applePay);
    console.log('Posted apple');
});

momoAcc.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',momoAcc);
    console.log('Posted momo');
})

googlePay.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',googlePay);
    console.log('Posted google');
})

piWallet.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',piWallet);
    console.log('Posted pi');
})

Skrill.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',Skrill);
    console.log('Posted skrill');
})

PayPal.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadData('POST','../php/payment-options.php',PayPal);
    console.log('Posted payPal');
})
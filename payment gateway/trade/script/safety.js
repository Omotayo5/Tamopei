const naira = sessionStorage.getItem("Naira");
const dollar = sessionStorage.getItem("Dollar");
const rand = sessionStorage.getItem("Rand");
const cedi = sessionStorage.getItem("Cedi");

console.log(naira,dollar,rand,cedi)
//Closing the modal box
window.addEventListener("click", function (event) {
  if (
    event.target == document.querySelector("#popup-container2") ||
    event.target == document.querySelector("#popup-container5")||
    event.target== document.querySelector('.popup-container') || 
    event.target ==  document.querySelector('#popup-container4')
  ) {
    document.querySelector("#popup-container2").style.display = "none"; // Hide the modal when clicking outside of it
    document.querySelector("#popup-container5").style.display = "none";
    document.querySelector('.popup-container').style.display = "none";
    document.querySelector('#popup-container4').style.display = 'none';
  }
});


//Getting the values of the trade box whenever its clicked individually;
setTimeout(() => {
  const amount_buy = document.querySelector('#buy_wallet #amount');
  document.querySelectorAll("#modal-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const container = e.target.parentElement.parentElement.parentElement;
      const td = container.querySelectorAll('td');
      const low_limits = td[2].querySelectorAll('.limit span')[0].innerHTML,
      high_limits = td[2].querySelectorAll('.limit span')[1].innerHTML;
      const my_wallet = td[3].querySelector('.wallet .my_wallet').innerHTML;
      const exchange_rate = td[3].querySelector('.wallet .exchange_rate').innerHTML*1;
      const seller_wallet = td[3].querySelector('.wallet .seller_wallet').innerHTML;
      console.log(my_wallet,seller_wallet);
      document.querySelector('.popup-container').style.display = "block";
      document.querySelector('#buy_wallet #my_wallet p').innerHTML = `${my_wallet} Wallet`;
      document.querySelector('#buy_wallet #low_limit p').innerHTML = `${low_limits}`;
      document.querySelector('#buy_wallet #high_limit p').innerHTML = `${high_limits}`;
      const wallet_balance = document.querySelector('#buy_wallet #wallet_balance p').innerHTML = `<b>${my_wallet}</b> ${sessionStorage.getItem(`${my_wallet}`)}`;
      const modal_seller_wallet = document.querySelector('#buy_wallet #seller_wallet p').innerHTML =`<b>${ seller_wallet}</b> Wallet`;
      const purchase_cost = document.querySelector('#buy_wallet #purchase_cost p');
      const rate =  document.querySelector('#buy_wallet #exchange_rate p').innerHTML = `${exchange_rate}${seller_wallet} <b>=</b> 1${my_wallet}`;
      const fee = document.querySelector('#buy_wallet #transaction_fee p');
      const receive_amount = document.querySelector("#buy_wallet #receive_amount p");
      const confirmBtn = document.querySelector('#buy_wallet #buy_wallet_confirm');
      console.log(exchange_rate);


      amount_buy.addEventListener('input',(e)=>{
        const inputValue = e.target.value.trim();
        if(/^\d+$/.test(inputValue)){
          console.log("value is a number")
          confirmBtn.disabled = false;
          confirmBtn.style.backgroundColor = "rgb(46, 204, 113)";
        }else{
            confirmBtn.disabled = true;
            confirmBtn.style.backgroundColor = "red";
        }
        
        purchase_cost.innerHTML = (e.target.value *1)*exchange_rate;
        fee.innerHTML =( purchase_cost.innerHTML *1)*0.01;
        receive_amount.innerHTML = ((purchase_cost.innerHTML *1) - (fee.innerHTML*1)).toFixed(2);
        // console.log(e.target.value);
      })
      // const purchase_cost = document.querySelector('#buy_wallet #purchase_cost').innerHTML;
      // const transaction_fee = document.querySelector('#buy_wallet #transaction_fee');
      // const receive_amount = document.querySelector('#buy_wallet #receive_amount');
      // const buy_wallet_confirm = document.querySelector('#buy_wallet #buy_wallet_confirm');
      
    });
  });
}, 1000);






setTimeout(() => {
  document.querySelector('#modal-btn_sell').addEventListener('click',(e)=>{
    console.log(e.target.parentElement.parentElement.parentElement);
    document.querySelector('#popup-container2').style.display = 'block';
    console.log(document.querySelector('#popup-container4'))
  })
}, 1000);







setTimeout(() => {
  document.querySelectorAll('#modal-btn_buy_other').forEach(button=>{
    button.addEventListener('click',(e)=>{
      document.querySelector('#popup-container4').style.display = 'block';
    })
  })
}, 1000);






setTimeout(() => {
  document.querySelectorAll("#modal-btn_sell_other").forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector('#popup-container5').style.display = 'block';
     console.log( e.target.parentElement.parentElement)
    });
  });
}, 1000);


// const userId = buy_tableBody.querySelector(' tr td .card-info1 span');
// export async function fetchAsync(url) {
//   let response = await fetch(url);
//   let data = await response.json();
//   console.log(data);
//   return data;
// };


//Closing the modal box
window.addEventListener("click", function (event) {
  if (
    event.target == document.querySelector("#popup-container2") ||
    event.target == document.querySelector("#popup-container5")
  ) {
    document.querySelector("#popup-container2").style.display = "none"; // Hide the modal when clicking outside of it
    document.querySelector("#popup-container5").style.display = "none";
  }
});


// pop-up contsiner for other paynent methods
setTimeout(() => {
  document.querySelectorAll(".sell_other_method").forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector("#popup-container5").style.display = "block";
    });
  });
}, 1000);

//Getting the values of the trade box whenever its clicked individually;
setTimeout(() => {
  document.querySelectorAll("#modal-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      let walletContainer = e.target.parentElement.parentElement.parentElement;
      document.querySelector("#popup-container2").style.display = "block";
      let sellerId = walletContainer.querySelector('td #id').innerHTML;
      document.querySelector("#popup-container2 #seller p").innerHTML =
        sellerId;
      // document.querySelector('#popup-container2 #wallet p').innerHTML =
    });
  });
}, 1000);
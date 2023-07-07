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
    event.target == document.querySelector("#popup-container5")||event.target== document.querySelector('.popup-container')
  ) {
    document.querySelector("#popup-container2").style.display = "none"; // Hide the modal when clicking outside of it
    document.querySelector("#popup-container5").style.display = "none";
    document.querySelector('.popup-container').style.display = "none";
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
      console.log(document.querySelector('.limit').innerHTML);
      document.querySelector('.popup-container').style.display = "block";
      
    });
  });
}, 1000);



const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

button1.addEventListener("click", function() {
  button1.classList.add("active");
  button2.classList.remove("active");
});

button2.addEventListener("click", function() {
  button2.classList.add("active");
  button1.classList.remove("active");
});




const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");

button3.addEventListener("click", function() {
  button3.classList.add("active");
  button4.classList.remove("active");
  content1.style.display = "block";
  content2.style.display = "none";
});

button4.addEventListener("click", function() {
  button4.classList.add("active");
  button3.classList.remove("active");
  content2.style.display = "block";
  content1.style.display = "none";
});






var toggleButton = document.querySelector('.switch input[type="checkbox"]');
toggleButton.addEventListener('change', function() {
  if(this.checked) {
    console.log('Toggle button is ON');
  } else {
    console.log('Toggle button is OFF');
  }
});

const currencySelect = document.getElementById("currency");
currencySelect.addEventListener("change", function() {
  const selectedCurrency = currencySelect.value;
  
});


var modal = document.getElementById("myModal");


var btn = document.getElementById("modal-btn");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var modal2 = document.getElementById("myModal2");


var btn2 = document.getElementById("Buy");


var span2 = document.getElementsByClassName("close1")[0];


btn2.onclick = function() {
  modal2.style.display = "block";
}


span2.onclick = function() {
  modal2.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}




// Get the buttons and contents
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");


// Add event listeners to the buttons
btn1.addEventListener("click", function() {
  // Show content 1 and hide content 2

});

btn2.addEventListener("click", function() {
  // Show content 2 and hide content 1

});






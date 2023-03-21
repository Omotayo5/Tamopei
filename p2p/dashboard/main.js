



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

var show = document.getElementsById("completeCard");

var btn = document.getElementsByClassName("done");


btn.addEventListener("click", () =>{
          show.style.display = "block";
})





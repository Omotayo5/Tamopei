var balance = 10;

var receiver = 0;


var paid = prompt("Enter amount to send")
function deduct(){
    var newBalance = balance - parseInt(paid);
    return newBalance;
}

function add(){
    var r = deduct();
    return r;
}


if (parseFloat(paid) > balance) {
  console.log("Insufficient balance");
} else if (parseFloat(paid) < balance) {
  var receiver = deduct();
  console.log("You have sent ", receiver);

  var q = prompt("have you received the payment?");
  if (q.toLocaleLowerCase() == "yes") {
    var ad = add();
    console.log("You receied ",ad);
  } else {
    console.log("not received");
  }
}

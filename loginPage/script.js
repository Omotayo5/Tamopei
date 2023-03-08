var balance = 10.0;

var received = 3.0;

var paid = prompt("Enter amount to send")

function addMoney(){
  var amount = prompt("How much would you like to add to your account? ")
  var newBal = balance + parseFloat(amount);
  return newBal
}

function deduct(){
    var newBalance = balance - parseInt(paid);
    return parseFloat(newBalance);
}

function add(){
    var r = deduct();
    return r;
}

function ret(){
  balance = ad + send;
  return parseFloat(balance);

}
var receiver = deduct();
  //Add is holding the value deducted from the deducted account.
var ad = add();

var send = parseFloat(balance- receiver);

console.log(ret())


if (parseFloat(paid) > balance) {
  console.log("Insufficient balance");
  var b = addMoney();
  balance = b;
  console.log(b)
} else if (parseFloat(paid) < balance) {
  balance =ad
  console.log("You have sent ",send, "Your new account balance is",parseFloat(balance));
  var q = prompt("have you received the payment?");
  if (q.toLocaleLowerCase() == "yes") {
    console.log("You receied ",send, "New balance is", received+send);
  } else if(q.toLocaleLowerCase()== "no") {
    console.log("not received");
  }else if(q.toLocaleLowerCase() == "conflict"){
    console.log("You receied ",received);
    console.log(send ,"is held by the system")
    console.log("Your account balance is",ad)

  }
}
console.log(`new balance update is ${parseFloat(balance)}`)


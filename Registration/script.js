var balance = 10;

var paid = input("Enter amount to send")
function deduct(){
    var deducted = balance - parseInt(paid);
    return deducted;
}

if(parseInt(paid) >balance){
    console.log("Insufficient balance")
}else if(parseInt(paid)<balance){
    var sentAmount = deduct();

    console.log(sentAmount, balance)
}
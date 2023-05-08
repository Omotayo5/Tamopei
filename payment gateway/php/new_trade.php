<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");

if($_SERVER['REQUEST_METHOD']=== 'POST'){
    // $selected = mysqli_real_escape_string($conn, $_POST['select']);
    $tradeType = mysqli_real_escape_string($conn, $_POST['Trade_Type']);
    $lowLimit=mysqli_real_escape_string($conn, $_POST['low_limit']);
    $highLimit=mysqli_real_escape_string($conn, $_POST['high_limit']);
    $sellerRate = mysqli_real_escape_string($conn, $_POST['selling_rate']);
    
    if($_POST['inputs']){
        foreach ($_POST['inputs'] as $key => $value) {
            mysqli_real_escape_string($conn,$value);
            // print_r($value." ");
        }
    }
    // print_r($tradeType." ".$sellerRate." ".$lowLimit." ".$highLimit);
}

$stmt2 = $conn->prepare("SELECT Cedi FROM `wallet` WHERE user_id =?");
$stmt2->bind_param('i',$accountOwner);
$stmt2->execute();
$stmt2->store_result();

if($stmt2){
    $stmt2->bind_result($userBalance);
    $stmt2->fetch();
}
// will shift this wallet to another php file so it can be succesfully passed to the javascript or use xhttp
$stmt2->close();
?>

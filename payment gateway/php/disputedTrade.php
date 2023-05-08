<?php
include('server.php');
$wallets=$_SESSION['wallet_balance'];
if($_SERVER['REQUEST_METHOD']==="POST"){
    
    $tradeType = urldecode($_POST['Trade_Type']);
    $select = urldecode($_POST['select']);
    $sellerRate = urldecode($_POST['selling_rate']);
    $amountToBuy = urldecode($_POST['amount_to_buy']);
    $lowLimit = urldecode($_POST['low_limit']);
    $highLimit = urldecode($_POST['high_limit']);

    if($_POST['inputs']){
        foreach ($_POST['inputs'] as $key => $value) {
            mysqli_real_escape_string($conn,$value);
            // print_r($value." ");
        }
    }
    // print_r($tradeType." ".$sellerRate." ".$lowLimit." ".$highLimit);
    echo json_encode($wallets);
}

?>
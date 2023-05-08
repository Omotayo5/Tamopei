<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$accountOwnerName = $_SESSION['name'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");
$response = array("Succesfull"=>"");
print_r($_POST);
if($_SERVER['REQUEST_METHOD']=== 'POST'){
    $selected = mysqli_real_escape_string($conn, $_POST['select']);
    $tradeType = mysqli_real_escape_string($conn, $_POST['Trade_Type']);
    $lowLimit=mysqli_real_escape_string($conn, $_POST['low_limit']);
    $highLimit=mysqli_real_escape_string($conn, $_POST['high_limit']);
    $sellerRate = mysqli_real_escape_string($conn, $_POST['selling_rate']);
    foreach ($_POST['inputs'] as $key => $value) {
        mysqli_real_escape_string($conn,$value);
        print_r($key);
    
    
   if($tradeType == 'sell'){
        $stmt2 = "INSERT INTO `p2p_posts_sell`(`user_id`, `user_name`, `wallet`, `amount`, `lowest_rate`, `highest_rate`, `user_rate`) VALUES ('$accountOwner','$accountOwnerName','$selected','$lowLimit','$highLimit','$sellerRate')";
        $entry = mysqli_query($conn,$stmt2);
        if($entry->num_rows>0){
            $response['Succesfull'] = "Sell order Posted succesfully";
        }


   }elseif ($tradeType == 'buy') {
        $stmt2 = "INSERT INTO `p2p_posts_buy`(`user_id`, `user_name`, `wallet`, `amount`, `lowest_rate`, `highest_rate`, `user_rate`) VALUES ('$accountOwner','$accountOwnerName','$selected','$lowLimit','$highLimit','$sellerRate')";
        $entry = mysqli_query($conn,$stmt2);
        if($entry->num_rows>0){
            $response['Succesfull'] = "Buy order Posted succesfully";
           }
   }
}
}
echo json_encode($response);

// will shift this wallet to another php file so it can be succesfully passed to the javascript or use xhttp
?>

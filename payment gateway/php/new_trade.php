<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$accountOwnerName = $_SESSION['name'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");
$response = array("Succesfull"=>"","Seller rate"=>"",);
// print_r($_SERVER['REQUEST_METHOD']);
if($_SERVER['REQUEST_METHOD']=== 'POST'){
    if($_POST){
        $selected = mysqli_real_escape_string($conn, $_POST['select']);
        $tradeType = mysqli_real_escape_string($conn, $_POST['Trade_Type']);
        $lowLimit=mysqli_real_escape_string($conn, $_POST['low_limit']);
        $highLimit=mysqli_real_escape_string($conn, $_POST['high_limit']);
        $sellerRate = mysqli_real_escape_string($conn, $_POST['selling_rate']);
        $inputs1=mysqli_real_escape_string($conn, $_POST['inputs'][0]);
        $inputs2=mysqli_real_escape_string($conn, $_POST['inputs'][1]);
        $inputs3=mysqli_real_escape_string($conn, $_POST['inputs'][2]);
        
       
            $sell = "INSERT INTO p2p_posts_sell (
            `user_id`,
            `user_name`,
            `wallet`,
            `lowest_rate`,
            `highest_rate`,
            `user_rate`,
            `payment_method_1`,
            `payment_method_2`,
            `payment_method_3`)
             VALUES (
            '$accountOwner',
            '$accountOwnerName',
            '{$selected}',
            '$lowLimit',
            '$highLimit',
            '$sellerRate',
            '$inputs1',
            '$inputs2',
            '$inputs3')";
            $sellentry = mysqli_query($conn,$sell);
            $response['Succesfull'] = "Sell order Posted succesfully";
            $response['seller rate'] = $sellerRate;
    }
    echo json_encode($response);
}
// will shift this wallet to another php file so it can be succesfully passed to the javascript or use xhttp
?>

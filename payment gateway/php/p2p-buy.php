<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$accountOwnerName = $_SESSION['name'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");
$response = array("Succesfull"=>"");
// print_r($_POST);
if($_SERVER['REQUEST_METHOD']==="POST"){
    $selected = mysqli_real_escape_string($conn, $_POST['select']);
    $tradeType = mysqli_real_escape_string($conn, $_POST['Trade_Type']);
    $lowLimit=mysqli_real_escape_string($conn, $_POST['low_limit']);
    $highLimit=mysqli_real_escape_string($conn, $_POST['high_limit']);
    $sellerRate = mysqli_real_escape_string($conn, $_POST['selling_rate']);
    $amountToBuy = mysqli_real_escape_string($conn, $_POST['amount_to_buy']);
    $inputs1=mysqli_real_escape_string($conn, $_POST['inputs'][0]);
    $inputs2=mysqli_real_escape_string($conn, $_POST['inputs'][1]);
    $inputs3=mysqli_real_escape_string($conn, $_POST['inputs'][2]);


    $sell = "INSERT INTO p2p_posts_buy (
        `user_id`,
        `user_name`,
        `wallet`,
        `amount`,
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
        '$amountToBuy',
        '$lowLimit',
        '$highLimit',
        '$sellerRate',
        '$inputs1',
        '$inputs2',
        '$inputs3')";
        $sellentry = mysqli_query($conn,$sell);
        if($sellentry)$response['Succesfull'] = "Buy order Posted succesfully";
}
echo json_encode($response);
?>
<?php
include('server.php');
// print_r($_POST);
// session_start();
$accountOwner = $_SESSION['id'];
// print_r($_SERVER['REQUEST_METHOD']);
if($_SERVER['REQUEST_METHOD']==="POST"){
    function clean_Input($userInpt){
        $userInpt = trim($userInpt);
        $userInpt = strip_tags($userInpt);
        $userInpt = stripslashes($userInpt);
        $userInpt = htmlspecialchars($userInpt);
        return $userInpt;
    }
    $user_id = clean_Input($_POST['user_id']);
    $wallet = clean_Input($_POST['wallet']);
    $order_unit = clean_Input($_POST['order_unit']);
    $receive_amount = clean_Input($_POST['receive']);


    $request = "INSERT INTO p2p_buy_order (`user_id`,
    `buyer_id`,
    `wallet`,
    `order_unit`,
    `receive_amount`)
    VALUES ('$user_id',
    '$accountOwner',
    '$wallet',
    '$order_unit',
    '$receive_amount')";
    $order = mysqli_query($conn,$request);

    if($order->num_rows > 0){
        echo "Order succesfull";
    }
}
?>
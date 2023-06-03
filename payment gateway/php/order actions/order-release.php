<?php
require('../server.php');
// session_start();
$accountOwner = $_SESSION['id'];
if($_SERVER['REQUEST_METHOD']==="POST"){
    function clean_Input($userInpt){
        $userInpt = trim($userInpt);
        $userInpt = strip_tags($userInpt);
        $userInpt = stripslashes($userInpt);
        $userInpt = htmlspecialchars($userInpt);
        return $userInpt;
    }

    $buyer_id = clean_Input($_POST['buyer_id']);
    $wallet = clean_Input($_POST['wallet']);
    $order_unit = clean_Input($_POST['unit_amount']) *1;
    $receive_amount = clean_Input($_POST['cost']) *1;
    $exchangeRate = clean_Input($_POST['exchange_rate']) *1;
    $orderIndex = clean_Input($_POST['trade_index']) *1;
    // $transaction_fee = clean_Input($_POST['transaction_fee']) *1;
    // $date = clean_Input($_POST['time']);
    // $tradeCost = $receive_amount + $transaction_fee;

    /*Remove the value from the p2p buy highLimit and add it to the buyers value*/
    $addValue="UPDATE wallet SET {$wallet} = {$wallet} + {$order_unit} WHERE user_id = $buyer_id ";
    $added = mysqli_query($conn,$addValue);
    //remove value from the sender's
    $removeValue = "UPDATE p2p_posts_buy SET highest_rate  = highest_rate - {$order_unit} WHERE `user_id`=$accountOwner";
    $removed = mysqli_query($conn,$removeValue);


/*First insert the data into the completed trade table in the database*/
    $completedTrade = "INSERT INTO `completed_trade`(
    `sender_id`, 
    `receiver_id`,
    `exchange_rate`, 
    `order_unit`, 
    `received_amount`, 
    `trade_id`)
    VALUES (
    '$accountOwner',
    '$buyer_id',
    '$exchangeRate',
    '$order_unit',
    '$receive_amount',
    '$orderIndex')";
    $complete = mysqli_query($conn,$completedTrade);

/*Then delete the data from the table it was so it will be removed from the pending trade queue*/
    // $deleteTrade = "DELETE FROM `p2p_buy_order` WHERE `ind` = $tradeIndex"
    $deleteTrade = "DELETE FROM `p2p_buy_order` WHERE ind = $orderIndex";
    $delete = mysqli_query($conn,$deleteTrade);
    echo json_encode($_POST);
}
?>
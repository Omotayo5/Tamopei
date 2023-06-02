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
    $order_unit = clean_Input($_POST['unit_amount']);
    $receive_amount = clean_Input($_POST['cost']);

    /*Remove the value from the p2p buy highLimit and add it to the buyers value*/
    $addValue="UPDATE wallet SET {$wallet} = {$wallet} + {$receive_amount} WHERE user_id = $buyer_id ";
    $added = mysqli_query($conn,$addValue);
    //remove value from the sender's
    $removeValue = "UPDATE p2p_post_buy SET highest_rate  = highest_rate - {$order_unit} WHERE `user_id`=$accountOwner";
    $removed = mysqli_query($conn,$removeValue);


/*First insert the data into the completed trade table in the database*/
    $completedTrade = "INSERT INTO `completed_trade`(
    `sender_id`, 
    `receiver_id`, 
    `trade_cost`, 
    `exchange_rate`, 
    `order_unit`, 
    `transaction_fee`, 
    `received_amount`, 
    `trade_id`, 
    `date`)
    VALUES (
    '[value-1]',
    '[value-2]',
    '[value-3]',
    '[value-4]',
    '[value-5]',
    '[value-6]',
    '[value-7]',
    '[value-8]',
    '[value-9]',
    '[value-10]')";
    $complete = mysqli_query($conn,$completedTrade);

/*Then delete the data from the table it was so it will be removed from the pending trade queue*/
    $deleteTrade = "DELETE FROM `p2p_buy_order` WHERE `ind` = $tradeIndex"
}
echo json_encode($accountOwner);
?>
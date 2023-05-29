<?php
include('server.php');
// print_r($_POST);
// session_start();
$accountOwner = $_SESSION['id'];
$response = array("Succesfull"=>"");
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

    if($order){
        $response['succesfull']= "Order succesfull";
    }


    /* when the order is placed the amount of the order placed will be removed from their total account and saved in p2p account
    and as buyers requests to purchase chunks of the trade and their trade is verified and approved then that amount will be removed from the 
    user balance immediately and added to the buyer account. the new account will be updated on the trade table and will be sent to the p2p table as the new highest rate. */

    /*will retrieve all order data from the table where this particular user is trying to buy and send it to the history page as an active ordre*/



    /*will also retrieve data from the table where this particular user is trying to sell then send it to the history page for approval if 
    another user requests to buy it*/
}
echo json_encode($response['succesfull']);
?>
<?php
//Connected to script.js for buy trade order request
include('server.php');
// print_r($_POST);
// session_start();
$accountOwner = $_SESSION['id'];
$data = [];
function clean_Input($userInpt){
    $userInpt = trim($userInpt);
    $userInpt = strip_tags($userInpt);
    $userInpt = stripslashes($userInpt);
    $userInpt = htmlspecialchars($userInpt);
    return $userInpt;
}
$refrence = substr(md5(uniqid(rand(),true)),0,25);//order refrence number
$UniqueRef = "SELECT COUNT(*) as count FROM transactions WHERE transaction_refrence = '$refrence'";
$result = mysqli_query($conn,$UniqueRef);
$row = mysqli_fetch_assoc($result);
$count = $row['count'];
$_SESSION['count']= $count;
if($count >0){
    $refrence = substr(md5(uniqid(rand(),true)),0,25);
}



if($_SERVER['REQUEST_METHOD']==="POST"){
    $type = clean_Input($_POST['Type']);

    if($_POST['Type']== 'buyWallet'){

        



    }elseif($_POST['Type']== 'sellWallet'){

        $sellerId = clean_Input($_POST['SellerId']);
        $wallet = clean_Input($_POST['BuyerWallet']);
        $sellerWallet = clean_Input($_POST['SellerWallet']);
        $orderUnit = clean_Input($_POST['OrderUnit']);
        $OrderCost = clean_Input($_POST['Cost']);
        $receiveAmount = clean_Input($_POST['ReceiveAmount']);
        $transactionFee = clean_Input($_POST['TransactionFee']);
        $exchangeRate = $OrderCost/$orderUnit;
        $type = 'Sell';

        echo $receiveAmount;
        echo $OrderCost." ".$wallet;

        $stmt = $conn->prepare("SELECT {$wallet} FROM `wallet` WHERE user_id = ?");
        $stmt->bind_param('s', $accountOwner);
        $stmt->execute();
        $stmt->bind_result($userBalance);
        $stmt->fetch();
        $stmt->close();
    
        if ($userBalance >= $OrderCost) {
            $stmt = $conn->prepare("SELECT user_id FROM `user_credentials` WHERE `user_id` = ?");
            $stmt->bind_param('s', $sellerId);
            $stmt->execute();
            $stmt->store_result();
    
            if ($stmt->num_rows > 0) {
                //Remove the order unit * rate from the buyer account and add it to the seller account;
                $stmt = $conn->prepare("UPDATE wallet SET {$wallet} = {$wallet} + ? WHERE `user_id` = ?");
                $stmt->bind_param('ds', $receiveAmount, $sellerId);
                $added = $stmt->execute();
    
                $stmt = $conn->prepare("UPDATE wallet SET {$wallet} = {$wallet} - ? WHERE `user_id` = ?");
                $stmt->bind_param('ds', $receiveAmount, $accountOwner);
                $removed = $stmt->execute();

                //Remove the order unit from the seller account and add it to the buyer account
                $stmt = $conn->prepare("UPDATE wallet SET {$sellerWallet} = {$sellerWallet} + ? WHERE `user_id` = ?");
                $stmt->bind_param('ds', $orderUnit, $accountOwner);
                $added = $stmt->execute();
    
                $stmt = $conn->prepare("UPDATE wallet SET {$sellerWallet} = {$sellerWallet} - ? WHERE `user_id` = ?");
                $stmt->bind_param('ds', $orderUnit, $sellerId);
                $removed = $stmt->execute();
    
                $stmt->close();

                $stmt = $conn->prepare(
                    "INSERT INTO `p2p_transaction`(
                    `seller_id`,
                    `buyer_id`, 
                    `type`, 
                    `wallet-from`, 
                    `wallet_to`, 
                    `exchange_rate`, 
                    `amount`,
                    `unit`,
                    `transaction_fee`, 
                    `transaction_reference`
                    ) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param('ddsssdddds', 
                $sellerId, 
                $accountOwner, 
                $type, 
                $sellerWallet, 
                $wallet, 
                $exchangeRate,
                $receiveAmount,
                $orderUnit,
                $transactionFee,
                $refrence
                );
                $result = $stmt->execute();
               
    
                if ($added && $result) {
                    $response["Successful"] = "Sent " . $receiveAmount . " " . $wallet . " to " . $sellerId;
                } else {
                    $response["Not Successful"] = "Transaction was not successful";
                }
                $stmt->close();
            } else {
                $response["user not found"] = "User not found";
            }
        } else {
            $response["Insufficient Balance"] = "Insufficient Balance";
        }
    
        echo json_encode($response);
    
        $conn->close();

}
    
    /* when the order is placed the amount of the order placed will be removed from their total account and saved in p2p account
    and as buyers requests to purchase chunks of the trade and their trade is verified and approved then that amount will be removed from the 
    user balance immediately and added to the buyer account. the new account will be updated on the trade table and will be sent to the p2p table as the new highest rate. */

    /*will retrieve all order data from the table where this particular user is trying to buy and send it to the history page as an active ordre*/

    /*will also retrieve data from the table where this particular user is trying to sell then send it to the history page for approval if 
    another user requests to buy it*/
}


// $dataO = "SELECT * FROM `p2p_buy_order` WHERE `seller_id` = $accountOwner";
// $orderData = mysqli_query($conn,$dataO);
//     if ($orderData->num_rows > 0) {
//         while($orderD = $orderData->fetch_assoc()) {
//             $dataRes[]= $orderD;
//             $data['order_data'] = $dataRes;
        
//         }
//       }

echo json_encode($data);
// print_r($orderData)
?>
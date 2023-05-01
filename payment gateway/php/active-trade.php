<?php
// session_start();
include('server.php');
$accountOwner = $_SESSION['id'];
$wallets=$_SESSION['wallet_balance'];

print_r($_POST);


$stmt2 = $conn->prepare("SELECT `Cedi` FROM `wallet` WHERE user_id =?");
$stmt2->bind_param('s',$accountOwner);
$stmt2->execute();
$stmt2->store_result();

if($stmt2){
    $stmt2->bind_result($userBalance);
    $stmt2->fetch();
    echo json_encode($wallets);
}
?>

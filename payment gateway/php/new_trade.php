<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");

$stmt2 = $conn->prepare("SELECT `Cedi` FROM `wallet` WHERE user_id =?");
$stmt2->bind_param('i',$accountOwner);
$stmt2->execute();
$stmt2->store_result();

if($stmt2){
    $stmt2->bind_result($userBalance);
    $stmt2->fetch();
}
echo $wallets;
// echo array(23=>"two");
?>

<?php
include('server.php');
// session_start();
$userId= $_SESSION['id'];
$sql = "SELECT Naira,Dollar,Cedi,Rand FROM wallet WHERE user_id = $userId";
$userBal = mysqli_query($conn,$sql);
$data = array();
if($userBal){
    $row = mysqli_fetch_assoc($userBal);
    //turn the data received from the database into a session variable;
    $_SESSION['wallet_balance']=json_encode($row);
    echo json_encode($row);
    // print_r($row);
}

?>
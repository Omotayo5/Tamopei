<?php
include('server.php');
session_start();
/*
Get the current user details from the session variables

*/

$user2name = $_POST['user-id'];
$amount = $_POST['amount'];
$select = $_POST['select'];

$_SESSION['sender'] = $_POST['sender-id'];
$_SESSION['receiver'] = $_POST['user-id'];
$_SESSION['amount'] = $_POST['amount'];
$_SESSION['wallet'] = $_POST['select'];

$sql = "SELECT * FROM wallet";

$user_credentials = mysqli_query($conn,$sql);

print_r($user_credentials);

?>
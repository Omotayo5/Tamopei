<?php
//Connect the server here and require it in the reat of the file
$serverName = 'localhost';
$username = 'root';
$password = 'password';
$databaseName = 'tamopei';
session_start();

$_SESSION['name']= "Okikiola";
$conn = new mysqli($serverName,$username,$password,$databaseName);
if($conn){
    // echo "connected";
}else{
    die('connection failed'.$conn->connect_error);
}
?>
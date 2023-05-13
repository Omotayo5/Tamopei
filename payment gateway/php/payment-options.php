<?php

$serverName = 'localhost';
$username = 'root';
$password = 'password';
$databaseName = 'tamopei payment options';
$conn = new mysqli($serverName,$username,$password,$databaseName);

if($conn){
    echo 'connected';
    print_r($_POST);
}

?>
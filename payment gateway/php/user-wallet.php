<?php
include('server.php');
/*
Js
const limit = {"limit":10};
const toDb = json.stringfy(limit);
xmlhttp = new xmlhttpRequest();

*Using the response from the server.
xhtml.onload=function(){
    console.log(this.responseText)
}

*sending a request to the server
xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
xmlhttp.open("POST","/php/user-wallet.php");
xmlhttp.send("data="toDb);
*/
//Receiving a request sent from an html input fields using javascript
// header("Content-Type:application/json;charset=UTF-8");
// $dataFromJs = json_decode($_POST["data"],false);//The data received from the jS
// session_start();

/*Do something with the data with the data returned from the database and if the data
 is more than one use the fetch_assoc to turn it to an associative array and echo it to the js file back*/
$userId= $_SESSION['id'];
$sql = "SELECT Naira,Dollar,Cedi,Rand FROM wallet WHERE user_id = $userId";
$userBal = mysqli_query($conn,$sql);
$data = array();
if($userBal){
    $row = mysqli_fetch_assoc($userBal);
    // print_r($row);
    $json=array_push($data,$row);
    echo json_encode($row);
}

?>
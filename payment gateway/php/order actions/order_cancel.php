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

//     /*First insert the data into the cancelled trade table in the database*/


//   /*Then delete the data from the table it was so it will be removed from the pending trade queue*/

}
echo json_encode($accountOwner);
?>
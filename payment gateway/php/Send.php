<?php
include('server.php');
$accountOwner = $_SESSION['id'];
if($_SERVER['REQUEST_METHOD']==="POST"){

    $select = clean_Input($_POST['select']);
    $receiverId = clean_Input($_POST['receiver_id']);
    $sentAmount = clean_Input($_POST['amount']);
    //to check if there are data posted to the php file
    // print_r($_POST);
    // print_r($sentAmount." ".$accountOwner." ");
    // print_r($select);
    
    function clean_Input($userInpt){
        $userInpt = trim($userInpt);
        $userInpt = strip_tags($userInpt);
        $userInpt = stripslashes($userInpt);
        $userInpt = htmlspecialchars($userInpt);
        return $userInpt;
    }
    
    //Initialized the message to be sent back to the javascript file to be handled
    //setting the content type for proper data handing in javaScript;

    header("Content-Type: application/json");
    $response = array(
    "Insufficient Balance"=>"",
    "user not found"=>"",
    "Succesfull"=>""
    );
    // print_r($response);
    $stmt2 = $conn->prepare("SELECT {$select} FROM `wallet` WHERE user_id =?");
    $stmt2->bind_param('s',$accountOwner);
    $stmt2->execute();
    $stmt2->store_result();
    if(!empty($select) && !empty($receiverId)&& !empty($sentAmount) ){
        //If the result is found inside the database then do the following.
        if($stmt2){
            //Binding the currency selected to a variable called $userBalance so the value of the currency is now stored as the user balance.
            $stmt2->bind_result($userBalance);
            $stmt2->fetch();
        
            // print_r($userBalance." ");
            if($userBalance>= $sentAmount){
                //Check if the Benefactor's name exists inside the database.
                $user2 = "SELECT user_id FROM `user_credentials` WHERE `user_id` ='$receiverId'";
                $stmt3 = mysqli_query($conn,$user2);
    
                //if the user exists in the database, add to the user's account
                if($stmt3->num_rows>0){
                    // $beneficiaryId= $stmt3->fetch_assoc()['user_id'];
                    // print_r(" ".$beneficiaryId);
                    //Getting and setting new transaction refrence from the database
    
                    //calculate charges
                    $charges = $sentAmount*0.01;
                    //value the beneficiary will receive
                    $toBeneficiary = $sentAmount - $charges;
                    $_SESSION['charges'] = $charges;
                    // print_r(" ".$charges);
                    //add value to the beneficiary account
                    
                    $addValue="UPDATE wallet SET {$select} = {$select} + {$toBeneficiary} WHERE user_id =$receiverId";
                    $added = mysqli_query($conn,$addValue);
                    //remove value from the sender's
                    $removeValue = "UPDATE wallet SET {$select}  = {$select} - {$sentAmount} WHERE `user_id`=$accountOwner";
                    $removed = mysqli_query($conn,$removeValue);
                    

                    //Generating a unique ID for transaction refrence
                    $refrence = substr(md5(uniqid(rand(),true)),0,20);
                    $UniqueRef = "SELECT COUNT(*) as count FROM transactions WHERE transaction_refrence = '$refrence'";
                    $result = mysqli_query($conn,$UniqueRef);
                    $row = mysqli_fetch_assoc($result);
                    $count = $row['count'];
                    $_SESSION['count']= $count;
                    if($count >0){
                        $refrence = substr(md5(uniqid(rand(),true)),0,20);
                    }
                    //1.write the query for the database
                    $sql = "INSERT INTO `transactions`(`sender_id`, `receiver_id`, `currency_wallet`, `amount`, `transaction_charge`,`transaction_refrence`) VALUES ('$accountOwner','$beneficiaryId','{$select}','$sentAmount','$charges','$refrence')";
                    //2.connect the query and the database.
                    $result = mysqli_query($conn,$sql);
                    
                    //if the data is inserted into the database then it means a row inside the database has been affected
                    //then it means the affected row is greater than 1.
                    if($added->affected_rows>0){
        
                        $response["Succesfull"] = "Sent " .$sentAmount." ".$select ." to ".$receiverId. " " .$sentAmount. " has been removed from " .$accountOwner. " account";
                        // echo json_encode($response["Succesfull"]);
                        header('location:notifications.php');
                    }else{
                        $_SESSION['response']=$response['Not Successful']='Transaction was not Successful';
                        //  echo json_encode($response['Not Successful']);
                         header('location:notifications.php');
                    }
        
                }else if($stmt3->num_rows<1){
                    //If user is not found inside the database.
                    $_SESSION['response']=$response["user not found"]= "User not found";
                    // echo json_encode($response['user not found']);
                    header('location:notifications.php');
                }
                $stmt3->close();
            }else{
                //if sender account balance is not up to the value user wants to send
                $_SESSION['response']=$response["insufficient Balance"]= "Insufficient Balance";
                // echo json_encode($response['insufficient Balance']);
                header('location:notifications.php');
            }
        }
        
    }elseif (empty($select)) {
        return header('location:notifications.php');
    } 
    
    $stmt2->close();
    $conn->close();
    echo json_encode($_POST);
}
?>
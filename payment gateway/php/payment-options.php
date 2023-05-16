<?php/*
session_start();
$accountOwner = $_SESSION['id'];
$serverName = 'localhost';
$username = 'root';
$password = 'password';
$databaseName = 'tamopei payment options';
$conn = new mysqli($serverName,$username,$password,$databaseName);

if($conn){
    // echo 'connected';

    function clean_Input($userInpt){
        $userInpt = trim($userInpt);
        $userInpt = strip_tags($userInpt);
        $userInpt = stripslashes($userInpt);
        $userInpt = htmlspecialchars($userInpt);
        return $userInpt;
    }
    $accType = $_POST;
    $_POST['bank'] = 'bank';
    
        if($_POST['bank']){
            $bankName = clean_Input($_POST['bank_name']);
            $accountName = clean_Input($_POST['Account_name']);
            $accountNumber = clean_Input($_POST['account_number']);
            $sql = "INSERT INTO `bank`(`user_id`, `bank_name`, `user_name`, `account_number`) VALUES ('$accountOwner','$bankName','$accountName','$accountNumber')";
            $bank = mysqli_query($conn,$sql);
         print_r($accType);
        }
        elseif($_POST['chipper_acc']){
            $userNameChipper = clean_Input($_POST['user_name']);
            $chipperMail = clean_Input($_POST['chipper_mail']);
            $sql = "INSERT INTO `chipper`(`user_name`, `account_number`) VALUES ('$accountOwner','$userNameChipper','$chipperMail')";
            $bank = mysqli_query($conn,$sql);
            print_r($accType);
            return;
        }elseif($_POST['apple_acc']){
            print_r($accType);
        }
        elseif($_POST['momo_acc']){
            print_r($accType);
        }
        elseif($_POST['pi_wallet']){
            print_r($accType);
        }
        elseif($_POST['paypal_acc']){
            print_r($accType);
        }
        elseif($_POST['skrill_acc']){
            print_r($accType);
        }
        elseif($_POST['cashapp_acc']){
            print_r($accType);
        }
        elseif($_POST['google_pay_acc']){
            print_r($accType);
        }
    }*/

    ?>
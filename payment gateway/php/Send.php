<?php
// session_start();
require 'server.php';



$accountOwner = $_SESSION['id'];

  $select = clean_Input($_POST['select']);
  $receiverName = clean_Input($_POST['user_name']);
  $sentAmount = clean_Input($_POST['amount']);

  function clean_Input($userInpt) {
    $userInpt = trim($userInpt);
    $userInpt = strip_tags($userInpt);
    $userInpt = stripslashes($userInpt);
    $userInpt = htmlspecialchars($userInpt);
    return $userInpt;
  }

  $response = array(
    "Insufficient Balance" => "",
    "User not found" => "",
    "Successful" => ""
  );

  $select_stmt = $conn->prepare("SELECT $select FROM `wallet` WHERE `user_id` = ?");
  $select_stmt->bindParam('s', $accountOwner);
  $select_stmt->execute();
  $userBalance = $select_stmt->fetchColumn();
  $select_stmt->closeCursor();

  if ($userBalance >= $sentAmount) {
    $receiver_stmt = $conn->prepare("SELECT user_id FROM `user_credentials` WHERE `first_name` = :receiver_name");
    $receiver_stmt->bindParam(':receiver_name', $receiverName);
    $receiver_stmt->execute();
    $receiver = $receiver_stmt->fetchColumn();
    $receiver_stmt->closeCursor();

    if ($receiver) {
      $charges = $sentAmount * 0.01;
      $toBeneficiary = $sentAmount - $charges;

      $addValue = "UPDATE wallet SET {$select} = {$select} + {$toBeneficiary} WHERE user_id = :receiver";
      $add_stmt = $conn->prepare($addValue);
      $add_stmt->bindParam(':receiver', $receiver);
      $added = $add_stmt->execute();

      $removeValue = "UPDATE wallet SET {$select} = {$select} - {$sentAmount} WHERE `user_id` = :accountOwner";
      $remove_stmt = $conn->prepare($removeValue);
      $remove_stmt->bindParam(':accountOwner', $accountOwner, PDO::PARAM_INT);
      $removed = $remove_stmt->execute();

      $sql = "INSERT INTO `transactions`(`sender_id`, `receiver_id`, `currency_wallet`, `amount`, `transaction_charge`) VALUES (:accountOwner, :receiver, '{$select}', {$sentAmount}, {$charges})";
      $transaction_stmt = $conn->prepare($sql);
      $transaction_stmt->bindParam(':accountOwner', $accountOwner, PDO::PARAM_INT);
      $transaction_stmt->bindParam(':receiver', $receiver, PDO::PARAM_INT);
      $transaction_stmt->execute();

      if ($added && $removed && $transaction_stmt->rowCount() > 0) {
        $response["Successful"] = "Sent " . $sentAmount . " " . $select . " to " . $receiverName . ". " . $sentAmount . " has been removed from " . $accountOwner . " account";
        $_SESSION['charges'] = $charges;
        header('location: payment gateway/index.html');
      } else {
        $response['Not Successful'] = 'Transaction was not successful';
        echo $response;
      }
    } else {
      $response["User not found"] = $receiverName . " not found";
      echo $response['User not found'];
    }
    }
    
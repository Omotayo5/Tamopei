<?php
session_start();
require 'server.php';

$accountOwner = $_SESSION['id'];

if (isset($_POST['submit'])) {
    $select = clean_Input($_POST['select']);
    $receiverName = clean_Input($_POST['user_name']);
    $sentAmount = clean_Input($_POST['amount']);

    $response = array(
        "Insufficient Balance" => "",
        "user not found" => "",
        "Successful" => ""
    );

    $stmt = $pdo->prepare("SELECT $select FROM wallet WHERE user_id = ?");
    $stmt->execute([$accountOwner]);
    $userBalance = $stmt->fetchColumn();

    if ($userBalance >= $sentAmount) {
        $stmt = $pdo->prepare("SELECT user_id FROM user_credentials WHERE first_name = ?");
        $stmt->execute([$receiverName]);
        $beneficiaryId = $stmt->fetchColumn();

        if ($beneficiaryId) {
            $charges = $sentAmount * 0.01;
            $toBeneficiary = $sentAmount - $charges;

            $pdo->beginTransaction();

            $stmt = $pdo->prepare("UPDATE wallet SET $select = $select + ? WHERE user_id = ?");
            $stmt->execute([$toBeneficiary, $beneficiaryId]);

            $stmt = $pdo->prepare("UPDATE wallet SET $select = $select - ? WHERE user_id = ?");
            $stmt->execute([$sentAmount, $accountOwner]);

            $stmt = $pdo->prepare("INSERT INTO transactions (sender_id, receiver_id, currency_wallet, amount, transaction_charge) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$accountOwner, $beneficiaryId, $select, $sentAmount, $charges]);

            if ($pdo->commit()) {
                $response["Successful"] = "Sent $sentAmount $select to $receiverName. $sentAmount has been removed from $accountOwner account.";
                header('location:payment gateway/index.html');
            } else {
                $pdo->rollBack();
                $response["Not Successful"] = "Transaction was not Successful.";
                echo json_encode($response);
            }
        } else {
            $response["user not found"] = "$receiverName not found.";
            echo json_encode($response);
        }
    } else {
        $response["Insufficient Balance"] = "Insufficient.";
        echo json_encode($response);
    }
}

function clean_Input($userInpt) {
    $userInpt = trim($userInpt);
    $userInpt = strip_tags($userInpt);
    $userInpt = stripslashes($userInpt);
    $userInpt = htmlspecialchars($userInpt);
    return $userInpt;
}

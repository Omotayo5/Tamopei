<?php
// Make sure to sanitize and validate user inputs before using them in your queries

include('server.php');

// Check if the user is logged in and retrieve necessary session data
// session_start();
if (!isset($_SESSION['id'], $_SESSION['name'], $_SESSION['wallet_balance'])) {
    // Handle session not being set or expired
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

$accountOwner = $_SESSION['id'];
$accountOwnerName = $_SESSION['name'];
$wallets = $_SESSION['wallet_balance'];

header("Content-Type: application/json");
$response = array("Successful" => "", "Failed" => "");
$posted = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selected = mysqli_real_escape_string($conn, $_POST['wallet']);
    $lowLimit = mysqli_real_escape_string($conn, $_POST['low_limit']);
    $highLimit = mysqli_real_escape_string($conn, $_POST['high_limit']);
    $Rate = mysqli_real_escape_string($conn, $_POST['rate']);
    $paymentMethod = mysqli_real_escape_string($conn, $_POST['method']);

    if ($_POST['type'] === 'buy') {
        // Prepare the query using prepared statements for better security
        $buy = "INSERT INTO p2p_posts_buy (`user_id`, `user_name`, `wallet`, `lowest_rate`, `highest_rate`, `user_rate`, `payment_method`)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $buyStmt = mysqli_prepare($conn, $buy);
        mysqli_stmt_bind_param($buyStmt, "issssss", $accountOwner, $accountOwnerName, $selected, $lowLimit, $highLimit, $Rate, $paymentMethod);
        $buyResult = mysqli_stmt_execute($buyStmt);

        if ($buyResult) {
            $posted['wallet']= $selected;
            $posted['low_limit']=$lowLimit;
            $posted['high_limit']=$highLimit;
            $posted['rate']=$Rate;
            $posted['payment_method']=$paymentMethod;
            $response["Successful"] = $posted;
        } else {
            // Handle the error case when the query execution fails
            $response['Failed'] = "Failed to post buy order";
        }

        mysqli_stmt_close($buyStmt);
    }

    if ($_POST['type'] === 'sell') {
        // Prepare the query using prepared statements for better security
        $sell = "INSERT INTO p2p_posts_sell (`user_id`, `user_name`, `wallet`, `lowest_rate`, `highest_rate`, `user_rate`, `payment_method`)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $sellStmt = mysqli_prepare($conn, $sell);
        mysqli_stmt_bind_param($sellStmt, "issssss", $accountOwner, $accountOwnerName, $selected, $lowLimit, $highLimit, $Rate, $paymentMethod);
        $sellResult = mysqli_stmt_execute($sellStmt);

        if ($sellResult) {
            $posted['wallet']= $selected;
            $posted['low_limit']=$lowLimit;
            $posted['high_limit']=$highLimit;
            $posted['rate']=$Rate;
            $posted['payment_method']=$paymentMethod;
            $response["Successful"] = $posted;
        } else {
            // Handle the error case when the query execution fails
            $response['Failed'] = "Failed to post sell order";
        }

        mysqli_stmt_close($sellStmt);
    }
}

echo json_encode($response);

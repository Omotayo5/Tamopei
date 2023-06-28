<?php
include('server.php');
$accountOwner = $_SESSION['id'];
$accountOwnerName = $_SESSION['name'];
$wallets=$_SESSION['wallet_balance'];
header("Content-Type:application/json");
$response = array("Successful"=>"");
// print_r($_POST);
if($_SERVER['REQUEST_METHOD']==="POST"){
    $selected = mysqli_real_escape_string($conn, $_POST['select']);
    $tradeType = mysqli_real_escape_string($conn, $_POST['Trade_Type']);
    $lowLimit = mysqli_real_escape_string($conn, $_POST['low_limit']);
    $highLimit = mysqli_real_escape_string($conn, $_POST['high_limit']);
    $sellerRate = mysqli_real_escape_string($conn, $_POST['selling_rate']);
    $amountToBuy = mysqli_real_escape_string($conn, $_POST['amount_to_buy']);
    $inputs = $_POST['inputs'];

    // Ensure inputs are set and filter out empty values
    $inputs = array_filter($inputs);

    // Generate placeholders for prepared statement
    $inputPlaceholders = implode(',', array_fill(0, count($inputs), '?'));

    $sell = "INSERT INTO p2p_posts_buy (
        `user_id`,
        `user_name`,
        `wallet`,
        `amount`,
        `lowest_rate`,
        `highest_rate`,
        `user_rate`,
        `payment_method_1`,
        `payment_method_2`,
        `payment_method_3`)
         VALUES (
        '$accountOwner',
        '$accountOwnerName',
        '{$selected}',
        '$amountToBuy',
        '$lowLimit',
        '$highLimit',
        '$sellerRate',
        $inputPlaceholders)";
    
    // Prepare the statement
    $stmt = $conn->prepare($sell);

    // Bind the parameters dynamically
    $stmt->bind_param('ssssss' . str_repeat('s', count($inputs)), $accountOwner, $accountOwnerName, $selected, $amountToBuy, $lowLimit, $highLimit, $sellerRate, ...$inputs);

    // Execute the statement
    $sellentry = $stmt->execute();

    if($sellentry) {
        $response['Successful'] = "Buy order posted successfully";
        $removeValue = "UPDATE wallet SET {$selected} = {$selected} - {$highLimit} WHERE `user_id` = $accountOwner";
        $removed = mysqli_query($conn, $removeValue);
    }
}

echo json_encode($response);
?>

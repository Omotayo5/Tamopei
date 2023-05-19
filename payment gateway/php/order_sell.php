<?php
// session_start();
include('server.php');
$accountOwner = $_SESSION['id'];
$wallets=$_SESSION['wallet_balance'];
$stmt2 = "SELECT 
`user_id`,
`user_name`,
`wallet`,
`lowest_rate`,
`highest_rate`,
`user_rate`,
`payment_method_1`,
`payment_method_2`,
`payment_method_3`,
`date` FROM `p2p_posts_sell`
ORDER BY `date` DESC";
$result = mysqli_query($conn,$stmt2);

//more like if(result.num_rows > 0) in js.
if ($result->num_rows > 0) {
    //turned the data variable into an array variable
    $data = array();
    //check if the row contain the result and turn the result to an associative array ['key'=>'value'] example $database = ['name'=>'david','surname'=>'Omotoso', etc]
    while($row = $result->fetch_assoc()) {
              //variable,arraydata
      // array_push($data, $row);
      $data[] =$row;
    }
    //convert data array to json format
    echo json_encode($data);
  }
  //close the database connection
//   $conn->close();  
?>

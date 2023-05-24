<?php
// session_start();
include('server.php');
// $accountOwner = $_SESSION['id'];
$data = array();
$response = array("Succesfull"=>"");
$wallets=$_SESSION['wallet_balance'];
$posts = array('Posts'=>'');
$stmt2 = "SELECT 
`user_id`,
`user_name`,
`wallet`,
`amount`,
`lowest_rate`,
`highest_rate`,
`user_rate`,
`payment_method_1`,
`payment_method_2`,
`payment_method_3`,
`date` FROM `p2p_posts_buy`
ORDER BY date DESC";
$result = mysqli_query($conn,$stmt2);

//more like if(result.num_rows > 0) in js.
if ($result->num_rows > 0) {
    //turned the data variable into an array variable

    //check if the row contain the result and turn the result to an associative array ['key'=>'value'] example $database = ['name'=>'david','surname'=>'Omotoso', etc]
    while($row = $result->fetch_assoc()) {
              //variable,arraydata
      // array_push($data, $row);
      $dataRes[] =$row;
      $data['one']= $dataRes;
    }
    //convert data array to json format
  }
  $response['Succesfull'] = "Buy order Posted succesfully";
  // $posts['Post'] = $_POST;
  $data['two'] = $response;
  $data['three']= $_POST;
  
  echo json_encode($data);
  //close the database connection
//   $conn->close();  
?>

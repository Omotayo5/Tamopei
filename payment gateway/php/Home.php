<?php
include('server.php');
// session_start();//The session already started inside the Home php can also be used here without starting another new session
$sql = "SELECT * FROM tamopei.user_credentials WHERE first_name = 'Babalola'";
$user_credentials = mysqli_query($conn,$sql);
if($user_credentials){
    $row = mysqli_fetch_assoc($user_credentials);
    $name=$row['first_name'];
    $id=$row['user_id'];
    $_SESSION['name']= $name;
    $_SESSION['id'] = $id;
    echo json_encode($row);
}

?>
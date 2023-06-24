<?php
include('server.php');
// session_start();//The session already started inside the Home php can also be used here without starting another new session
$sql = "SELECT * FROM tamopei.user_credentials WHERE first_name = 'David'";
$user_credentials = mysqli_query($conn,$sql);
if($user_credentials){
    $row = mysqli_fetch_assoc($user_credentials);
    $name=$row['first_name'];
    $id=$row['user_id'];
    $_SESSION['name']= $name;
    $_SESSION['id'] = $id;
    echo json_encode($row);
}



// ENCRYPTING AND DECRYPTING PASSWORDS
// $password = "password123"; // The password you want to hash

// // Hash the password using MD5
// $hashedPassword = md5($password);

// // Store $hashedPassword in your database or wherever you need to save it
// $passwordFromUser = "password123"; // The password entered by the user
// $hashedPasswordFromDB = "5f4dcc3b5aa765d61d8327deb882cf99"; // Retrieve hashed password from the database

// // Verify the password
// if (md5($passwordFromUser) === $hashedPasswordFromDB) {
//     // Password is correct
//     echo "Password is correct";
// } else {
//     // Password is incorrect
//     echo "Password is incorrect";
// }



?>
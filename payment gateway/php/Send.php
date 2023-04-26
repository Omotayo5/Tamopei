<?php
include('server.php');
session_start();
$conn = new mysqli($serverName,$username,$password,$databaseName);
if($conn){ 
}else{
    die('connection failed'.$conn->connect_error);
}

$user1name = $_SESSION['id'];
$user2name = $_POST['user_name'];
$amount = $_POST['amount'];
$select = $_POST['select'];


//Initialized the message to be sent back to the javascript file to be handled
$error = array(
"Insufficient Balance"=>"",
"user not found"=>"",
"Succesfull"=>""
);


//Selecting only one currency from the database
$stmt2 = $conn->prepare("SELECT {$select} FROM `wallet` WHERE `user_id` =?");
//instead of writing out the value keyword VALUE(), we bind the value.
$stmt2->bind_param('s',$user1name);
//Executing the database conection more like calling afunction with a method on the sql, $stmt2.execute()
$stmt2->execute();
//Storing the returned result inside thesame variable.
$stmt2->store_result();


//If the result is found inside the database then do the following.
if($stmt2->num_rows>0){
    //Binding the currency selected to a variable called $userBalance so the value of the currency is now stored as the user balance.
    $stmt2->bind_result($userBalance);
    $stmt2->fetch();

    if($userBalance>= $amount){
        //Check if the Benefactor's name exists inside the database.
        $stmt3=$conn->prepare("SELECT 1 FROM `users` WHERE `userName`=?");
        $stmt3->bind_param('s',$user2name);
        $stmt3->execute();
        $stmt3->store_result();
        
        //if the user exists in the database, add to the user's account
        if($stmt3->num_rows>0){
            //calculate charges
            $charges = $amount*0.01;
            //value the beneficiary will receive
            $toBeneficiary = $amount - $charges;
            $_SESSION['charges'] = $charges;
            //add value to the beneficiary account
            $stmt=$conn->prepare("UPDATE `users` SET {$select}  = {$select}  + ? WHERE `userName`=?");
            $stmt->bind_param("is",$toBeneficiary,$user2name);

            //remove value from the sender's
            $stmt1=$conn->prepare("UPDATE `users` SET {$select}  = {$select} - ? WHERE `userName`=?");
            $stmt1->bind_param("is",$amount,$user1name);

            //1.write the query for the database
            $sql = "INSERT INTO `inserts`(`value`, `name`) VALUES ('$charges','$user1name')";
            //2.connect the query and the database.
            $result = mysqli_query($conn,$sql);
            
            //execute the sql statement in a transaction.
            $conn->begin_transaction();
            $stmt->execute();
            $stmt1->execute();
            $conn->commit();
            //if the data is inserted into the database then it means a row inside the database has been affected
            //then it means the affected row is greater than 1.
            if($stmt->affected_rows>0){

                $error["Succesfull"] = "Sent " .$amount."".$select ." to ".$user2name. " " .$amount. " has been removed from " .$user1name. " account";
                header('location:db.php');
            }else{
                 ;
            }
            $stmt->close();
            $stmt1->close();

        }else{
            //If user is not found inside the database.
            $error["user not found"]= $user2name. " not found";
        }
        $stmt3->close();
    }else{
        //if sender account balance is not up to the value user wants to send
        $error["insufficient Balance"]= "Insufficient Balance";
    }
}

// GETTING DATA FROM THE DATABASE
//1.Select from the database table order by the .....
$showTrnx = "SELECT * FROM inserts ORDER BY transaction_time";
//2.Connect the database with the query
$data = mysqli_query($conn,$showTrnx);
$res = mysqli_fetch_all($data);

// print_r(end($res));

$_SESSION['last'] = end($res);
//loop throuhg the array and map the data with variables.
foreach($res as $r){
    $id = $r[0];
    $profit = $r[1];
    $name = $r[2];
    $date = $r[3];
    echo "<h3>".htmlspecialchars($name)."</h3><br/>".date($date);
}
$stmt2->close();
$conn->close();
?>

?>
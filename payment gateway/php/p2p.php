<?php

include('server.php');
$sql = "SELECT * FROM p2p_transaction";

$result = mysqli_query($conn,$sql);

print_r($result)
?>
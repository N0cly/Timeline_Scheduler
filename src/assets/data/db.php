<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  $dbHost = 'sma8196.eu.eurocopter.corp';
  $dbPort = 3306;
  $dbName = 'talend_logs_val';
  $dbUser = 'talendlogs';
  $dbPass = 'talendlogs';

  // Create connection
  $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName,$dbPort );

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  //echo "Connected successfully";
  $sql = "SELECT id, moment, father_pid, job, code FROM talend_logs ";
  $result = mysqli_query($conn,$sql);
  $myArray = array();
  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $myArray[] = array_map("utf8_encode", $row);
    }
    echo json_encode($myArray);
  }
  else
  {
    echo "0 results";
  }
?>

<?php


$dbHost = 'sma8196.eu.eurocopter.corp';
$dbPort = '3306';
$dbName = 'talend_logs_val';
$dbUser = 'talendlogs';
$dbPass = 'talendlogs';

    try {
      $db = new PDO("mysql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPass);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    } catch (PDOException $e) {
      die('Erreur de connexion à la base de données : ' . $e->getMessage());
    }

$query = "SELECT * FROM talend_logs_val";
$result = $db->query($query);

if (!$result){
  die("Echec de la requete SQL: " . $db->error);
}

$data = array();
while ($row = $result->fetch_assoc()){
  $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);

$db->close();
?>

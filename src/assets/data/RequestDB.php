<?php

class RequestDB
{

  public function connectDB(){

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
  }

  public function requestDataByDay($day){

    $query = "SELECT id, moment, father_pid, job, code FROM talend_logs_val WHERE moment = :date ";
    $stmt = $this->connectDB()->prepare($query);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->execute();

    $result = $stmt->fetchAll((PDO::FETCH_ASSOC));
//    return $stmt->fetchAll((PDO::FETCH_ASSOC));
    header('Content-Type: application/json');
    echo json_encode($result);

  }

}

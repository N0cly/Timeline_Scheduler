<?php

namespace App\Service;

use mysqli;


class JobService
{


    public function getPlanning($moment):array
    {
        $conn = new mysqli($_ENV["dbHost"], $_ENV["dbUser"], $_ENV["dbPass"], $_ENV["dbName"], $_ENV["dbPort"] );

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT id, moment, father_pid, job, `code` FROM talend_logs WHERE moment >= '$moment 00:00:00' AND moment <= '$moment 23:59:59'";
        $result = mysqli_query($conn,$sql);
        $data = [];
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response         = [];
        $response['RECORDS'] =  $data;

        return $response;
    }

    public function postPlanning($request): array
    {
        $conn = new mysqli($_ENV["dbHost"], $_ENV["dbUser"], $_ENV["dbPass"], $_ENV["dbName"], $_ENV["dbPort"] );

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT id, moment, father_pid, job, `code` FROM talend_logs WHERE moment >= '$request 00:00:00' AND moment <= '$request 23:59:59'";
        $result = mysqli_query($conn,$sql);
        $data = [];
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response         = [];
        $response['RECORDS'] =  $data;

        return $response;
    }
}
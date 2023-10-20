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

//         $json = json_encode($response);
////        echo $json;

        return $response;
    }

    public function postPlanning(string $moment): array
    {
        if (!$moment) {
            return new JsonResponse(['error' => 'Paramètre "moment" manquant dans la requête POST'], 400);
        }

        $conn = new mysqli($_ENV["dbHost"], $_ENV["dbUser"], $_ENV["dbPass"], $_ENV["dbName"], $_ENV["dbPort"]);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Utilisez des requêtes préparées pour éviter les injections SQL
        $sql = "SELECT id, moment, father_pid, job, `code` FROM talend_logs WHERE moment >= ? AND moment <= ?";
        $stmt = $conn->prepare($sql);

        // Créez la date de début et de fin
        $momentStart = $moment . " 00:00:00";
        $momentEnd = $moment . " 23:59:59";

        $stmt->bind_param("ss", $momentStart, $momentEnd);
        $stmt->execute();

        $result = $stmt->get_result();
        $data = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        $response = [];
        $response['RECORDS'] = $data;

        return $response;
    }
}
<?php

require '../db.php';

function read_data($key) {
    global $connection;
    $data = [];
    $query = "SELECT * FROM $key";
    $result = $connection->query($query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
    }

    return $data;
}

$data = [
    "specializations" => read_data("specializations"),
    "doctors" => read_data("doctors"),
    "cards" => read_data("cards")
];

echo json_encode($data);
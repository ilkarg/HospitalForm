<?php

require '../db.php';

if (isset($_POST["full_name"], $_POST["date"], $_POST["phone"], $_POST["doctor"], $_POST["card"])) {
    $response = ["response" => "Во время записи к врачу, что-то пошло не так"];

    $full_name = $_POST["full_name"];
    $date = $_POST["date"];
    $phone = $_POST["phone"];
    $doctor = $_POST["doctor"];
    $card = $_POST["card"];
    $query = "INSERT INTO patients (`full_name`, `birthday`, `phone`, `doctor`, `card`) VALUES ('$full_name', '$date', '$phone', $doctor, $card)";
    $result = $connection->query($query);

    if ($result) {
        $response = [
            "response" => "Вы успешно записались к врачу. С вами свяжутся в ближайшее время, ожидайте"
        ];

        $query = "UPDATE cards SET booked = true WHERE id = $card";
        $result = $connection->query($query);
    }

    echo json_encode($response);
}
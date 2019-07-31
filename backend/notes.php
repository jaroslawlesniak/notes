<?php

    header("Content-type: application/json; charset=utf-8");
    include "./connection.php";

    $pdo = new PDO('mysql:host='.Connection::HOST.';dbname='.Connection::DATABASE.';charset=utf8', Connection::USER, Connection::PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  

    $conenctionType = $_SERVER['REQUEST_METHOD'];

    switch($conenctionType) {
        case "GET":
            
        break;
        case "POST":

        break;
        case "PUT":

        break;
        case "DELETE":

        break;
    }
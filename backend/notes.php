<?php

    header("Content-type: application/json; charset=utf-8");
    include "./connection.php";

    $pdo = new PDO('mysql:host='.Connection::HOST.';dbname='.Connection::DATABASE.';charset=utf8', Connection::USER, Connection::PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  

    $conenctionType = $_SERVER['REQUEST_METHOD'];

    switch($conenctionType) {
        case "GET":
            if(isset($_GET['category']) && !empty($_GET['category'])) {
                $query = null;
                $notes = [];

                switch($_GET['category']) {
                    case 'inbox':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 0');
                    break;
                    case 'archive':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 1');
                    break;
                    case 'trash':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 1');
                    break;
                }

                if($query) {
                    while($note = $query->fetch())
                    {
                        $notes[] = ['ID' => $note['ID'], 'Title' => $note['Title'], 'Content' => $note['Content']];
                    }
    
                    echo json_encode(['notes' => $notes], JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(['notes' => []]);
            }
        break;
        case "POST":

        break;
        case "PUT":

        break;
        case "DELETE":

        break;
    }
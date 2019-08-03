<?php

    header("Content-type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");

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
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 0 ORDER BY ID DESC');
                    break;
                    case 'archive':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 1 ORDER BY ID DESC');
                    break;
                    case 'trash':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 1 ORDER BY ID DESC');
                    break;
                }

                if($query) {
                    while($note = $query->fetch())
                    {
                        $notes[] = ['id' => (int) $note['ID'], 'title' => $note['title'], 'content' => $note['content']];
                    }
    
                    echo json_encode(['notes' => $notes], JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(['notes' => []], JSON_PRETTY_PRINT);
            }
        break;
        case "POST":
            $query = $pdo->prepare('INSERT INTO `notes` (`title`, `content`) VALUES (:title, :content)');

            $query->bindValue(':title', '', PDO::PARAM_STR);
            $query->bindValue(':content', '', PDO::PARAM_STR);

            $success = $query->execute();

            if($success) {
                $query = $pdo->query('SELECT * FROM `notes` ORDER BY ID DESC LIMIT 1');

                if($query) {
                    while($note = $query->fetch()) {
                        echo json_encode(["success" => true, "id" => $note['ID']]);
                        break;
                    }
                }
            } else {
                echo json_encode(["success" => false]);
            }
        break;
        case "PUT":
            if(isset($_GET['id']) && !empty($_GET['id'])) {
                $post_vars = file_get_contents("php://input");
                $post_vars = json_decode($post_vars, true);

                if(isset($post_vars["type"]) && !empty($post_vars["type"])) {
                    $query = $pdo->prepare('UPDATE `notes` SET `archive` = 1 WHERE `ID` = :id');
                    $query->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
                    $success = $query->execute();

                    echo json_encode(["success" => (boolean) $success]); 
                } else {
                    $query = $pdo->prepare('UPDATE `notes` SET `title` = :title, `content` = :content WHERE `ID` = :id');
                    $query->bindValue(':title', $post_vars["title"], PDO::PARAM_STR);
                    $query->bindValue(':content', $post_vars["content"], PDO::PARAM_STR);
                    $query->bindValue(':id', $post_vars["id"], PDO::PARAM_INT);
    
                    $success = $query->execute();
    
                    echo json_encode(["success" => (boolean) $success]);
                }               
            }
        break;
        case "DELETE":
            if(isset($_GET['id']) && !empty($_GET['id'])) {
                $query = $pdo->prepare('UPDATE `notes` SET `trash` = 1 WHERE `ID` = :id');
                $query->bindValue(':id', $_GET["id"], PDO::PARAM_INT);
                $success = $query->execute();

                echo json_encode(["success" => (boolean) $success]);
            }
        break;
    }
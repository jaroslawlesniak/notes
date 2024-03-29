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
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 0 AND `delete` = 0 ORDER BY ID DESC');
                    break;
                    case 'archive':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 0 AND `archive` = 1 AND `delete` = 0 ORDER BY ID DESC');
                    break;
                    case 'trash':
                        $query = $pdo->query('SELECT * FROM `notes` WHERE `trash` = 1 AND (`delete_timestamp` = "0000-00-00 00:00:00" OR `delete_timestamp` > NOW() - INTERVAl 1 WEEK) AND `delete` = 0 ORDER BY ID DESC');
                    break;
                }

                if($query) {
                    while($note = $query->fetch(PDO::FETCH_ASSOC))
                    {
                        $notes[] = $note;
                        $note["ID"] = (int) $note["ID"];
                        $note["trash"] = (int) $note["trash"];
                        $note["archive"] = (int) $note["archive"];
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

                if($post_vars['note']['method'] === 0) {
                    $query = $pdo->prepare('UPDATE `notes` SET `title` = :title, `content` = :content, `color` = :color WHERE `ID` = :id');
                    $query->bindValue(':id', $post_vars['note']['ID'], PDO::PARAM_INT);
                    $query->bindValue(':title', $post_vars['note']['title'], PDO::PARAM_STR);
                    $query->bindValue(':content', $post_vars['note']['content'], PDO::PARAM_STR);
                    $query->bindValue(':color', $post_vars['note']['color'], PDO::PARAM_INT);
                    $success = $query->execute();
                    
                    echo json_encode(["success" => (boolean) $success]);
                }  

                if($post_vars['note']['method'] === 1) {
                    $query = $pdo->prepare('UPDATE `notes` SET `archive` = :archive, `trash` = :trash WHERE `ID` = :id');
                    $query->bindValue(':id', $post_vars['note']['ID'], PDO::PARAM_INT);
                    $query->bindValue(':archive', $post_vars['note']['archive'], PDO::PARAM_INT);
                    $query->bindValue(':trash', $post_vars['note']['trash'], PDO::PARAM_INT);      
                    $success = $query->execute();

                    echo json_encode(["success" => (boolean) $success]); 
                }          
            }
        break;
        case "DELETE":
            if(isset($_GET['id']) && !empty($_GET['id'])) {
                $post_vars = file_get_contents("php://input");
                $post_vars = json_decode($post_vars, true);

                if($post_vars['pernament'] === false) {
                    $query = $pdo->prepare('UPDATE `notes` SET `trash` = 1, `delete_timestamp` = :delete_date WHERE `ID` = :id');
                    $query->bindValue(':id', $_GET["id"], PDO::PARAM_INT);
                    $query->bindValue(':delete_date', date("Y-m-d H:i:s"), PDO::PARAM_STR);
                    $success = $query->execute();
    
                    echo json_encode(["success" => (boolean) $success]);
                } else {
                    $query = $pdo->prepare('UPDATE `notes` SET `delete` = 1 WHERE `ID` = :id');
                    $query->bindValue(':id', $_GET["id"], PDO::PARAM_INT);
                    $success = $query->execute();
    
                    echo json_encode(["success" => (boolean) $success]);
                }
               
            }
        break;
    }
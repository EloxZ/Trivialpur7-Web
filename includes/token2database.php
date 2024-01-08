<?php
    if(!defined('AllowIncludeSiette')) {
        die('Direct access not permitted');
    }
    $variables = parse_ini_file('variables.ini');
    $MONGODB_URL = $variables['MONGODB_URL'];
    
    // Conexión con base de datos
    $client = new MongoDB\Client($MONGODB_URL);
    $users = $client->triviaDatabase->users;

    $filter = ['nick' => $_SESSION['user']['nick']];
    $update = ['$set' => ['token' => $_SESSION['token']]];

    $result = $users->updateOne($filter, $update);

    if ($result->getModifiedCount() > 0) {
        //echo "Token added to user successfully.";
    } else {
        //echo "User not found or no changes made.";
    }
?>

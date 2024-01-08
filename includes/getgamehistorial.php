<?php
    if(!defined('AllowIncludeSiette')) {
        die('Direct access not permitted');
    }
    $variables = parse_ini_file('variables.ini');
    $MONGODB_URL = $variables['MONGODB_URL'];
    
    // Conexión con base de datos
    $client = new MongoDB\Client($MONGODB_URL);
    $games = $client->triviaDatabase->games;

    $playerName = $_SESSION['user']['nick'];

    $matchingGames = [];

    $cursor = $games->find();

    $gameLimit = 10;
    $gameCount = 0;

    if ($cursor != null) {
        foreach ($cursor as $document) {
            if ($gameCount == $gameLimit) break;
            if ($document['host'] === $playerName) {
                $matchingGames[] = $document;
                $gameCount++;
                continue;
            }
            
            if ($document['players'] == null) continue;
            foreach ($document['players'] as $player) {
                if ($player['name'] === $playerName) {
                    $matchingGames[] = $document;
                    $gameCount++;
                    break;
                }
            }
        }
    }
    

    // Store the matched documents in the session
    $_SESSION['games'] = $matchingGames;
?>

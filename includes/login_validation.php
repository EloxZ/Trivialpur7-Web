<?php
    if(!defined('AllowInclude')) {
        die('Direct access not permitted');
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            $msgError = "";
            $variables = parse_ini_file('variables.ini');
            $MONGODB_URL = $variables['MONGODB_URL'];
            
            // Conexión con base de datos
            $client = new MongoDB\Client($MONGODB_URL);
            $users = $client->triviaDatabase->users;

            // Verificar nombre y contraseña
            $nick = $_POST['inputNick'];
            $realNick = strtolower($nick);
            $result = $users->findOne(['nick' => $realNick]);

            if (is_null($result) || !password_verify($_POST['inputPassword'], $result["password"])) {
                $msgError = "Datos incorrectos.";
            }

            if (strlen($msgError) == 0) {
                $_SESSION['user'] = array(
                    "nick" => $result["nick"],
                    "email" => $result["email"]
                );
                if (isset($_SESSION['redirect_url'])) {
                    // Redirect the user back to the stored URL
                    header('Location: ' . $_SESSION['redirect_url']);
                    exit;
                }
                header('Location: index.php');
                exit;
            }
        } catch (Throwable $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    } else if (isset($_GET['verify'])) {
        try {
            $variables = parse_ini_file('variables.ini');
            $MONGODB_URL = $variables['MONGODB_URL'];
            $client = new MongoDB\Client($MONGODB_URL);
            $users = $client->triviaDatabase->users;
            $unverifiedUsers = $client->triviaDatabase->unverifiedUsers;
            $verificationCode = $_GET['verify'];
            $result = $unverifiedUsers->findOne(['verify' => $verificationCode]);
            if (is_null($result)) {
                $msgError = "Código de verificación incorrecto.";
            } else {
                unset($result['verify']);
                $users->insertOne($result);
                $unverifiedUsers->deleteOne(['verify' => $verificationCode]);
                $msgSuccess = "Cuenta verificada.";
            }
        } catch (Throwable $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    } else if (isset($_GET['password'])) {
        try {
            $variables = parse_ini_file('variables.ini');
            $MONGODB_URL = $variables['MONGODB_URL'];
            $client = new MongoDB\Client($MONGODB_URL);
            $users = $client->triviaDatabase->users;
            $passwordChanges = $client->triviaDatabase->passwordChanges;
            $passwordCode = $_GET['password'];
            $result = $passwordChanges->findOne(['passwordToken' => $passwordCode]);
            if (is_null($result)) {
                $msgError = "Código de cambio de contraseña incorrecto.";
            } else {
                $passwordChanges->deleteOne(['passwordToken' => $passwordCode]);
                $users->updateOne(
                    ['email' => $result['email']],
                    ['$set' => ['password' => $result['password']]]
                );
                $msgSuccess = "Cambio de contraseña efectivo.";
            }

        } catch (Throwable $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    }   
?>
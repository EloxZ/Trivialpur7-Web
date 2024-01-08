<?php
    if(!defined('AllowInclude')) {
        die('Direct access not permitted');
    }

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function validateString($str) {
        return !preg_match('/[^A-Za-z0-9.#\\-$_]/', $str);
    }

    function sendPasswordEmail($userEmail, $passwordToken, $nick) {
        $done = false;
        $variables = parse_ini_file('variables.ini');
        $GMAIL_USERNAME = $variables['GMAIL_USERNAME'];
        $GMAIL_PASSWORD = $variables['GMAIL_PASSWORD'];

        // Create a new PHPMailer instance
        $mail = new PHPMailer(true); // Passing `true` enables exceptions for error handling.

        // SMTP Configuration for Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $GMAIL_USERNAME; // Your Gmail address
        $mail->Password = $GMAIL_PASSWORD; // Your Gmail password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption; `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to (use 465 for `ssl`)

        // Sender and Recipient
        $mail->setFrom($GMAIL_USERNAME, 'Trivial Pur7'); // Your Gmail address and name
        $mail->addAddress($userEmail, 'Usuario'); // Recipient's email and name

        $passwordUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/login.php?password=' . $passwordToken;

        // Email content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Verifica el cambio de contraseña de tu cuenta Trivial Pur7';
        $mail->Body = '<p>Se ha solicitado un cambio de contraseña para tu cuenta con nombre de usuario: '. $nick .'</p>'
            . '<p>Pincha <a href="' . $passwordUrl . '">aquí</a> para hacerlo efectivo. Caduca en una hora.</p>';
        // Optionally, you can set the AltBody to provide plain text alternative for email clients that don't support HTML:
        // $mail->AltBody = 'This is the plain text version of the email.';
        
        try {
            $mail->send();
            $done = true;
        } catch (Exception $e) {
           
        }

        return $done;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            $variables = parse_ini_file('variables.ini');
            $MONGODB_URL = $variables['MONGODB_URL'];

            // Conexión con base de datos
            $client = new MongoDB\Client($MONGODB_URL);
            $users = $client->triviaDatabase->users;
            $passwordChanges = $client->triviaDatabase->passwordChanges;

            // Validación Email
            $msgError = "";
            $email = $_POST['inputEmail'];
            
            $realEmail = strtolower($email);
            $result = $users->findOne(['email' => $realEmail]);
            if (is_null($result)) {
                $msgError = "Correo no encontrado.";
            }

            // Validación contraseña
            $password = $_POST['inputPassword'];
            $password2 = $_POST['inputPassword2'];
            if (!validateString($password)) {
                $msgError = $msgError."La contraseña sólo puede contener los caracteres a-z, A-Z, 0-9, #, -, _, $.\n";
            }
            if (strlen($password) < 6 || strlen($password) > 26) {
                $msgError = $msgError."La contraseña debe contener de 6 a 26 caracteres.\n";
            }
            if ($password !== $password2) {
                $msgError = $msgError."Las contraseñas no coinciden.\n";
            }

            // Cambio de clave
            if (strlen($msgError) == 0) {
                $passwordToken = bin2hex(random_bytes(20));
                $date = new DateTime();
                $timestamp = $date->getTimestamp() * 1000;

                $passwordChanges->createIndex(['createdAt' => 1], ['expireAfterSeconds' => 3600]);
                $passwordChanges->deleteOne(['email' => $realEmail]);
                $passwordChanges->insertOne(['email' => $realEmail, 'password' => password_hash($password, PASSWORD_DEFAULT), 'passwordToken' => $passwordToken, 'createdAt' => $timestamp]);

                if (sendPasswordEmail($realEmail, $passwordToken, $result['nick'])) {
                    $msgSuccess = "Te hemos mandado un correo para confirmar el cambio.";
                } else {

                }
                
            }
        } catch (Exception $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    }
?>
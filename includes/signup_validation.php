<?php
    if(!defined('AllowInclude')) {
        die('Direct access not permitted');
    }

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendVerifyEmail($userEmail, $verifyToken) {
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

        $verifyUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/login.php?verify=' . $verifyToken;

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Verifica tu cuenta de TrivialPur7 para poder jugar';
        $mail->Body = '<p>Bienvenido a Trivial Pur7.</p>'
            . '<p>Pincha <a href="' . $verifyUrl . '">aquí</a> para verificar tu cuenta. Caduca a las 24 horas.</p>';
        // Optionally, you can set the AltBody to provide plain text alternative for email clients that don't support HTML:
        // $mail->AltBody = 'This is the plain text version of the email.';
        try {
            $mail->send();
        } catch (Exception $e) {
            
        }
    }

    function validateString($str) {
        return !preg_match('/[^A-Za-z0-9.#\\-$_]/', $str);
    }

    function validateEmail($email) {
        $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
        return preg_match($regex, $email);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            $variables = parse_ini_file('variables.ini');
            $MONGODB_URL = $variables['MONGODB_URL'];
            
            // Conexión con base de datos
            $client = new MongoDB\Client($MONGODB_URL);
            $users = $client->triviaDatabase->users;
            $unverifiedUsers = $client->triviaDatabase->unverifiedUsers;

            // Validación Email
            $msgError = "";
            $email = $_POST['inputEmail'];
            $email2 = $_POST['inputEmail2'];
            if (!validateEmail($email)) {
                $msgError = $msgError."El formato del correo introducido no es correcto.\n";
            }
            if (strlen($email) < 3 || strlen($email) > 256) {
                $msgError = $msgError."El correo electrónico debe tener de 3 a 256 caracteres.\n";
            }
            if ($email !== $email2) {
                $msgError = $msgError."Los correos no coinciden.\n";
            }
            if (strlen($msgError) == 0) {
                $realEmail = strtolower($email);
                $result = $users->findOne(['email' => $realEmail]);
                $result2 = $unverifiedUsers->findOne(['email' => $realEmail]);
                if (!is_null($result) || !is_null($result2)) {
                    $msgError = $msgError."Ya se han registrado con ese correo electrónico.\n";
                }
            }

            // Validación Nick
            $nick = $_POST['inputNick'];
            if (!validateString($nick)) {
                $msgError = $msgError."El nombre de usuario sólo puede contener los caracteres a-z, A-Z, 0-9, #, -, _, $.\n";
            }
            if (strlen($nick) < 3 || strlen($nick) > 16) {
                $msgError = $msgError."El nombre de usuario debe contener de 3 a 16 caracteres.\n";
            }
            $realNick = strtolower($nick);
            $result = $users->findOne(['nick' => $realNick]);
            $result2 = $unverifiedUsers->findOne(['nick' => $realNick]);
            if (!is_null($result) || !is_null($result2)) {
                $msgError = $msgError."El nombre de usuario ya existe.\n";
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

            // Registro
            if (strlen($msgError) == 0) {
                $unverifiedUsers->createIndex(['createdAt' => 1], ['expireAfterSeconds' => 3600*24]);
                $date = new DateTime();
                $timestamp = $date->getTimestamp() * 1000;
                $verifyToken = bin2hex(random_bytes(20));
                $unverifiedUser = $unverifiedUsers->insertOne(['nick' => $realNick, 'email' => $realEmail,
                'password' => password_hash($password, PASSWORD_DEFAULT),
                'verify' => $verifyToken, 'createdAt' => $timestamp]);
                sendVerifyEmail($realEmail, $verifyToken);
                $msgSuccess = "Te has registrado correctamente, verifica tu correo para acceder.";z
            }
        } catch (Exception $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    }
?>
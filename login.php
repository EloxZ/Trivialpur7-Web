<?php
    require 'vendor/autoload.php';

    session_start();
    // Si usuario logueado redirijir a index
    if (isset($_SESSION['user'])) {
        header('Location: index.php');
        exit;
    }
    
    const AllowInclude = true;
    include 'includes/login_validation.php';
?>

<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <title>Trivial Pur7 | Iniciar sesión</title>
        <meta name="description" content="Página de acceso de Trivial Pur7.">
        <meta name="author" content="Eloy Barrionuevo Jiménez">

        <!-- CSS Boostrap -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    </head>

    <body class="body-bg">
        <ul id="cheeses" class="cheeses">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <!-- Menú -->
        <nav id="nav" class="navbar">
            <a class="navbar-brand" href="index.php">
                <div class="title--nav">
                    <img src="android-chrome-192x192.png" height="60px" width="60px"></img>
                    <p>Trivial Pur<span style='color: #D01A2D;' class="red-3dshadows">7</span><p/>
                </div>
            </a>
                </div>
            </a>
            <form class="form-inline mr-5">
                <a class="btn btn-lg btn-info btn-orange ml-4" href="signup.php">Registrarse</a>
            </form>
        </nav>

        <!-- Alertas -->
        <?php if (isset($msgError) && strlen($msgError) > 0) { ?>
            <div class="alert alert-danger" role="alert">
                <?php echo $msgError; ?>
            </div>
        <?php } else if (isset($msgSuccess)) { ?>
            <div class="alert alert-success" role="alert">
                <?php echo $msgSuccess; ?>
            </div>
        <?php } ?>

        <!-- Formulario de acceso -->
        <div class="form-container container glassy p-4">
            <form method="post" action="login.php">
                <div class="row mb-5 justify-content-center"><h1>Iniciar sesión</h1></div>
                <div class="row mb-3 justify-content-center">
                    <label for="inputNick" class="col-sm-2 col-form-label">Nombre de usuario</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="inputNick" name="inputNick">
                    </div>
                </div>
                <div class="row mb-3 justify-content-center">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Contraseña</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="inputPassword" name="inputPassword" autocomplete="on">
                    </div>
                </div>
                <a class="text-center d-block gray-link" href="/password.php">He olvidado mi contraseña</a>
                <div class="row justify-content-center mt-5">
                    <button type="submit" class="btn btn-lg btn-info btn-pea">Acceder</button>
                </div>

            </form>
        </div>

        <!-- Scripts Boostrap -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </body>
</html>

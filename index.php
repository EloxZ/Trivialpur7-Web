<?php
    session_start();
    include 'includes/close_session.php';
    const DEBUG = false;
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

        <title>Trivial Pur7 | Inicio</title>
        <meta name="description" content="Página de inicio de TriviSiette.">
        <meta name="author" content="Eloy Barrionuevo Jiménez">

        <!-- CSS Boostrap -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <!-- Scripts Boostrap -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
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
        <nav id="nav" class="navbar navbar-expand-md">
            <a class="navbar-brand" href="index.php">
                <div class="title--nav">
                    <img src="android-chrome-192x192.png" height="60px" width="60px"></img>
                    <p>Trivial Pur<span style='color: #D01A2D;' class="red-3dshadows">7</span><p/>
                </div>
            </a>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                </div>
            </div>
            <?php if (isset($_SESSION['user'])) { ?>
                <form method="post" action="index.php" class="inline-form mr-5" id="navbarNavAltMarkup">
                    <input name="cerrarSesion" type="hidden">
                    <a class="btn btn-lg btn-info btn-pea" href="game.php">▶ Jugar</a>
                    <button class="ml-2 btn btn-lg btn-info btn-red" type="submit">Cerrar sesión</button>
                </form>
            <?php } else { ?>
                <div class="row justify-content-center mr-5" id="navbarNavAltMarkup">
                    <a class="btn btn-lg btn-info btn-sky" href="login.php">Iniciar sesión</a>
                    <div class="mr-2"></div>
                    <a class="btn btn-lg btn-info btn-orange ml-2" href="signup.php">Registrarse</a>
                </div>
            <?php } ?>
        </nav>

        <div class="container" style="color: whitesmoke; margin-top: 100px">
            <h1 class="text-center">Bienvenido a Trivial Pur7 🎲</h1>
            <h4 class="mt-4">
                ¡Bienvenido al juego de Trivial Pursuit con preguntas de Siette! Pon a prueba tus conocimientos académicos en diferentes categorías y avanza en el tablero con cada respuesta correcta.
                Únete desde tu dispositivo móvil o PC y crea una cuenta para poder jugar. Podrás unirte a una partida introduciendo su código, o crearla asignando un test de Siette a cada color.
                Esta versión se ha modificado con respecto al juego original para acondicionar partidas de menor duración y menor preguntas, con un tablero más sencillo para poder utilizarse en pantallas
                pequeñas.
            </h4>
        </div>
        <div class="container" style="color: whitesmoke; margin-top: 100px">
            <h1 class="text-center">¿Cómo se juega? 🤔</h1>
            <h4 class="mt-4">
                1. El objetivo del juego es ser el primero en conseguir todos los quesitos. Cada quesito está asociado a una categoría (test de Siette). Para conseguir un quesito se debe caer sobre su respectiva casilla y responder
                correctamente, o bien, responder a todas las preguntas disponibles de tal color.
            </h4>
            <h4 class="mt-4">
                2. Todos los jugadores comenzaran en el centro del tablero, y se turnarán para girar su dado. El dado marcará el número de pasos que se deben dar, y se podrá elegir la dirección deseada.
                Una dirección no estará disponible si se debe rebotar con la pared para dar los pasos determinados. Tampoco se podrá girar.
                
            </h4>
            <h4 class="mt-4">
                3. Al caer sobre una casilla de un color, el jugador tendrá que responder a una pregunta de tal categoría, y podrá seguir conservando el turno mientras acierte. Si cae sobre la casilla de "ROLL AGAIN", se tirará el dado de nuevo.
                Si se posee el quesito de la casilla, se pierde el turno.
            </h4>
        </div>
    </body>
</html>

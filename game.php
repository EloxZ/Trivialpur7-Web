<?php
    include 'includes/close_session.php';
    
    session_start();
    
    if (!isset($_SESSION['user'])) {
        $_SESSION['redirect_url'] = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        header('Location: login.php');
        exit;
    }
    
    $token_value = "";
    const AllowIncludeSiette = true;
    const AllowIncludeGame = true;
    require 'vendor/autoload.php';
    include "includes/siette_auth.php";

    if (isset($_SESSION['token'])) {
        $token_value = $_SESSION['token'];
    } else {
        session_unset();
        header('Location: login.php');
        exit;
    }

    $_SESSION['games'] = null;
    include "includes/getgamehistorial.php";

    $testsArray = $_SESSION['availableTests'];
    $jsonTestsArray;

    if ($testsArray) {
        array_walk_recursive($testsArray, function(&$value, $key) {
            if (is_string($value)) {
                $value = iconv('windows-1252', 'utf-8', $value);
            }
        });
        $jsonTestsArray = json_encode($testsArray);
    }

    $variables = parse_ini_file('variables.ini');
    $TRIVIA_SERVER_URL = $variables['TRIVIA_SERVER_URL'];
?>

<!doctype html>
<html lang="es">
    <head>
        <!-- Config -->
        <title>Trivial Pur7 | Juego</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Meta -->
        <meta name="description" content="Página de inicio de TriviSiette.">
        <meta name="author" content="Eloy Barrionuevo Jiménez">

        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Styles -->
        <link rel="stylesheet" href="css/cube.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/styleGame.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.0.5/css/tabulator.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <link rel="stylesheet" href="https://azimi.me/json-formatter/dist/json-formatter.min.css" crossorigin="anonymous">

        <!-- Scripts -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://azimi.me/json-formatter-js/dist/json-formatter.umd.js"></script>
        <script src="js/qrcode.min.js"></script>
        <script src="js/fittext.js"></script>
        <script src="js/song-player.js"></script>
        <script>
            // Set php vars to js
            var token = '<?php echo $token_value; ?>';
            var playerName = '<?php echo $_SESSION['user']['nick']; ?>';
            var availableTests = <?php echo $jsonTestsArray; ?>;
            var triviaServerUrl = '<?php echo $TRIVIA_SERVER_URL; ?>';
            
            // Handle audio
            var songPlayer = new SongPlayer();
            var songMuted = true;
            var gameMuted = true;
            songPlayer.loadSong("./js/game/sounds/songs/Lobby.mp3");

            function playButton() {
                try {
                    const buttons = document.getElementsByClassName("song-button");
                    const buttonList = [...buttons];
                    buttonList.forEach(button => {
                        if (!songMuted) {
                            button.className = "song-button btn btn-lg btn-info btn-red";
                            button.innerHTML = '<img style="filter: invert(100%);" src="../js/game/assets/sin-musica.png" width="35px" height="35px"></img>';
                            songPlayer.pause();
                        } else {
                            button.className = "song-button btn btn-lg btn-info btn-orange";
                            button.innerHTML = '<img style="filter: invert(100%);" src="../js/game/assets/musica.png" width="30px" height="30px"></img>';
                            songPlayer.play();
                        }
                    });
                    songMuted = !songMuted;
                } catch (error) {
                    console.log(error);
                }
            }

            function gameSoundButton() {
                let button =  document.getElementById("soundButton");
                if (!gameMuted) {
                    button.className = "btn btn-lg btn-info btn-red";
                    button.innerHTML = '<img style="filter: invert(100%);" src="../js/game/assets/sin-sonido.png" width="25px" height="25px"></img>';
                } else {
                    button.className = "btn btn-lg btn-info btn-sky";
                    button.innerHTML = '<img style="filter: invert(100%);" src="../js/game/assets/altavoz.png" width="25px" height="25px"></img>';
                }
                gameMuted = !gameMuted;
            }
        </script>
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

        <div id="title" class="title flex">
            <img id="titleImg" src="android-chrome-192x192.png" height="90px" width="90px"></img>
            <p>Trivial Pur<span style='color: #D01A2D;' class="red-3dshadows">7</span><p/>
        </div>

        <!-- Lobby section -->
        <?php include 'includes/lobby_section.php'; ?>
        
        <!-- Room section -->
        <?php include 'includes/room_section.php'; ?>

        <!-- Board section -->
        <?php include 'includes/board_section.php'; ?>

        <!-- Tests script -->
        <script src="js/tests-selection.js"></script>

        <!-- Script change fav color -->
        <script src="js/favcolor-selection.js"></script>

        <!-- Historial script -->
        <script src="js/accordion-builder.js"></script>
        <script>
            const historialData = <?php echo json_encode($_SESSION['games']); ?>;
            populateAccordion(historialData);
        </script>

        <script>
            // Function for responsive text scaling
            const elements = document.getElementsByClassName("responsive-text");
            Array.from(elements).forEach(e => {
                fitText(e, 1.8);
            })
        </script>

        <!-- Game scripts -->
        <script src="/js/game/pixi.js"></script>
        <script src="/js/game/trivia-logic.js" type="module"></script>
    </body>
</html>

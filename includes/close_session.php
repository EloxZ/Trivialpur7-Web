<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!is_null($_POST['cerrarSesion'])) {
            session_unset();
        }
    }
?>
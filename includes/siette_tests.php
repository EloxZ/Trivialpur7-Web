<?php
    if(!defined('AllowIncludeSiette')) {
        die('Direct access not permitted');
    }

    try {
        $_SESSION['availableTests'] = $_SESSION['integrationHelper']->invokeServiceGetTestListStudent(
            $_SESSION['user']['nick'],
            $_SESSION['configurationData']->getSystemIdentifier()
        );

        //print("<pre>".print_r($_SESSION['availableTests'] ,true)."</pre>");

    } catch (Exception $e) {
        echo("Exception: " . $e->getMessage());
    }
?>


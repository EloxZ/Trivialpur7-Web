<?php
    if(!defined('AllowIncludeGame')) {
        die('Direct access not permitted');
    }
?>

<section class="container glassy" id="divRoom" style="display:none;">
    <div id="roomContainer">
        <div class="d-flex justify-content-between mb-5">
            <a id="homeButton" class="btn btn-lg btn-info btn-sky" href="/game.php">◀ Volver</a>
            <button style="width:50px; padding:0px" class="song-button btn btn-lg btn-info btn-red" onclick=playButton()><img style="filter: invert(100%);" src="../js/game/assets/sin-musica.png" width="35px" height="35px"></img></button>
        </div>
        <div class="white-bg-room">
            <div class="row mb-5 justify-content-center"><h1 id="textRoom">Esperando jugadores</h1></div>
            <div class="row mb-2 justify-content-center"><h1 id="gameId"></h1></div>
            <div class="row mb-3 justify-content-center" id="qrCode"></div>
            <div class="row mb-3 mt-5 justify-content-center">
                <h3 id="playersTag">Jugadores (Mín. 2)</h3>
            </div>
            <div class="row mb-3 justify-content-center">
                <p id="playersJoined"></p>  
            </div>
            <div class="row mb-3 justify-content-center">
                <h3 id="categoriasTag">Categorias</h3>
            </div>
            <div style="margin-top:25px; display:flex; justify-content:center;">
                <div class="blueSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="blueTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:center;">
                <div class="greenSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="greenTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:center;">
                <div class="orangeSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="orangeTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:center;">
                <div class="yellowSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="yellowTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:center;">
                <div class="purpleSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="purpleTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <div style="margin-top:20px; margin-bottom:25px; display:flex; justify-content:center;">
                <div class="pinkSquare" style="margin-right: 10px; align-self:center"></div>
                <p id="pinkTestLabel" style="min-width: 60%; margin-bottom:0px; line-height:50px"></p>
            </div>
            <button type="button" id="startSessionButton" class="button3d" style="display: none;">EMPEZAR</button>
        </div>
    </div>
</section>
<?php
    if(!defined('AllowIncludeGame')) {
        die('Direct access not permitted');
    }
?>

<section class="container glassy" id="divLobby" style="display:block;">
    <div class="d-flex justify-content-between">
        <a id="homeButton" class="btn btn-lg btn-info btn-sky" href="/index.php">◀ Volver</a>
        <div id="serverStatus" style="margin-bottom:0px; align-self:center; height:50px">
            <span class="mr-2" style="font-size:2.4rem; color: red; vertical-align: middle;">•</span>
            <span style="font-size:1.1rem; vertical-align: middle;">Desconectado</span>
        </div>
        <button style="width:50px; padding:0px" class="song-button btn btn-lg btn-info btn-red" onclick=playButton()><img style="filter: invert(100%);" src="../js/game/assets/sin-musica.png" width="35px" height="35px"></img></button>
    </div>
    
    <div class="row mt-5">
        <div class="col-12">
            <div class="pc-tab">
                <input checked="checked" id="tab1" type="radio" name="pct" />
                <input id="tab2" type="radio" name="pct" />
                <input id="tab3" type="radio" name="pct" />
                <nav>
                    <ul>
                        <li class="tab1">
                            <label for="tab1">UNIRSE</label>
                        </li>
                        <li class="tab2">
                            <label for="tab2">CREAR</label>
                        </li>
                        <li class="tab3">
                            <label for="tab3">PERFIL</label>
                        </li>
                    </ul>
                </nav>
                <section>
                    <div class="tab1">
                        <h2 id="joinRoomTitle">Únete a una sala</h2>
                        <br>
                        <label id="labelCode" for="code">Código</label>
                        <input type="text" class="form-control" id="code" autocomplete="off" name="code" maxlength="5">
                        <button type="button" id="joinRoomButton" class="button3d" style="font-family: CandyBeans; font-size: 1.5rem; margin: auto; margin-top: 20px; display: block;">UNIRSE</button>
                        <button type="button" id="leaveRoomButton" class="button3d--red" style="font-family: CandyBeans; font-size: 1.5rem; margin: auto; margin-top: 30px; display: none;">SALIR</button>
                        
                        <p style="font-size: 1.5rem; margin-top: 30px; text-align: center; visibility:hidden;">No se ha encontrado la sala.</p>
                    </div>
                    <div class="tab2">
                        <h2>Crea una sala</h2>
                        <br>
                        <label style="font-size: 1.2rem;" for="asPlayerCheckbox">Entrar como jugador &nbsp;</label>
                        <input style="height: 30px; width: 30px;" type="checkbox" id="asPlayerCheckbox" checked>
                        <br>
                        <span id="categoriasLabel" style="font-size: 1.2rem;">Categorias</span>
                        <br>
                        <div style="margin-top:30px; display:flex; justify-content:center;">
                            <div class="blueSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="blueTestSelect" style="min-width: 60%"></select>
                        </div>
                        <div style="margin-top:20px; display:flex; justify-content:center;">
                            <div class="greenSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="greenTestSelect" style="min-width: 60%"></select>
                        </div>
                        <div style="margin-top:20px; display:flex; justify-content:center;">
                            <div class="orangeSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="orangeTestSelect" style="min-width: 60%"></select>
                        </div>
                        <div style="margin-top:20px; display:flex; justify-content:center;">
                            <div class="yellowSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="yellowTestSelect" style="min-width: 60%"></select>
                        </div>
                        <div style="margin-top:20px; display:flex; justify-content:center;">
                            <div class="purpleSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="purpleTestSelect" style="min-width: 60%"></select>
                        </div>
                        <div style="margin-top:20px; display:flex; justify-content:center;">
                            <div class="pinkSquare" style="margin-right: 10px; align-self:center"></div>
                            <select id="pinkTestSelect" style="min-width: 60%"></select>
                        </div>
                        
                        <button type="button" id="createRoomButton" class="button3d" style="font-family: CandyBeans; font-size: 1.5rem; margin: auto; margin-top: 20px; display: block; margin-bottom: 20px; ">CREAR</button>
                    </div>
                    <div class="tab3">
                        <h3>Bienvenido, <?php echo $_SESSION['user']['nick'] ?>.</h2>
                        <h2 style="margin-top:30px;">Color preferido</h2>
                        <div id="colorPicker">
                            <div id="colorSelectorBlue"></div>
                            <div id="colorSelectorGreen"></div>
                            <div id="colorSelectorOrange"></div>
                            <div id="colorSelectorYellow"></div>
                            <div id="colorSelectorPurple"></div>
                            <div id="colorSelectorPink"></div>
                        </div>
                        <h2 style="margin-top:30px; margin-bottom:20px">Partidas jugadas</h2>
                        <div class="accordion" id="myAccordion"></div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</section>
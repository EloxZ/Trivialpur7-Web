<?php
    if(!defined('AllowIncludeGame')) {
        die('Direct access not permitted');
    }
?>

<section id="divQuestion" style="display:none;">
<div id="questionFrame" class="frame3d">
        <span id="questionTitle" style="font-size: 1.4rem; text-align: center; width: 100%; display: block;">Responde a la pregunta</span>
        <div id="questionPage">
            <div id="progressQuestion" style="text-align: center;"></div>
            <p id="question"></p>
            <div id="responses">
                <div>
                    <input type="radio" id="response1" name="response" value="0002"/>
                    <label id="responseLabel1" for="response1"></label>
                </div>
                <div>
                    <input type="radio" id="response2" name="response" value="0003"/>
                    <label id="responseLabel2" for="response2"></label>
                </div>
                <div>
                    <input type="radio" id="response3" name="response" value="0001"/>
                    <label id="responseLabel3" for="response3"></label>
                </div>
            </div>
            <p id="feedback"></p>
            <div>
                <button id="answerQuestionButton">Responder</button>
            </div>
        </div>
    </div>
    <div id="blackBackground"></div>
</section>
<section class="container-fluid" id="divGame" style="display:none;">
    <div class="row justify-content-center">

        <!-- Game status container --> 
        <div class="col-12 col-xl-2 status-container">
            <!-- Pink player frame --> 
            <div id="pinkDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info pink">
                    <h3 class="responsive-text" id="namePink">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="pinkPlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="pinkPlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="pinkPlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="pinkPlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="pinkPlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="pinkPlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>

            <!-- Green player frame -->
            <div id="greenDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info green">
                    <h3 class="responsive-text" id="nameGreen">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="greenPlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="greenPlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="greenPlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="greenPlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="greenPlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="greenPlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>

            <!-- Purple player frame -->
            <div id="purpleDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info purple">
                    <h3 class="responsive-text" id="namePurple">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="purplePlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="purplePlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="purplePlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="purplePlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="purplePlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="purplePlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>

            <!-- Blue player frame -->
            <div id="blueDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info blue">
                    <h3 class="responsive-text" id="nameBlue">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="bluePlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="bluePlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="bluePlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="bluePlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="bluePlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="bluePlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>

            <!-- Orange player frame -->
            <div id="orangeDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info orange">
                    <h3 class="responsive-text" id="nameOrange">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="orangePlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="orangePlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="orangePlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="orangePlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="orangePlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="orangePlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>

            <!-- Yellow player frame -->
            <div id="yellowDiv" class="frame3d ml-xl-5" style="display:none;">
                <div class="player-info yellow">
                    <h3 class="responsive-text" id="nameYellow">JUGADOR</h3>
                    <div class="player-cheeses-container">
                        <img id="yellowPlayerBlueFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="yellowPlayerOrangeFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="yellowPlayerPurpleFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="yellowPlayerYellowFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="yellowPlayerPinkFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                        <img id="yellowPlayerGreenFrameCheese" src="/js/game/assets/emptyPlayerFrameCheese.png" width="16.6%" height="16.6%">
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Trivia board -->
        <div id="triviaContainer" class="col-12 col-xl-8 mt-5" style="margin: auto">
            <div id="gameCrono"></div>
            <div id="trivia">
            </div>  
        </div>
        
        <!-- Right panel -->
        <div id="panel-container" class="col-12 col-xl-2 px-xl-0">
            <!-- Dice -->
            <section class="dice-container ml-xl-0 mb-5 mt-xl-0 mt-5" style="margin-top: 80px !important;">
                <div id="cube">
                    <div class="middle">
                    </div>
                    <div class="middle2">
                    </div>
                    <div class="middle3">
                    </div>
                    <div class="middle4">
                    </div>

                    <div id="frontFace" class="front">
                        <span class="dot dot1"></span>
                    </div>
                    <div id="backFace" class="back">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                    </div>
                    <div id="rightFace" class="right">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                    </div>
                    <div id="leftFace" class="left">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                    </div>
                    <div id="topFace" class="top">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                    </div>
                    <div id="bottomFace" class="bottom">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                        <span class="dot dot6"></span>
                    </div>
                </div>
            </section>

            <!-- Chat / Logs -->
            <div class="log-container">
                <div id="console" class="frame3d mr-xl-5">
                    <button style="width:50px; padding:0px; margin-bottom:5px; margin-right:5px;" class="song-button btn btn-lg btn-info btn-red" onclick=playButton()><img style="filter: invert(100%);" src="../js/game/assets/sin-musica.png" width="35px" height="35px"></img></button>
                    <button id="soundButton" style="width:50px; padding:0px; margin-bottom:5px; margin-right:5px; height:50px" class="btn btn-lg btn-info btn-red" onclick=gameSoundButton()><img style="filter: invert(100%);" src="../js/game/assets/sin-sonido.png" width="25px" height="25px"></img></button>
                    <div id="black-screen"> 
                        <div id="turn-log"></div>
                        <div id="progress"></div>
                        <div id="logs">
                        
                        </div>
                    </div> 
                    <div style="display: flex;">
                        <div class="chat-wrapper">
                            <span style="align-self: center; padding-right: 5px;">&nbsp;&gt;</span>
                            <input type="text" id="chatInput">
                            </input>
                        </div>
                        <button id="sendMsgButton" class="button3d">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
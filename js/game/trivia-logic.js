import * as Engine from './trivia-engine.js';
import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import AsciiBar from '../ascii-progressbar.js';

/*
            
█▀▄▀█ ▄▀█ █ █▄░█
█░▀░█ █▀█ █ █░▀█

*/

try {
    let joinServerParameters = {token: token};
    var socket = io(triviaServerUrl, {transports : ['websocket'],
        query: 'joinServerParameters=' + JSON.stringify(joinServerParameters)});
    var gameId = null;
    var bar = new AsciiBar(document.getElementById("progress"), {
        time: 15,
        max: 15
    })
    var barQuestion = new AsciiBar(document.getElementById("progressQuestion"), {
        time: 15,
        max: 15
    })
    var lastTurn;
    var chatInput = document.getElementById("chatInput");
    var inGame = false;

    enableLobbyEvents();
    enableLobbyButtons();
    tryEnterQueryRoom();

    socket.emit("checkPlayerInsideRoom");

} catch (error) {
    console.log("El servidor está apagado.");
    console.log(error.message);
}


/*

█▀▀ ▄▀█ █▀▄▀█ █▀▀   █░░ █▀█ █▀▀ █ █▀▀
█▄█ █▀█ █░▀░█ ██▄   █▄▄ █▄█ █▄█ █ █▄▄

*/

async function startGameLogic(){
    await setupBoard();
    Engine.spawnPlayers();
    Engine.enableTestTitleLabel();
    await Engine.refreshPlayersPos();
    Engine.refreshPlayersCheeses()
    enableGameEvents();
    document.getElementById("sendMsgButton").addEventListener("click", sendMsg);             
    chatInput.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') sendMsg()
    });
    inGame = true;
}

/*

█░█ ▀█▀ █ █░░ █▀
█▄█ ░█░ █ █▄▄ ▄█

*/


function tryEnterQueryRoom() {
    const url = new URL(window.location.href);
    const idRoom = url.searchParams.get('id');
    if (idRoom && !isNaN(idRoom)) {
        const data = {
            gameId: idRoom,
            favColor: favColor
        }
        socket.emit("playerJoinGame", data);
    }
}

function setStatusLabelAsConnected() {
    document.getElementById("serverStatus").innerHTML = "<span class='mr-2' style='font-size:2.4rem; color: chartreuse; vertical-align: middle;'>•</span><span style='font-size:1.1rem; vertical-align: middle;'>Conectado</span>";
}

function setStatusLabelAsDisconnected() {
    if (inGame) location.reload();
    document.getElementById("serverStatus").innerHTML = "<span class='mr-2' style='font-size:2.4rem; color: red; vertical-align: middle;'>•</span><span style='font-size:1.1rem; vertical-align: middle;'>Desconectado</span>";
}

function enableLobbyButtons() {
    const createRoomButton = document.getElementById('createRoomButton');
    const joinRoomButton = document.getElementById('joinRoomButton');

    joinRoomButton.onclick = function() {
        const code = document.getElementById('code').value;
        const data = {
            gameId: code,
            favColor: favColor
        }
        socket.emit("playerJoinGame", data);
    }

    createRoomButton.onclick = function() {
        const blueTest = document.getElementById('blueTestSelect').value;
        const greenTest = document.getElementById('greenTestSelect').value;
        const orangeTest = document.getElementById('orangeTestSelect').value;
        const yellowTest = document.getElementById('yellowTestSelect').value;
        const purpleTest = document.getElementById('purpleTestSelect').value;
        const pinkTest = document.getElementById('pinkTestSelect').value;

        const allTestsSelected = blueTest != "" &&
            greenTest != "" &&
            orangeTest != "" &&
            yellowTest != "" &&
            purpleTest != "" &&
            pinkTest != "";

        const differentTests = new Set([blueTest, greenTest, orangeTest, yellowTest, purpleTest, pinkTest]).size == 6;

        if (allTestsSelected && differentTests) {
            const asPlayer = document.getElementById("asPlayerCheckbox").checked;

            const data = {
                favColor: favColor,
                asPlayer: asPlayer,
                tests: {
                    blue: blueTest,
                    green: greenTest,
                    orange: orangeTest,
                    yellow: yellowTest,
                    purple: purpleTest,
                    pink: pinkTest
                }
            }
            socket.emit("hostCreateNewGame", data);
        } else {
            const label = document.getElementById('categoriasLabel');
            const errorAll = (!allTestsSelected)? " (Selecciona todos los tests)" : "";
            const errorRep = (allTestsSelected && !differentTests)? " (Tests repetidos)" : "";
            label.style.color = "red";
            label.innerText = "Categorias" + errorAll + errorRep;
        }
    }
}

async function showGameContent() {
    if (songPlayer) {
        songPlayer.loadSong("./js/game/sounds/songs/Board.mp3");
        if (!songMuted) songPlayer.play();
    }
    let divGame = document.getElementById("divGame");
    let divRoom = document.getElementById("divRoom");
    let title = document.getElementById("title");
    let titleImg = document.getElementById("titleImg");
    let cheeses = document.getElementById("cheeses");

    divRoom.style.opacity = "0";
    document.body.style.backgroundColor = "#494853";


    await Engine.sleep(1000);
    divRoom.style.display = "none";
    divGame.style.display = "block";
    window.dispatchEvent(new Event('resize'));
    divGame.style.opacity = "1";

    title.style.width = "400px";
    title.style.fontSize = "30px";
    title.style.left = "40px";
    title.style.top = "30px";
    titleImg.width = "50";
    titleImg.height = "50";
    

    await Engine.sleep(1000);
    cheeses.style.display = "none";
    
    divGame.style.transition = "0s";
    
    await Engine.sleep(1000);
    title.style.transition = "0.1s";
} 

async function showRoomContent() {
    let divRoom = document.getElementById("divRoom");
    let divLobby = document.getElementById("divLobby");

    divLobby.style.opacity = "0";
    document.body.style.backgroundColor = "#e9d207";

    await Engine.sleep(1000);
    divLobby.style.display = "none";
    divRoom.style.display = "block";
    await Engine.sleep(10);
    divRoom.style.opacity = "1";
    await Engine.sleep(1000);
}

async function setupBoard() {
    let divTriviaBoard = document.getElementById("trivia"); 
    let divDice = document.getElementById("cube");
    
    Engine.drawBoard(divTriviaBoard);
    Engine.setDice(divDice);
    await Engine.sleep(1000);

    divTriviaBoard.style.opacity = "1";
    await Engine.sleep(1000);
}

function enableLobbyEvents() {
    socket.on("connected", (msg) => {
        printInConsole(msg);
        setStatusLabelAsConnected();
    });
    socket.on("connect", setStatusLabelAsConnected);
    socket.on("disconnect", setStatusLabelAsDisconnected);
    socket.on("startingGame", startingGame);
    socket.on("newGameCreated", joinRoomAsHost);
    socket.on("roomFound", joinRoom);
    socket.on("error", printInConsole);
    socket.on("cancelSession", cancelSession);
    socket.on("updateRoomPlayers", updateRoomPlayers);
    socket.on("playerJoinedRoom", playerJoinedRoom);
    socket.on("playerDisconnected", playerDisconnectedMsg);
    socket.on("errorStartingGame", setErrorStartingGameMsg);
    socket.on("playerInsideRoomFound", playerInsideRoomFound);
    socket.on("leftRoomSuccess", leftRoomSuccess);
}

function leftRoomSuccess() {
    let code = document.getElementById('code');
    let leaveRoomButton = document.getElementById('leaveRoomButton');
    let joinRoomTitle = document.getElementById('joinRoomTitle');
    joinRoomTitle.innerText = "Únete a una sala"
    code.value = "";
    code.disabled = false;
    leaveRoomButton.style.display = "none";
    leaveRoomButton.onclick = null;
}

function playerInsideRoomFound(data) {
    let code = document.getElementById('code');
    let joinRoomTitle = document.getElementById('joinRoomTitle');
    let leaveRoomButton = document.getElementById('leaveRoomButton');
    joinRoomTitle.innerText = "Reconéctate o sal de la sala"
    code.value = data.gameId;
    code.disabled = true;
    leaveRoomButton.style.display = "block";
    leaveRoomButton.onclick = () => {
        socket.emit('tryLeaveRoom');
    }
}

function setErrorStartingGameMsg(data) {
    let textRoom = document.getElementById('textRoom');
    textRoom.innerHTML = data.message;
}


function playerDisconnectedMsg(data) {
    let msg = data.name + " se ha desconectado.";

    console.log(JSON.stringify(data));
    printInConsole(msg);
    printInLogs(msg);
}

function printInConsole(data) {
    console.log(data);
}

function printInLogs(data) {
    let logs = document.getElementById('logs');
    logs.innerHTML += data + '<br>';
    logs.scrollTop = logs.scrollHeight;
    if (!gameMuted) {
        Engine.chatBeepAudio.play();
    }
}

function playerJoinedRoom(data) {
    let msg = data.name + " se ha unido.";

    printInConsole(msg);
    printInLogs(msg);
}

function updateRoomPlayers(players) {
    const playersJoined = document.getElementById('playersJoined');
    const playersTag = document.getElementById('playersTag');
    const playerList = Object.entries(players);
    let string = "";

    for (const [key, value] of playerList) {
        let style = "<span style='color:" + colorToHtmlColor(value.color) + ";-webkit-text-stroke: 1px black;'>"
        string += style + value.name + "</span><br>";
    };

    if (playerList.length < 2) {
        playersTag.innerText = "Un jugador (Mín. 2)"
    } else {
        playersTag.innerText = playerList.length + " jugadores (Máx. 6)"
    }

    playersJoined.innerHTML = string;

    //Engine.setPlayers(players);
}

function colorToHtmlColor(color) {
    let htmlColor = null;
    switch (color) {
        case "blue":
            htmlColor = "#00B9F2";
            break;
        case "green":
            htmlColor = "#00B593";
            break;
        case "orange":
            htmlColor = "#F68A4E";
            break;
        case "yellow":
            htmlColor = "#e9d207";
            break;
        case "purple":
            htmlColor = "#735AA6";
            break;
        case "pink":
            htmlColor = "#ED2188";
            break;  
        default:
            htmlColor = 'black';
    }
    return htmlColor;
}

async function cancelSession(data) {
    printInLogs(data.message);
    await Engine.sleep(5000);
    window.location.reload();
}

async function joinRoom(data) {
    const gameIdText = document.getElementById('gameId');
    const qrCode = new QRCode("qrCode", {
        colorDark : "#495057",
        colorLight : "#ebe8c7"
    });

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set('id', data.gameId);
    url.search = searchParams.toString();
    qrCode.makeCode(url.toString());

    gameIdText.innerHTML = data.gameId;
    gameId = data.gameId;
    const subjectArray = availableTests.filter(subject => subject.id == 109789);

    for (const test of subjectArray[0].tests) {
        switch(test.id.toString()) {
            case data.tests.blue:
                document.getElementById("blueTestLabel").innerText = decodeHtml(test.name);
                Engine.setBlueTestName(decodeHtml(test.name));
                break;
            case data.tests.green:
                document.getElementById("greenTestLabel").innerText = decodeHtml(test.name);
                Engine.setGreenTestName(decodeHtml(test.name));
                break;
            case data.tests.orange:
                document.getElementById("orangeTestLabel").innerText = decodeHtml(test.name);
                Engine.setOrangeTestName(decodeHtml(test.name));
                break;
            case data.tests.yellow:
                document.getElementById("yellowTestLabel").innerText = decodeHtml(test.name);
                Engine.setYellowTestName(decodeHtml(test.name));
                break;
            case data.tests.purple:
                document.getElementById("purpleTestLabel").innerText = decodeHtml(test.name);
                Engine.setPurpleTestName(decodeHtml(test.name));
                break;
            case data.tests.pink:
                document.getElementById("pinkTestLabel").innerText = decodeHtml(test.name);
                Engine.setPinkTestName(decodeHtml(test.name));
                break;
            default:

        }
    }
    

    await showRoomContent();
}

async function joinRoomAsHost(data) {
    let startSessionButton = document.getElementById('startSessionButton');
    startSessionButton.style.display = "block";

    startSessionButton.onclick = function() {
        textRoom.innerHTML = "Servidor procesando solicitud...";
        socket.emit('hostStartGame', data);
    }

    await joinRoom(data);
}

async function startingGame(data) {
    let timer = 5;
    let textRoom = document.getElementById('textRoom');
    while (timer > -1) {
        textRoom.innerHTML = "Prepárate, empezando en " + timer;
        await Engine.sleep(1000);
        timer--;
    }
    Engine.setGameCronoSeconds(data.gameDurationInSeconds);
    Engine.startGameCrono();
    Engine.setPlayers(data.players);
    showPlayersFrames(data.players);
    await showGameContent();
    await startGameLogic();
}

function showPlayersFrames(players) {
    try {
        Object.values(players).forEach(player => {
            switch(player.color) {
                case "green":
                    document.getElementById('greenDiv').style.display = "block";
                    document.getElementById('nameGreen').innerHTML = player.name.toUpperCase();
                    break;
                case "purple":
                    document.getElementById('purpleDiv').style.display = "block";
                    document.getElementById('namePurple').innerHTML = player.name.toUpperCase();
                    break;
                case "blue":
                    document.getElementById('blueDiv').style.display = "block";
                    document.getElementById('nameBlue').innerHTML = player.name.toUpperCase();
                    break;
                case "orange":
                    document.getElementById('orangeDiv').style.display = "block";
                    document.getElementById('nameOrange').innerHTML = player.name.toUpperCase();
                    break;
                case "yellow":
                    document.getElementById('yellowDiv').style.display = "block";
                    document.getElementById('nameYellow').innerHTML = player.name.toUpperCase();
                    break;
                case "pink":
                    document.getElementById('pinkDiv').style.display = "block";
                    document.getElementById('namePink').innerHTML = player.name.toUpperCase();
                    break;
            }
            if (!player.connected && player.socketId != socket.id) addFrameDisconnectedColor(player.color);
        })
    } catch (error) {
        console.log(error);
    }

}

function enableGameEvents() {
    socket.on("giveTurn", giveTurn);
    socket.on("rollDice", forceRollDice);
    socket.on("selectSquare", selectSquare);
    socket.on("movePlayer", movePlayer);
    socket.on("msgReceived", msgReceived);
    socket.on("userSelecting", userSelecting);
    socket.on("playerDisconnected", playerDisconnectedFrame);
    socket.on("playerReconnected", playerReconnected)
    socket.on("askQuestion", askQuestion);
    socket.on("questionFeedback", questionFeedback);
    socket.on("playerAnsweredQuestion", playerAnsweredQuestion);
    socket.on("playerWonCheese", playerWonCheese);
    socket.on("userAnsweringQuestion", userAnsweringQuestion);
    socket.on("gameOver", gameOver);
}

async function gameOver(data) {
    Engine.stopGameCrono();
    printInLogs(Engine.players[data.playerId].name + " ha ganado el juego. Terminando la partida...");
    await Engine.sleep(5000);
    window.location.reload();
}

function playerWonCheese(data) {
    printInLogs(Engine.players[data.playerId].name + " ha conseguido el quesito " + translateColor(data.color) + ".");
    Engine.players[data.playerId].cheeses[data.color] = true;
    Engine.giveCheese(Engine.players[data.playerId].color, data.color);
}

function playerAnsweredQuestion(data) {
    if (!gameMuted) {
        const audio = data.correct? Engine.correctAnswerAudio : Engine.wrongAnswerAudio;
        audio.play();
    }
}

function askQuestion(data) {
    if (!gameMuted) Engine.questionClockAudio.play();
    if (songPlayer) songPlayer.changeVolume(0.2);

    openQuestion(data.question);
}

function openQuestion(question) {
    const divQuestion = document.getElementById("divQuestion");
    const questionTitle = document.getElementById("questionTitle");
    const questionText = document.getElementById("question");
    const responses = document.getElementById("responses");
    const button = document.getElementById("answerQuestionButton");

    questionTitle.innerHTML = question.title;
    questionText.innerHTML = question.question;
    responses.innerHTML = "";

    let i = 0;

    for (const res of question.responses) {
        const divElement = document.createElement('div');
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');

        inputElement.type = 'radio';
        inputElement.id = 'response' + i;
        inputElement.name = 'response';
        inputElement.value = res.id.toString();
        
        labelElement.id = 'responseLabel' + i;
        labelElement.htmlFor = 'response' + i;
        labelElement.innerHTML = res.text;

        divElement.appendChild(inputElement);
        divElement.appendChild(labelElement);
        responses.appendChild(divElement);
        i++;
    }

    button.innerText = "Responder";

    button.onclick = () => {
        const selectedRadioButton = document.querySelector('input[name="response"]:checked');
        const selectedValue = selectedRadioButton ? selectedRadioButton.value : null;
        if (selectedValue) {
            const radioButtons = document.querySelectorAll('input[name="response"]');
            radioButtons.forEach(radioButton => {
                radioButton.disabled = true;
            });
            socket.emit("answerQuestion", {answer: selectedValue, gameId: gameId, playerId: socket.id});
            button.innerText = "Respondiendo...";
            button.onclick = null;
        }
    }

    divQuestion.style.display = "block";
}

function questionFeedback(data) {
    Engine.questionClockAudio.pause();
    barQuestion.pause();
    Engine.questionClockAudio.currentTime = 0;
    if (songPlayer) songPlayer.changeVolume(0.5);

    const questionText = document.getElementById("question");
    const responses = document.getElementById("responses");
    const button = document.getElementById("answerQuestionButton");
    responses.innerHTML = "<p>" + data.feedback; + "</p>";
    const mark = data.isCorrect? "✅ " : "❌ ";
    questionText.innerHTML = mark + data.rightAnswerText;

    button.innerText = "Cerrar";
    button.onclick = () => {closeQuestion();};
}

function closeQuestion() {
    const divQuestion = document.getElementById("divQuestion");
    const button = document.getElementById("answerQuestionButton");
    button.onclick = null;
    divQuestion.style.display = "none";
}


function playerReconnected(data) {
    if (data.color !== "white") removeFrameDisconnectedColor(data.color);
    let msg = data.name + " se ha reconectado.";

    printInConsole(msg);
    printInLogs(msg);
}

function playerDisconnectedFrame(data) {
    addFrameDisconnectedColor(data.color);
}

function userAnsweringQuestion(data) {
    document.getElementById("turn-log").innerHTML = Engine.players[data.playerId].name.replaceAll('<','&lt;').replaceAll('>', '&gt;') + " respondiendo.";
    barQuestion.reset();
    bar.reset();
    barQuestion.changeTime(data.timeout);
    bar.changeTime(data.timeout);
    barQuestion.play();
    bar.play();
}

function userSelecting(data) {
    document.getElementById("turn-log").innerHTML = Engine.players[data.playerId].name.replaceAll('<','&lt;').replaceAll('>', '&gt;') + " moviendo.";
    bar.reset();
    bar.changeTime(data.timeout);
    bar.play();
}

function msgReceived(data) {
    printInLogs('<span style="color: light' + data.color + ';">' + '[' + data.name + ']: ' + data.message + '<span/>');
}

let sendConfirmation = function() {
    socket.emit("finishTurnRollDice", {gameId: gameId});
    Engine.dice.removeEventListener("click", sendConfirmation);
}

let sendSelected = function() {
    socket.emit("finishSelection", {square: Engine.selected, gameId: gameId, playerId: socket.id});
}

function giveTurn(data) {
    bar.reset();
    bar.changeTime(data.timeout);
    bar.play();
    removeFramesTurnColor();
    addFrameTurnColor(Engine.players[data.player].color);
    try {
        document.getElementById("turn-log").innerHTML = "Turno de " + Engine.players[data.player].name.replaceAll('<','&lt;').replaceAll('>', '&gt;') + ".";
        if (socket.id == data.player) {
            // My turn
            if (lastTurn != data.player && !gameMuted) {
                Engine.turnAlertAudio.play();
            }
            document.getElementById('console').classList.add('turn');
            Engine.setDiceNumber(data.number);
            Engine.enableDice();
            Engine.dice.addEventListener("click", sendConfirmation);
        }

        lastTurn = data.player;
    } catch (error) {
        console.log(error);
    }
}

async function forceRollDice(number) {
    try {
        
        if (lastTurn == socket.id && !Engine.isDiceAvailable) {
 
        } else {
            Engine.dice.removeEventListener("click", sendConfirmation);
            Engine.disableDice();
            
            Engine.setDiceNumber(number);
    
            await Engine.moveDiceUp();
            await Engine.sleep(50);
            Engine.rollDice();
        }
        
        closeQuestion();

    } catch (error) {
        console.log(error);
    }
}

function selectSquare(data) {
    for (let square of data.squares) {
        Engine.selectSquare(square, sendSelected);
    }
}

async function movePlayer(data) {
    if (data.playerId == socket.id) Engine.clearSelections();
    await Engine.travelPlayerSquare(Engine.players[data.playerId], data.square);
}

function sendMsg() {
    try {
        let msg = chatInput.value;
        chatInput.value = '';
        console.log(msg);
        if (msg != '') socket.emit("sendMsg", {playerId: socket.id, msg: msg, gameId: gameId});
        
    } catch (error) {
        console.log(error);
    }
}

function addFrameTurnColor(playerColor) {
    switch(playerColor) {
        case "green":
            document.getElementById('greenDiv').classList.add('turn');
            break;
        case "purple":
            document.getElementById('purpleDiv').classList.add('turn');
            break;
        case "blue":
            document.getElementById('blueDiv').classList.add('turn');
            break;
        case "orange":
            document.getElementById('orangeDiv').classList.add('turn');
            break;
        case "yellow":
            document.getElementById('yellowDiv').classList.add('turn');
            break;
        case "pink":
            document.getElementById('pinkDiv').classList.add('turn');
    }
}

function addFrameDisconnectedColor(playerColor) {
    switch(playerColor) {
        case "green":
            document.getElementById('greenDiv').classList.add('disconnected');
            break;
        case "purple":
            document.getElementById('purpleDiv').classList.add('disconnected');
            break;
        case "blue":
            document.getElementById('blueDiv').classList.add('disconnected');
            break;
        case "orange":
            document.getElementById('orangeDiv').classList.add('disconnected');
            break;
        case "yellow":
            document.getElementById('yellowDiv').classList.add('disconnected');
            break;
        case "pink":
            document.getElementById('pinkDiv').classList.add('disconnected');
    }
}

function removeFrameDisconnectedColor(playerColor) {
    switch(playerColor) {
        case "green":
            document.getElementById('greenDiv').classList.remove('disconnected');
            break;
        case "purple":
            document.getElementById('purpleDiv').classList.remove('disconnected');
            break;
        case "blue":
            document.getElementById('blueDiv').classList.remove('disconnected');
            break;
        case "orange":
            document.getElementById('orangeDiv').classList.remove('turn');
            break;
        case "yellow":
            document.getElementById('yellowDiv').classList.remove('disconnected');
            break;
        case "pink":
            document.getElementById('pinkDiv').classList.remove('disconnected');
    }
}

function removeFramesTurnColor() {
    document.getElementById('greenDiv').classList.remove('turn');
    document.getElementById('purpleDiv').classList.remove('turn');
    document.getElementById('blueDiv').classList.remove('turn');
    document.getElementById('orangeDiv').classList.remove('turn');
    document.getElementById('yellowDiv').classList.remove('turn');
    document.getElementById('pinkDiv').classList.remove('turn');
    document.getElementById('console').classList.remove('turn');
}

function translateColor(color) {
    let colorTranslation = "";
    switch(color) {
        case "green":
            colorTranslation = "verde";
            break;
        case "purple":
            colorTranslation = "púrpura";
            break;
        case "blue":
            colorTranslation = "azul";
            break;
        case "orange":
            colorTranslation = "naranja";
            break;
        case "yellow":
            colorTranslation = "amarillo";
            break;
        case "pink":
            colorTranslation = "rosa";
    }

    return colorTranslation;
}


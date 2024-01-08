/*

█░█ ▄▀█ █▀█ █ ▄▀█ █▄▄ █░░ █▀▀ █▀
▀▄▀ █▀█ █▀▄ █ █▀█ █▄█ █▄▄ ██▄ ▄█

*/

export var app, boardSprite, blueToken, yellowToken, pinkToken, purpleToken, orangeToken, greenToken;
export var players;
export var dice;
export var diceNumber = 1;
export var isDiceAvailable = false;
export var turn = null;
export var turnAlertAudio = new Audio("./js/game/sounds/turnAlert.wav");
export var chatBeepAudio = new Audio("./js/game/sounds/chatBeep.wav");
var hitTokenAudio = new Audio("./js/game/sounds/hitToken.mp3")
var diceSoundAudio = new Audio("./js/game/sounds/diceSound.mp3")
export var correctAnswerAudio = new Audio("./js/game/sounds/correctAnswer.wav")
export var wrongAnswerAudio = new Audio("./js/game/sounds/wrongAnswer.wav")
export var questionClockAudio = new Audio("./js/game/sounds/questionClock.wav")
let cronoSeconds;
let cronoInterval;
export var pinkTestName;
export var purpleTestName;
export var greenTestName;
export var yellowTestName;
export var orangeTestName;
export var blueTestName;
let testNameText;
let testNameBackground;


turnAlertAudio.volume = 0.5;
chatBeepAudio.volume = 0.5;
hitTokenAudio.volume = 0.5;
diceSoundAudio.volume = 0.5;
correctAnswerAudio.volume = 0.5;
wrongAnswerAudio.volume = 0.5;
questionClockAudio.volume = 0.35;

var selections = [];
export var selected = null;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

const UNIT = 51.3;

const DIAG1 = [20, 24, 25, 26, 100, 27, 28, 29, 8];
const DIAG2 = [16, 30, 31, 32, 100, 33, 34, 35, 4];
const VER = [12, 36, 37, 38, 100, 39, 40, 41, 0];

export const SQUARES = {
    // Ring squares 0-23
    0: {position: {x: 24.8, y: 3.2}, isCheese: true, nextRing: 1, prevRing: 23, prevVer: 41, color: "purple"}, // purpleCheese

    1: {position: {x: 30.4, y: 4.2}, nextRing: 2, prevRing: 0}, // rollAgain
    2: {position: {x: 35.7, y: 6.2}, nextRing: 3, prevRing: 1, color: "green"}, // green
    3: {position: {x: 40.2, y: 9.6}, nextRing: 4, prevRing: 2, color: "blue"}, // blue

    4: {position: {x: 43.6, y: 14.1}, isCheese: true, nextRing: 5, prevRing: 3, prevDiag2: 35, color: "orange"}, // orangeCheese

    5: {position: {x: 45.6, y: 19.3}, nextRing: 6, prevRing: 4}, // rollAgain2
    6: {position: {x: 46.4, y: 24.9}, nextRing: 7, prevRing: 5, color: "yellow"}, // yellow
    7: {position: {x: 45.7, y: 30.5}, nextRing: 8, prevRing: 6, color: "green"}, // green2

    8: {position: {x: 43.5, y: 35.8}, isCheese: true, nextRing: 9, prevRing: 7, prevDiag1: 29, color: "blue"}, // blueCheese

    9: {position: {x: 39.9, y: 40.1}, nextRing: 10, prevRing: 8}, // rollAgain3
    10: {position: {x: 35.6, y: 43.6}, nextRing: 11, prevRing: 9, color: "orange"}, // orange
    11: {position: {x: 30.4, y: 45.8}, nextRing: 12, prevRing: 10, color: "blue"}, // blue2

    12: {position: {x: 24.8, y: 46.6}, isCheese: true, nextRing: 13, prevRing: 11, nextVer: 36, color: "green"}, // greenCheese

    13: {position: {x: 19, y: 45.6}, nextRing: 14, prevRing: 12}, // rollAgain4
    14: {position: {x: 13.9, y: 43.7}, nextRing: 15, prevRing: 13, color: "yellow"}, // yellow2
    15: {position: {x: 9.37, y: 40.3}, nextRing: 16, prevRing: 14, color: "purple"}, // purple

    16: {position: {x: 6, y: 35.7}, isCheese: true, nextRing: 17, prevRing: 15, nextDiag2: 30, color: "pink"}, // pinkCheese

    17: {position: {x: 3.9, y: 30.3}, nextRing: 18, prevRing: 16}, // rollAgain5
    18: {position: {x: 3.2, y: 24.9}, nextRing: 19, prevRing: 17, color: "pink"}, // pink
    19: {position: {x: 3.8, y: 19.3}, nextRing: 20, prevRing: 18, color: "purple"}, // purple2

    20: {position: {x: 6, y: 14}, isCheese: true, nextRing: 21, prevRing: 19, nextDiag1: 24, color: "yellow"}, // yellowCheese

    21: {position: {x: 9.7, y: 9.4}, nextRing: 22, prevRing: 20}, // rollAgain6
    22: {position: {x: 14, y: 6.1}, nextRing: 23, prevRing: 21, color: "pink"}, // pink2
    23: {position: {x: 19.2, y: 3.9}, nextRing: 0, prevRing: 22, color: "orange"}, // orange2

    // Diagonal 1
    24: {position: {x: 10.3, y: 16.4}, nextDiag1: 25, prevDiag1: 20, color: "pink"}, // pink3
    25: {position: {x: 14.3, y: 18.9}, nextDiag1: 26, prevDiag1: 24, color: "purple"}, // purple3
    26: {position: {x: 18.4, y: 21.3}, nextDiag1: 100, prevDiag1: 25, color: "green"}, // green3

    27: {position: {x: 31.2, y: 28.7}, nextDiag1: 28, prevDiag1: 100, color: "purple"}, // purple4
    28: {position: {x: 35.2, y: 31}, nextDiag1: 29, prevDiag1: 27, color: "yellow"}, // yellow3
    29: {position: {x: 39.5, y: 33.4}, nextDiag1: 8, prevDiag1: 28, color: "orange"}, // orange3

    // Diagonal 2
    30: {position: {x: 10.3, y: 33.3}, nextDiag2: 31, prevDiag2: 16, color: "green"}, // green4
    31: {position: {x: 14.3, y: 31}, nextDiag2: 32, prevDiag2: 30, color: "purple"}, // purple4
    32: {position: {x: 18.4, y: 28.7}, nextDiag2: 100, prevDiag2: 31, color: "orange"}, // orange4

    33: {position: {x: 31.2, y: 21.3}, nextDiag2: 34, prevDiag2: 100, color: "pink"}, // pink4
    34: {position: {x: 35.2, y: 18.9}, nextDiag2: 35, prevDiag2: 33, color: "green"}, // green5
    35: {position: {x: 39.5, y: 16.4}, nextDiag2: 4, prevDiag2: 34, color: "blue"}, // blue3

    // Vertical
    36: {position: {x: 24.8, y: 41.7}, nextVer: 37, prevVer: 12, color: "blue"}, // blue4
    37: {position: {x: 24.8, y: 37}, nextVer: 38, prevVer: 36, color: "pink"}, // pink5
    38: {position: {x: 24.8, y: 32.3}, nextVer: 100, prevVer: 37, color: "yellow"}, // yellow4

    39: {position: {x: 24.8, y: 17.6}, nextVer: 40, prevVer: 100, color: "orange"}, // orange5
    40: {position: {x: 24.8, y: 12.8}, nextVer: 41, prevVer: 39, color: "yellow"}, // yellow5
    41: {position: {x: 24.8, y: 8}, nextVer: 0, prevVer: 40, color: "blue"}, // blue5

    // Hub
    100: {position: {x: 24.8, y: 24.8}, nextVer: 39, prevVer: 38, nextDiag1: 27, prevDiag1: 26, nextDiag2: 33, prevDiag2: 32, color: "multi"}
}

export function setPlayers(newPlayers) {
    players = newPlayers;
}

export function setPinkTestName(name) {
    pinkTestName = name;
}

export function setPurpleTestName(name) {
    purpleTestName = name;
}

export function setGreenTestName(name) {
    greenTestName = name;
}

export function setYellowTestName(name) {
    yellowTestName = name;
}

export function setOrangeTestName(name) {
    orangeTestName = name;
}

export function setBlueTestName(name) {
    blueTestName = name;
}




/*

█▀▄ █▀█ ▄▀█ █░█░█
█▄▀ █▀▄ █▀█ ▀▄▀▄▀

*/

export function drawBoard(element) {
    app = new PIXI.Application({ resizeTo: element, backgroundColor: 0x494853,
        resolution: window.devicePixelRatio,
        autoDensity: true, autoResize: true,
        antialias: true });
    boardSprite = PIXI.Sprite.from('js/game/assets/TrivialBoard.png');
    boardSprite.texture.baseTexture.mipmap = true;    
    
    boardSprite.height = app.screen.height;
    boardSprite.width = app.screen.width;

    window.addEventListener('resize', async () => {
        // Sleep to let dimensions update
        await sleep(150);
        boardSprite.height = app.screen.height;
        boardSprite.width = app.screen.width;
    });

    element.appendChild(app.view);
    app.stage.addChild(boardSprite);
}

export function enableTestTitleLabel() {
    testNameBackground = new PIXI.Graphics();
    testNameText = new PIXI.Text("", {
        fontSize: 74,
        lineHeight: 78,
        letterSpacing: 0,
        fill: 0x000000,
        align: "center"
    })

    testNameText.anchor.set(0);
    testNameText.visible = false;
    testNameText.resolution = 2;
    testNameText.defaultAutoResolution = false;

    boardSprite.addChild(testNameBackground);
    boardSprite.addChild(testNameText);
}



function showTestTitle(title, x, y) {
    document.body.style.cursor = "pointer";
    testNameText.text = title;
    testNameText.x = x;
    testNameText.y = y;

    testNameBackground.beginFill(0xffffff); // White color
    testNameBackground.lineStyle(2, 0x000000, 1);
    testNameBackground.drawRoundedRect(
        x - 10,
        y - 10,
        testNameText.width + 20,
        testNameText.height + 20,
        20
    );

    testNameText.visible = true;
}
  
function hideTestTitle() {
    document.body.style.cursor = "auto";
    testNameText.visible = false;
    testNameBackground.clear();
}

function spawnToken(color) {
    try {    
        let token;

        switch (color) {
            case "blue":
                token = PIXI.Sprite.from('js/game/assets/blueToken.png');
                blueToken = token;
                break;
            case "yellow":
                token = PIXI.Sprite.from('js/game/assets/yellowToken.png');
                yellowToken = token;
                break;
            case "orange":
                token = PIXI.Sprite.from('js/game/assets/orangeToken.png');
                orangeToken = token;
                break;
            case "purple":
                token = PIXI.Sprite.from('js/game/assets/purpleToken.png');
                purpleToken = token;
                break;
            case "pink":
                token = PIXI.Sprite.from('js/game/assets/pinkToken.png');
                pinkToken = token;
                break;
            case "green":
                token = PIXI.Sprite.from('js/game/assets/greenToken.png');
                greenToken = token;

        }

        token.anchor.set(0.5);
        token.scale.set(0.25);
        token.texture.baseTexture.mipmap = true;

        boardSprite.addChild(token);
    } catch (error) {
        console.log(error);
    }
}

export function selectSquare(square, callback) {
    try {
        let squarePos = SQUARES[square].position;
        let testTitle = colorToTextTitle(SQUARES[square].color);
        let hitboxCircle = new PIXI.Graphics();
        let circle = new PIXI.Graphics();
        let size = 180;
        if (square == 100) size = 240;

        hitboxCircle.beginFill(0xffffff, 0.001);
        hitboxCircle.drawCircle(squarePos.x*UNIT, squarePos.y*UNIT, size);
        hitboxCircle.endFill();

        circle.beginFill(0x000000, 0.2);
        circle.drawCircle(squarePos.x*UNIT, squarePos.y*UNIT, 60);
        circle.endFill();

        hitboxCircle.addChild(circle);
        hitboxCircle.buttonMode = true;
        hitboxCircle.interactive = true;

        selections.push(hitboxCircle);
        boardSprite.addChild(hitboxCircle);

        hitboxCircle.on('pointertap', () => {
            selected = square;
            callback();
            clearSelections();
        });

        hitboxCircle.on('pointerenter', () => {
            console.log("probando");
            showTestTitle(testTitle, squarePos.x*UNIT, (squarePos.y-5)*UNIT);
        });

        hitboxCircle.on('pointerleave', () => {
            hideTestTitle();
        });
    } catch (error) {

    }
}

function colorToTextTitle(color) {
    let text;   
    switch (color) {
        case "blue":
            text = blueTestName;
            break;
        case "yellow":
            text = yellowTestName;
            break;
        case "orange":
            text = orangeTestName;
            break;
        case "purple":
            text = purpleTestName;
            break;
        case "pink":
            text = pinkTestName;
            break;
        case "green":
            text = greenTestName;
            break;
        case "multi":
            text = "Aleatorio";
            break;
        default:
            text = "Tira de nuevo"
    }

    return text;
}

export function clearSelections() {
    for (let sel of selections) {
        boardSprite.removeChild(sel);
    }
    hideTestTitle();
    selections = [];
    selected = null;
}

export function spawnPlayers() {
    try {
        Object.values(players).forEach(p => {
            spawnToken(p.color);
        })
    } catch (error) {
        console.log(error);
    }
}

export function setPlayersVisible(visible) {
    try {
        Object.values(players).forEach(p => {
            let token = colorToToken(p.color);
            token.visible = visible;
            console.log(token);
        })
    } catch (error) {
        console.log(error);
    }
}

export function getCheese(color) {
    let cheese;   
    switch (color) {
        case "blue":
            cheese = PIXI.Sprite.from('js/game/assets/fillBlueCheese.png');
            break;
        case "yellow":
            cheese = PIXI.Sprite.from('js/game/assets/fillYellowCheese.png');
            break;
        case "orange":
            cheese = PIXI.Sprite.from('js/game/assets/fillOrangeCheese.png');
            break;
        case "purple":
            cheese = PIXI.Sprite.from('js/game/assets/fillPurpleCheese.png');
            break;
        case "pink":
            cheese = PIXI.Sprite.from('js/game/assets/fillPinkCheese.png');
            break;
        case "green":
            cheese = PIXI.Sprite.from('js/game/assets/fillGreenCheese.png');
    }

    cheese.anchor.set(0.5);
    cheese.texture.baseTexture.mipmap = true;

    return cheese;
}

export function moveToken(color, square) {
    try {
        let playersInSquare = getPlayersInSquare(square);
        if (playersInSquare.length > 1) {
            let offsets = calculateOffsets(playersInSquare.length);

            Object.values(playersInSquare).forEach((p, index) => {
                let token = colorToToken(p.color);
                let targetPosition = {x: SQUARES[square].position.x*UNIT + offsets[index].x*UNIT, y: SQUARES[square].position.y*UNIT + offsets[index].y*UNIT};
                let initialPosition = token.position.clone();
                animateTowards(token, initialPosition, targetPosition, 1000);
            })

        } else {
            let token = colorToToken(color);
            let targetPosition = {x: SQUARES[square].position.x*UNIT , y: SQUARES[square].position.y*UNIT};
            let initialPosition = token.position.clone();
            animateTowards(token, initialPosition, targetPosition, 1000);
        }
    } catch (error) {
        console.log(error);
    }
}

async function safeMove(color, nextSquare) {
    colorToPlayer(color).square = nextSquare;
    moveToken(color, nextSquare)
    await sleep(1020);
}

export async function travelToken(color, initialSquare, targetSquare) {
    let route = availableRouteDirection(initialSquare, targetSquare);
    let nextSquare = initialSquare;

    switch (route) {
        case "clockwise":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].nextRing;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "counter-clockwise":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].prevRing;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "vertical":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].nextVer;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "reverse-vertical":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].prevVer;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "diagonal1":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].nextDiag1;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "reverse-diagonal1":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].prevDiag1;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "diagonal2":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].nextDiag2;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
            break;
        case "reverse-diagonal2":
            while (nextSquare != targetSquare) {
                nextSquare = SQUARES[nextSquare].prevDiag2;
                await safeMove(color, nextSquare);
                playTokenHit();
            }
    }
}

export function giveCheese(playerColor, cheeseColor) {
    try {
        let cheese = getCheese(cheeseColor);
        let token = colorToToken(playerColor);
        const cheeseColorString = cheeseColor.charAt(0).toUpperCase() + cheeseColor.slice(1);

        const frameCheese = document.getElementById(playerColor + "Player" + cheeseColorString + "FrameCheese");
        frameCheese.src = "/js/game/assets/" + cheeseColor + "PlayerFrameCheese.png";

        token.addChild(cheese);
    } catch (error) {
        console.log(error)
    }
}

export async function movePlayersHub() {
    try {
        for (const p of Object.values(players)) {
            movePlayerSquare(p, 100);
        }
        await sleep(1020);
    } catch (error) {
        console.log(error);
    }
}

export async function refreshPlayersPos() {
    try {
        for (const p of Object.values(players)) {
            movePlayerSquare(p, p.square);
        }
        await sleep(1020);
    } catch (error) {
        console.log(error);
    }
}

export function refreshPlayersCheeses() {
    try {
        for (const player of Object.values(players)) {
            for (const [cheeseColor, hasCheese] of Object.entries(player.cheeses)) {
                if (hasCheese) {
                    giveCheese(player.color, cheeseColor);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export async function movePlayerSquare(player, square) {
    player.square = square;
    moveToken(player.color, square);
    await sleep(1020);
}

export async function travelPlayerSquare(player, targetSquare) {
    try {
        let initSquare = player.square;
        player.square = targetSquare;

        let playersInSquare = getPlayersInSquare(initSquare);
        playersInSquare.forEach(p => { 
            moveToken(p.color, initSquare);
        })

        await travelToken(player.color, initSquare, targetSquare);
    } catch (error) {
        console.log(error);
    }
}


/*

█░█ ▀█▀ █ █░░ █▀
█▄█ ░█░ █ █▄▄ ▄█

*/



export function setGameCronoSeconds(seconds) {
    const gameCrono = document.getElementById("gameCrono");
    cronoSeconds = seconds;
    if (seconds < 0) cronoSeconds = 0;
    gameCrono.innerHTML = formatTime(cronoSeconds);
}

function reduceGameCronoSeconds() {
    const gameCrono = document.getElementById("gameCrono");
    cronoSeconds--;
    if (cronoSeconds < 0) cronoSeconds = 0;
    gameCrono.innerHTML = formatTime(cronoSeconds);
}

function formatTime(time) {
    // Hours, minutes and seconds
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + String(mins).padStart(2, '0') + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export function startGameCrono() {
    cronoInterval = setInterval(reduceGameCronoSeconds, 1000);
}

export function stopGameCrono() {
    clearInterval(cronoInterval);
}

function playTokenHit() {
    if (!gameMuted) {
        hitTokenAudio.play();
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateOffsets(numberOfTokens) {
    let offsets = [];

    switch (numberOfTokens) {
        case 2:
            offsets = [{x: -1.2, y: 0}, {x: 1.2, y: 0}]
            break;
        case 3:
            offsets = [{x: -1.2, y: 1}, {x: 1.2, y: 1}, {x: 0, y: -1}]
            break;
        case 4:
            offsets = [{x: -1.2, y: 1.2}, {x: 1.2, y: 1.2}, {x: 1.2, y: -1.2}, {x: -1.2, y: -1.2}]
            break;
        case 5:
            offsets = [{x: -1.6, y: 1.6}, {x: 1.6, y: 1.6}, {x: 1.6, y: -1.6}, {x: -1.6, y: -1.6}, {x: 0, y: 0}]
            break;
        case 6:
            offsets = [{x: -1.9, y: 1.1}, {x: 1.9, y: 1.1}, {x: 1.9, y: -1.1}, {x: -1.9, y: -1.1}, {x: 0, y: -2.2}, {x: 0, y: 2.2}]
    }
    
    return offsets;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function getRandom(max, min) {
    return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

function getDistance(pos1, pos2) {
    let a = pos1.x - pos2.x;
    let b = pos1.y - pos2.y;

    return Math.hypot(a,b); 
}

function colorToToken(color) {
    let res;
    switch (color) {
        case "blue":
            res = blueToken;
            break;
        case "yellow":
            res = yellowToken;
            break;
        case "orange":
            res = orangeToken;
            break;
        case "purple":
            res = purpleToken;
            break;
        case "pink":
            res = pinkToken;
            break;
        case "green":
            res = greenToken;
    }
    return res;
}

export function colorToPlayer(color) {
    let res;

    let i = 0;
    let found = false;
    let playerArray = Object.values(players);

    while(!found && i < playerArray.length) {
        found = playerArray[i].color == color;
        if (found) {
            res = playerArray[i];
        } else {
            i++;
        } 
    }
    return res;
}

function getPlayersInSquare(square) {
    let playersInSquare = [];
    try {
        Object.values(players).forEach(p => {
            if (p.square == square) playersInSquare.push(p);
        })
    } catch (error) {
        console.log("Players not defined");
    }
    return playersInSquare;
}

function availableRouteDirection(square1, square2) {
    let sol = null;
    if (square1 != square2) {
        if (square1 >= 0 && square2 >= 0 && square1 <= 23 && square2 <= 23) {
            // Both squares are in the ring
            // Use min distance
            let disClockwise = (square2 > square1)? (square2-square1) : (square2+24-square1);
            let disCounterClockwise = 24 - disClockwise;
            sol = (disClockwise <= disCounterClockwise)? "clockwise" : "counter-clockwise"; 
        } else if (VER.includes(square1) && VER.includes(square2)) {
            // Both squares are in vertical
            // Check direction
            sol = (VER.indexOf(square1) < VER.indexOf(square2))? "vertical" : "reverse-vertical"; 
        } else if (DIAG1.includes(square1) && DIAG1.includes(square2)) {
            // Both squares are in diagonal 1
            // Check direction
            sol = (DIAG1.indexOf(square1) < DIAG1.indexOf(square2))? "diagonal1" : "reverse-diagonal1"; 
        } else if (DIAG2.includes(square1) && DIAG2.includes(square2)) {
            // Both squares are in diagonal 2
            // Check direction
            sol = (DIAG2.indexOf(square1) < DIAG2.indexOf(square2))? "diagonal2" : "reverse-diagonal2"; 
        }
    }
    
    if (sol == null) throw "No route available";

    return sol;
}


/*

█▀▄ █ █▀▀ █▀▀
█▄▀ █ █▄▄ ██▄

*/

export function setDice(element) {
    dice = element;
}

export function setDiceNumber(number) {
    diceNumber = number;
}

export async function enableDice() {
    try {
        await moveDiceUp();

        isDiceAvailable = true;
        dice.addEventListener("click", rollDice);
        dice.addEventListener("click", disableDice);
    } catch (error) {
        console.log(error);
    }
}

export function disableDice() {
    try {
        isDiceAvailable = false;
        dice.removeEventListener("click", rollDice);
        dice.removeEventListener("click", disableDice);
        
    } catch (error) {
        console.log(error);
    }
}

export async function rollDice() {
    try {
        let randomNumber = diceNumber == undefined || diceNumber < 1 || diceNumber > 6;

        // Get random multiples of 90 degrees so the dice always lands on a face
        let min = 10;
        let max = 25;
        let xRand = getRandom(max, min);
        let yRand = getRandom(max, min);

        
        if (!randomNumber) {
            // Calculate real rotation offset
            let xOffset = xRand % 360 // Remove complete turns
            let yOffset = yRand % 360

            xRand -= xOffset;
            yRand -= yOffset;

            // Calculate result beforehand
            //let numRotationsX = xOffset / 90;
            //let numRotationsY = yOffset / 90;
            //let res = calculateDiceResult(numRotationsX, numRotationsY);

            switch (diceNumber) {
                case 1:
                    break;
                case 2:
                    xRand += 90;
                    break;
                case 3:
                    yRand += 90;
                    break;
                case 4:
                    yRand += 270;
                    break;
                case 5:
                    xRand += 270;
                    break;
                case 6:
                    xRand += 180;
                    break;
            }


        }


        dice.style.transform += 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';

        // Wait for rotation animation to finish
        await sleep(4000);

        await moveDiceDown();
    } catch (error) {
        console.log(error);
    }
}

export async function moveDiceUp() {
    dice.style.transition = "transform 0.5s";
    dice.style.transform = "scale(1.2) translateY(-20px)";

    // Wait for move up animation to finish
    await sleep(500);

    // Remove transition time to use class value
    dice.style.transition = "";
}

async function moveDiceDown() {
    dice.style.transition = "transform 0.5s";
    dice.style.transform = dice.style.transform.replace("scale(1.2)", "");
    dice.style.transform = dice.style.transform.replace("translateY(-20px)", "");

    // Wait for move down animation to finish
    await sleep(500);
    if (!gameMuted) {
        diceSoundAudio.play();
    }

    // Remove transition time to use class value
    dice.style.transition = "";
}

function calculateDiceResult(numRotationsX, numRotationsY) {
    let res = 1;
    let evaluate = numRotationsX * 10 + numRotationsY;

    console.log(evaluate);
    

    switch (evaluate) {
        case 0:
            res = 1;
            break;
        case 1:
            res = 3;
            break;
        case 2:
            res = 6;
            break;
        case 3:
            res = 4;
            break;

        case 10:
            res = 2;
            break;
        case 11:
            res = 2;
            break;
        case 12:
            res = 2;
            break;
        case 13:
            res = 2;
            break;

        case 20:
            res = 6;
            break;
        case 21:
            res = 4;
            break;
        case 22:
            res = 1;
            break;
        case 23:
            res = 3;
            break;

        case 30:
            res = 5;
            break;
        case 31:
            res = 5;
            break;
        case 32:
            res = 5;
            break;
        case 33:
            res = 5;
    }

    console.log(res);
    return res;
}


/*

▄▀█ █▄░█ █ █▀▄▀█ ▄▀█ ▀█▀ █ █▀█ █▄░█
█▀█ █░▀█ █ █░▀░█ █▀█ ░█░ █ █▄█ █░▀█

*/

function animateTowards(token, initialPosition, targetPosition, duration) {
    const startTime = app.ticker.lastTime;

    const func = () => {
        const elapsedTime = Math.min(app.ticker.lastTime - startTime, duration);
        const progress = elapsedTime / duration;

        token.position.x = lerp(initialPosition.x, targetPosition.x, progress);
        token.position.y = lerp(initialPosition.y, targetPosition.y, progress);

        if (elapsedTime == duration) {
            app.ticker.remove(func);
        }
    };

    app.ticker.add(func);
}
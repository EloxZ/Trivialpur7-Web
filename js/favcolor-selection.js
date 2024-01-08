var favColor;

let blueSel = document.getElementById("colorSelectorBlue");
let greenSel = document.getElementById("colorSelectorGreen");
let orangeSel = document.getElementById("colorSelectorOrange");
let yellowSel = document.getElementById("colorSelectorYellow");
let purpleSel = document.getElementById("colorSelectorPurple");
let pinkSel = document.getElementById("colorSelectorPink");

blueSel.onclick = () => {
    resetStyles();
    favColor = "blue";
    blueSel.style = "outline: 2px solid black";
}

greenSel.onclick = () => {
    resetStyles();
    favColor = "green";
    greenSel.style = "outline: 2px solid black";
}

orangeSel.onclick = () => {
    resetStyles();
    favColor = "orange";
    orangeSel.style = "outline: 2px solid black";
}

yellowSel.onclick = () => {
    resetStyles();
    favColor = "yellow";
    yellowSel.style = "outline: 2px solid black";
}

purpleSel.onclick = () => {
    resetStyles();
    favColor = "purple";
    purpleSel.style = "outline: 2px solid black";
}

pinkSel.onclick = () => {
    resetStyles();
    favColor = "pink";
    pinkSel.style = "outline: 2px solid black";
}

function resetStyles() {
    blueSel.style = "";
    greenSel.style = "";
    orangeSel.style = "";
    yellowSel.style = "";
    purpleSel.style = "";
    pinkSel.style = "";
}
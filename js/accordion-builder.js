let sectionCount = 0;
            
function label(text) {
    return "<span style='font-weight: bold; color:#ED2188'>" + decodeHtml(text) + ": </span>";
}

function fieldDisplay(labelText, valueText) {
    return label(labelText) + decodeHtml(valueText);
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

function populateAccordion(games) {
    resetAccordion();
    
    for (const game of games) {
        // Convert the timestamp to a Date object
        const timestamp = new Date(Number(game.date.$date.$numberLong));

        // Get day, month, year, hours, and minutes
        const day = String(timestamp.getDate()).padStart(2, '0');
        const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const year = timestamp.getFullYear();
        const hours = String(timestamp.getHours()).padStart(2, '0');
        const minutes = String(timestamp.getMinutes()).padStart(2, '0');

        // Format as "DD/MM/YYYY, HH:MM"
        const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;
        
        const headerContent = "Sala " + game.gameId + "&emsp;&emsp;(" + formattedDate + ")";
        let content = "<p>" + fieldDisplay("Anfitrión", game.host) + "<br>";

        if (game.winner) {
            content += fieldDisplay("Ganador", game.winner) + "<br>";
        }
        
        content +=  "</p>";
        
        const players = Object.values(game.players);

        for (const player of players) {
            let cheesesWon = new Array();
            for (const cheeseKey in player.cheeses) {
                if (player.cheeses[cheeseKey] === true) {
                    cheesesWon.push(translateColor(cheeseKey));
                }
            }

            let answeredQuestions = 0;
            let correctAnswers = 0;
            for (const testKey in player.tests) {
                answeredQuestions += player.tests[testKey].questionNum;
                correctAnswers += player.tests[testKey].questionCorrect;
            }

            if (cheesesWon.length == 0) cheesesWon.push("ninguno");

            content += "<p>" + fieldDisplay("Usuario", player.name) + "<br>"
            + fieldDisplay("Quesos conseguidos", cheesesWon.join(", ")) + "<br>"
            + fieldDisplay("Preguntas respondidas", answeredQuestions) + "<br>"
            + fieldDisplay("Respuestas correctas", correctAnswers) + "<br>"
            
            if (answeredQuestions > 0) content += fieldDisplay("Porcentaje de acierto", correctAnswers*100/answeredQuestions + " %") + "<br>"
            
            content += "</p>";
        }

        addSection(headerContent, content);

    }
}

function toggleSection(sectionNumber) {
    const collapseId = "collapse" + sectionNumber;
    const collapseElement = document.getElementById(collapseId);

    $(collapseElement).collapse('toggle');
}

function addSection(headerContent, content) {
    sectionCount++;

    const accordion = document.getElementById("myAccordion");

    const card = document.createElement("div");
    card.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.id = "heading" + sectionCount;

    const headingContainer = document.createElement("h5");
    headingContainer.className = "mb-0";

    const button = document.createElement("button");
    button.className = "btn btn-link accordion-heading";
    button.type = "button";
    button.innerHTML = headerContent || "Section " + sectionCount;
    let sectionNumber = sectionCount;
    button.onclick = function() {
        toggleSection(sectionNumber);
    };

    headingContainer.appendChild(button);
    cardHeader.appendChild(headingContainer);

    const collapse = document.createElement("div");
    collapse.id = "collapse" + sectionCount;
    collapse.className = "collapse";
    collapse.setAttribute("data-parent", "#myAccordion");

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = content || "Content of section " + sectionCount + " goes here.";

    collapse.appendChild(cardBody);

    card.appendChild(cardHeader);
    card.appendChild(collapse);

    accordion.appendChild(card);
}

function resetAccordion() {
    const accordion = document.getElementById("myAccordion");
    accordion.innerHTML = "";
    sectionCount = 0;
}

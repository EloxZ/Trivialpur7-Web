const blueTestSelect = document.getElementById("blueTestSelect");
const greenTestSelect = document.getElementById("greenTestSelect");
const orangeTestSelect = document.getElementById("orangeTestSelect");
const yellowTestSelect = document.getElementById("yellowTestSelect");
const purpleTestSelect = document.getElementById("purpleTestSelect");
const pinkTestSelect = document.getElementById("pinkTestSelect");

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function addPlaceholder(select, text) {
    const placeholder = document.createElement("option");
    placeholder.text = text
    placeholder.value = ""
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);
}

function loadTestSelects() {
    loadTestSelect(blueTestSelect);
    loadTestSelect(greenTestSelect);
    loadTestSelect(orangeTestSelect);
    loadTestSelect(yellowTestSelect);
    loadTestSelect(purpleTestSelect);
    loadTestSelect(pinkTestSelect);
}

function loadTestSelect(select) {
    console.log(availableTests);
    const subjectArray = availableTests.filter(subject => subject.id == 109789);

    if (subjectArray.length > 0) {
        const subject = subjectArray[0];
        select.innerHTML = "";
        addPlaceholder(select, "Selecciona un test");

        for (const test of subject.tests) {
            addOption(select, decodeHtml(test.name), test.id);
        }
    }
}

function addOption(select, text, value) {
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    select.appendChild(option);
}

loadTestSelects();

var minutesDisplayEl = document.querySelector("#minutes");
var secondsDisplayEl = document.querySelector("#seconds");
var contentContainerEl = document.querySelector(".container");
var clearBtnEl = document.querySelector('#clearBtn');

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var score = 0;
var shuffledQues = "";
var currentQuesIndex = 0;

var timeIdArray = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];

renderTime();
displayScheduler();

contentContainerEl.addEventListener("click", inputData);
contentContainerEl.addEventListener("click", saveToLocal);

displayReminders();

function displayScheduler() {
    for (i = 0; i < timeIdArray.length; i++) {
        var rowEl = document.createElement('div')
        var timeIdEl = document.createElement('div');
        var inputTextEl = document.createElement('div');
        var inputTextAreaEl = document.createElement('textArea');
        var saveIconEl = document.createElement('div');
        var saveIconBtnEl = document.createElement('button');

        rowEl.setAttribute("class", "row");
        timeIdEl.setAttribute("class", "timeId col-md-2");
        timeIdEl.setAttribute("data-index", i);
        timeIdEl.setAttribute("style", "text-Align: center; padding-top: 25px; font-family: Georgia, Times New Roman, Times, serif; font-size: 20px; background-color: #777777; color: #ffffff");
        inputTextEl.setAttribute("class", "inputText col-md-8");
        inputTextEl.setAttribute("style", "padding: 0");
        inputTextAreaEl.setAttribute("class", "inputTextArea col-md-12");
        inputTextAreaEl.setAttribute("type", "text");
        inputTextAreaEl.setAttribute("rows", "3");
        inputTextAreaEl.setAttribute("onfocus", "value=''");
        inputTextAreaEl.setAttribute("data-index", i);
        inputTextAreaEl.setAttribute("style", "resize: none");
        saveIconEl.setAttribute("class", "saveIcon col-md-2");
        saveIconEl.setAttribute("style", "background-color: #777777");
        saveIconBtnEl.setAttribute("class", "saveIconBtn btn");
        saveIconBtnEl.setAttribute("data-index", i);

        timeIdEl.textContent = timeIdArray[i];
        inputTextAreaEl.textContent = "Enter text here...";
        saveIconBtnEl.textContent = "Save";

        contentContainerEl.appendChild(rowEl);
        rowEl.appendChild(timeIdEl);
        rowEl.appendChild(inputTextEl);
        inputTextEl.appendChild(inputTextAreaEl);
        rowEl.appendChild(saveIconEl);
        saveIconEl.appendChild(saveIconBtnEl);
    }
    var clearEl = document.createElement('div');
    var clearBtnEl = document.createElement('button');
    clearEl.setAttribute("class", "col-md-12");
    clearBtnEl.setAttribute("class", "clearBtn");
    clearBtnEl.textContent = "Clear";
    contentContainerEl.appendChild(rowEl);
    rowEl.appendChild(clearEl);
    clearEl.appendChild(clearBtnEl);
    clearBtnEl.addEventListener("click", clearList);
}

function inputData(event) {
    // This 'preventDefault' method tells the user agent that if the event does not get explicitly
    // handled, its default action should not be taken as it normally would be.
    event.preventDefault(event);
    // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
    // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
    // to know whether this method was ever called (on that event object).
    var userTextBoxSelect = event.target;
    var textBoxSelect = event.target.matches("textArea");
    if (textBoxSelect) {
        console.log("this is what user clicked " + userTextBoxSelect.getAttribute("data-index"));
    }
}

function saveToLocal(event) {
    // This 'preventDefault' method tells the user agent that if the event does not get explicitly
    // handled, its default action should not be taken as it normally would be.
    event.preventDefault(event);
    // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
    // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
    // to know whether this method was ever called (on that event object).
    var userTextInputEl = document.querySelectorAll(".inputTextArea")
    var userSaveSelect = event.target;
    var saveSelect = event.target.matches("button");
    var indexSelect = userSaveSelect.getAttribute("data-index");
    if (saveSelect) {
        console.log("this is what user clicked " + userSaveSelect.getAttribute("data-index"));
        userInput = userTextInputEl[indexSelect].value.trim();
        console.log(userInput);
        userInputUppercase = userInput.toUpperCase();
        console.log("Current Initials are: " + userInputUppercase);
        localStorage.setItem(indexSelect, userInputUppercase);
    }
}

function displayReminders(){
    userTextInputEl = document.querySelectorAll(".inputTextArea")
    for(k = 0; k < timeIdArray.length; k++){
    userTextInputEl[k].textContent = localStorage.getItem(k);
    }
}

function clearList(event){
    // This 'preventDefault' method tells the user agent that if the event does not get explicitly
    // handled, its default action should not be taken as it normally would be.
    event.preventDefault(event);
    // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
    // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
    // to know whether this method was ever called (on that event object).
    event.stopPropagation(event);
    var userSaveSelect = event.target;
    var clearSelect = event.target.matches("button");
    if (clearSelect) {
        console.log("clear button clicked");
        $(".inputTextArea").empty();
        // localStorage.clear();
    }
}


function getFormattedMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;

    var minutesLeft = Math.floor(secondsLeft / 60);

    var formattedMinutes;

    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
    } else {
        formattedMinutes = minutesLeft;
    }

    return formattedMinutes;
}

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;

    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

function setTime() {
    var minutes = minutesDisplayEl.value = 30;

    clearInterval(interval);
    totalSeconds = minutes * 60;
}

function renderTime() {
    minutesDisplayEl.textContent = getFormattedMinutes();
    secondsDisplayEl.textContent = getFormattedSeconds();

    if (secondsElapsed >= totalSeconds) {
        stopTimer();
    }
}

function startTimer() {
    setTime();

    interval = setInterval(function () {
        secondsElapsed++;
        renderTime();
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    renderTime();
}

function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
}
$(document).ready(function() { 
    var minutesDisplayEl = document.querySelector("#minutes");
    var secondsDisplayEl = document.querySelector("#seconds");
    var contentContainerEl = document.querySelector(".container");
    var clearBtnEl = document.querySelector('#clearBtn');
    var currentDayEl = document.querySelector("#currentDay")

    var totalSeconds = 0;
    var secondsElapsed = 0;
    var interval;
    var score = 0;
    var shuffledQues = "";
    var currentQuesIndex = 0;
    var currentHour = 0;

    // Current Date and Time
    var m = moment();
    console.log(m);
    currentHour = m.hour();//this is in format

    // Create from ISO 8601 String
    m = moment("2019-05-19T23:10:00.000+05:00");

    // Using a format
    m = moment("14/06/2019 4:50PM", "DD/MM/YYYY h:mmA");

    // Create using milliseconds since epoch (1st Jan 1970)
    m = moment(600000);

    // Create using seconds since epoch (1st Jan 1970)
    m = moment.unix(7200);

    // Create a moment object in UTC mode
    m = moment.utc("2019-05-19T23:10:00.000+05:00");

    m = moment();

    var timeIdArray = [m.format('15:00'),m.format('16:00'), m.format('17:00'), m.format('18:00'), m.format('19:00'), m.format('20:00'), m.format('21:00'), m.format('22:00'), m.format('23:00')];

    console.log(`toString() => ${m.toString()}`);
    console.log(`toISOString() => ${m.toISOString()}`);

    // $('#minutes').text(1.3);

    function update() {
        $('#minutes').html(moment().format('HH:mm:ss'));
    }

    setInterval(update, 1000);

    interval = setInterval(setActiveColor, 1000);

    currentDayEl.textContent = m.format("dddd DD MMMM YYYY");

    //renderTime();
    displayScheduler();
    displayTimeEl();
    // setActiveColor();

    contentContainerEl.addEventListener("click", inputData);
    contentContainerEl.addEventListener("click", saveToLocal);

    displayReminders();

    function displayScheduler() {
        for (var i = 0; i < timeIdArray.length; i++) {
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
            // inputTextAreaEl.setAttribute("onfocus", "value=''");
            inputTextAreaEl.setAttribute("data-index", i + 15);
            inputTextAreaEl.setAttribute("style", "resize: none");
            saveIconEl.setAttribute("class", "saveIcon col-md-2");
            saveIconEl.setAttribute("style", "background-color: #777777");
            saveIconBtnEl.setAttribute("class", "saveIconBtn btn");
            saveIconBtnEl.setAttribute("data-index", i + 15);

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
        clearEl.addEventListener("click", clearList);

    }

    function displayTimeEl() {
        var timeIdEl = document.querySelectorAll(".timeId");
        var timeText = timeIdEl[0].textContent;
        console.log(timeText);
    }

    function inputData(event) {
        // This 'preventDefault' method tells the user agent that if the event does not get explicitly
        // handled, its default action should not be taken as it normally would be.
        event.preventDefault(event);
        // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
        // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
        // to know whether this method was ever called (on that event object).
        event.stopPropagation(event);
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
        event.stopPropagation(event);
        var userTextInputEl = document.querySelectorAll(".inputTextArea")
        var userSaveSelect = event.target;
        var saveSelect = userSaveSelect.matches("button");
        var indexSelect = userSaveSelect.getAttribute("data-index");
        if (saveSelect) {
            console.log("this is what user clicked " + userSaveSelect.getAttribute("data-index"));
            userInput = userTextInputEl[indexSelect - 15].value.trim();
            console.log(userInput);
            userInputUppercase = userInput.toUpperCase();
            console.log("Current text input is: " + userInputUppercase);
            localStorage.setItem(indexSelect - 15, userInputUppercase);
        }
        displayReminders();
    }

    function displayReminders() {
        userTextInputEl = document.querySelectorAll(".inputTextArea")
        for (var k = 0; k < timeIdArray.length; k++) {
            userTextInputEl[k].value = localStorage.getItem(k);
        }
    }

    function clearList(event) {
        // This 'preventDefault' method tells the user agent that if the event does not get explicitly
        // handled, its default action should not be taken as it normally would be.
        event.preventDefault(event);
        // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
        // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
        // to know whether this method was ever called (on that event object).
        event.stopPropagation(event);
        var userClearSelect = event.target;
        var clearSelect = userClearSelect.matches("button");
        if (clearSelect) {
            console.log("clear button clicked");
            $('.inputTextarea').empty();
            // localStorage.clear();
        }
    }

    function setActiveColor() {
        // location.reload();
        // console.log("Run");
        $('#seconds').html(moment().format('HH'));
        secondsDisplayEl.setAttribute('class', 'hide');
        var currentHour = secondsDisplayEl.textContent;
        // console.log(currentHour);
        userTextInputEl = document.querySelectorAll(".inputTextArea")
        for (var j = 0; j < timeIdArray.length; j++)
            if (currentHour == j + 15) {
                userTextInputEl[j].setAttribute("style", "background-color: #03fc21");
                // userTextInputEl[j].setAttribute("style", "background-color: green");
                // var dataInd = userTextInputEl[j].getAttribute("data-index");
                // console.log(dataInd);
            }
            else if (currentHour < j + 15) {
                userTextInputEl[j].setAttribute("style", "background-color: #ffffff");
                // var dataInd = userTextInputEl[j].getAttribute("data-index");
                // console.log(dataInd);
            }
            else {
                userTextInputEl[j].setAttribute("style", "background-color: #fca203");
                // var dataInd = userTextInputEl[j].getAttribute("data-index");
                // console.log(dataInd);
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
});
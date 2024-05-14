/**
 * Reads in and processes user input.
 *
 */
function compute() {
    let pText = document.querySelector("p");
    let time = 0;
    let distance = 0;
    let pace = 0;

    //Time text boxes
    let hourText = document.querySelector("#timeArgIDHours");
    hourText.defaultValue = 0;
    let minText = document.querySelector("#timeArgIDMinutes");
    minText.defaultValue = 0;
    let secText = document.querySelector("#timeArgIDSeconds");
    secText.defaultValue = 0;

    //Distance text boxes
    let mainText = document.querySelector("#distanceArgIDMain");
    mainText.defaultValue = 0;
    let decText = document.querySelector("#distanceArgIDDecimal");
    decText.defaultValue = 0;

    //Pace text boxes
    let paceMinText = document.querySelector("#paceArgIDMins");
    paceMinText.defaultValue = 0;
    let paceSecText = document.querySelector("#paceArgIDSecs");
    paceSecText.defaultValue = 0;

    //Determines number of minutes
    if (isNumericString(hourText.value) && isNumericString(minText.value) && isNumericString(secText.value)) {
        time = Number(hourText.value*60) + Number(minText.value) + Number(secText.value/60);
    } else {
        pText.innerHTML= "Please only enter integers.";
        return;
    }

    //Determines distance
    if (isNumericString(mainText.value) && isNumericString(decText.value)) {
        distance = Number(mainText.value) + Number(decText.value/100);
    } else {
        pText.innerHTML= "Please only enter integers.";
        return;
    }

    //Determines pace
    if (isNumericString(paceMinText.value) && isNumericString(paceSecText.value)) {
        pace = Number(paceMinText.value) + Number(paceSecText.value/60);
    } else {
        pText.innerHTML= "Please only enter integers.";
        return;
    }

    //Determines which value to calculate
    if (time == "") {
        computeTime(time, distance, pace, pText);
    } else if (distance == "") {
        computeDist(time, distance, pace, pText);
    } else if (pace == "") {
        computePace(time, distance, pace, pText);
    } else {
        pText.innerHTML= "Please leave one slot open.";
    }
}

/**
 * Computes a time based on pace and distance
 *
 * @param {any} time
 * @param {any} distance
 * @param {any} pace
 * @param {any} pText
 */
function computeTime(time, distance, pace, pText) {
    if (distance == "" | pace == "") {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isFinite(distance) | !Number.isFinite(pace)) {
        pText.innerHTML= "Please only enter integers.";
    }

    time = distance * pace;
    pText.innerHTML = (time.toFixed(2) + " minutes.");
    //document.querySelector("#timeArgIDHours").value = "";
    //document.querySelector("#timeArgIDMinutes").value = "";
    //document.querySelector("#timeArgIDSeconds").value = "";
}

/**
 * Computes a distance based on time and pace.
 *
 * @param {any} time
 * @param {any} distance
 * @param {any} pace
 * @param {any} pText
 */
function computeDist(time, distance, pace, pText) {
    if (time == "" | pace == "") {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isFinite(time) | !Number.isFinite(pace)) {
        pText.innerHTML= "Please only enter integers.";
    }

    distance = time / pace;
    pText.innerHTML = (distance.toFixed(2) + " miles.");
    //document.querySelector("#distanceArgIDMain").value = "";
    //document.querySelector("#distanceArgIDDecimal").value = "";
}

/**
 * Computes a pace based on time and distance
 *
 * @param {any} time
 * @param {any} distance
 * @param {any} pace
 * @param {any} pText
 */
function computePace(time, distance, pace, pText) {
    if (distance == "" | time == "") {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isFinite(time) | !Number.isFinite(distance)) {
        pText.innerHTML= "Please only enter integers.";
    }

    pace = time / distance;
    pText.innerHTML = (pace.toFixed(2) + " minutes/mile.");
    //document.querySelector("#paceArgIDMins").value = "";
    //document.querySelector("#paceArgIDSecs").value = "";
}

/**
 * Determine whether the given `input` is a number.
 *
 * @param {String} input
 *
 * @returns {Boolean}
 */
function isNumericString(input) { 
    return !isNaN(parseInt(input));
  }
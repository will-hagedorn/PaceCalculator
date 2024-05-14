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
    //hourText.defaultValue = 0;
    let minText = document.querySelector("#timeArgIDMinutes");
    //minText.defaultValue = 0;
    let secText = document.querySelector("#timeArgIDSeconds");
    //secText.defaultValue = 0;

    //Distance text boxes
    let mainText = document.querySelector("#distanceArgIDMain");
    //mainText.defaultValue = 0;
    let decText = document.querySelector("#distanceArgIDDecimal");
    //decText.defaultValue = 0;

    //Pace text boxes
    let paceMinText = document.querySelector("#paceArgIDMins");
    //paceMinText.defaultValue = 0;
    let paceSecText = document.querySelector("#paceArgIDSecs");
    //paceSecText.defaultValue = 0;

    //Determines number of minutes
    let hour = 0;
    let min = 0;
    let sec = 0;
    if (isNumericString(hourText.value)) {
        hour = Number(hourText.value*60);
    } else {
        hour = 0;
    }
    if (isNumericString(minText.value)) {
        min = Number(minText.value);
    } else {
        min = 0;
    }
    if (isNumericString(secText.value)) {
        sec = Number(secText.value/60);
    } else {
        sec = 0;
    }
    time = hour + min + sec;

    //Determines distance
    let mile;
    let dec;
    if (isNumericString(mainText.value)) {
        mile = Number(mainText.value);
    } else {
        mile = 0;
    }
    if (isNumericString(decText.value)) {
        let strLength = decText.value.length;
        let num = Number(decText.value);
        let length = num.toString().length;

        if (strLength > length) {
            for (let i = 0; i < strLength - length; i++) {
                num = (num / 10);
            }
            dec = num / Math.pow(10, length);
        } else {
            dec = num / Math.pow(10, length);
        }
    } else {
        dec = 0;
    }
    distance  = mile + dec;

    //Determines pace
    let paceMin = 0;
    let paceSec = 0;
    if (isNumericString(paceMinText.value)) {
        paceMin = Number(paceMinText.value);
    } else {
        paceMin = 0;
    }
    if (isNumericString(paceSecText.value)) {
        paceSec = Number(paceSecText.value/60);
    } else {
        paceSec = 0;
    }
    pace  = paceMin + paceSec;

    //Determines which value to calculate
    if (time == 0) {
        computeTime(time, distance, pace, pText);
    } else if (distance == 0) {
        computeDist(time, distance, pace, pText);
    } else if (pace == 0) {
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
    if (distance == 0 | pace == 0) {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isInteger(distance) | !Number.isInteger(pace)) {
        pText.innerHTML= "Please only enter integers.";
    }

    time = distance * pace;
    let hours = Math.floor(time / 60);
    let mins = Math.floor((time % 60), 1);
    let secs = ((time % 60) % 1) * 60;
    pText.innerHTML = (hours + " hours : " + mins + " minutes : " +  secs.toFixed(2) + " seconds");
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
    if (time == 0 | pace == 0) {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isInteger(time) | !Number.isInteger(pace)) {
        pText.innerHTML= "Please only enter integers.";
    }

    distance = time / pace;
    pText.innerHTML = (distance.toFixed(2) + " miles.");
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
    if (distance == 0 | time == 0) {
        pText.innerHTML= "Please leave only one slot open.";
    } else if (!Number.isInteger(time) | !Number.isInteger(distance)) {
        pText.innerHTML= "Please only enter integers.";
    }

    pace = time / distance;
    pText.innerHTML = (pace.toFixed(2) + " minutes/mile.");
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
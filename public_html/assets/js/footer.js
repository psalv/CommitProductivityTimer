
var INTERVAL_TIME = 10000;
var startTime = new Date();
var newDate;
var pausedTime = 0;
var breakTime = 0;
var onBreak = false;

var talkTime = 0;
var firstCallBack = true;
var soundOn = true;


document.getElementById('beginTime').innerHTML = startTime.toString();

document.getElementById('sndOn').addEventListener('click', function () {
    this.style.color = 'red';
    document.getElementById('sndOff').style.color = 'black';
    soundOn = true;
});
document.getElementById('sndOff').addEventListener('click', function () {
    this.style.color = 'red';
    document.getElementById('sndOn').style.color = 'black';
    soundOn = false;
});

// Changes the new date
function getDateFxn () {
    newDate = new Date();
}

// Updates the time
function updateTime(reset) {
    // Updates can occur during a regular interval (when not paused) or when resetting
    if(!paused || reset) {

        // We find the new secondary time.
        getDateFxn();

        // We calculate the difference between the secondary time and the start time
        var difference = newDate.getTime() - startTime.getTime();

        // We then subtract the amount of time that we have spent paused.
        var dif = Math.min(60, difference / 60000 - pausedTime + breakTime);

        document.getElementById('difTime').innerHTML = dif.toFixed(2) + " minutes";
        var bck = document.getElementById('bckColour');
        if(dif >= 50){
            bck.style.backgroundColor = "red";
        }
        else if(dif >= 30){
            bck.style.backgroundColor = "#ffb84d";
        }
        else{
            bck.style.backgroundColor = "lightgreen";
        }


        // Talk time only if the difference is 5 greater than the previous reminder.
        if(dif - 5 > talkTime){

            // Used to determine if we are in a callback (to avoid endless loops)
            firstCallBack = true;

            // Set the new reminder for 5 minutes from now.
            talkTime += 5;

            // Talk with how long has passed.
            talk(talkTime, true);

        }

        if(dif == 60){
            paused = true;
            alert("You have exceeded 60 minutes of work, a commit is recommended.");
        }

    }
}

// Resetting the clock
function reset(){

    // Change the new start time to the current time.
    startTime = new Date();
    document.getElementById('beginTime').innerHTML = startTime.toString();

    // Reset the time we have spent paused.
    pausedTime = 0;

    // Reset talkTime
    talkTime = 0;

    if(onBreak){
        takeBreak();
    }

    // Update the time accordingly.
    updateTime(true)
}

var paused = false;
function pause(){

    if(onBreak){
        return;
    }

    // If we unpause we need to account for the amount of time that we've been paused for.
    if(paused){
        document.getElementById('pause').innerHTML = "Pause";
        pausedTime += (new Date().getTime() - newDate.getTime()) / 60000;
        updateTime()
    }

    // When we pause we update the time to save when we paused.
    else{
        document.getElementById('pause').innerHTML = "Unpause";
        updateTime(false);
    }

    // If paused we unpause, and vice versa.
    paused = !paused;
}

// An interval that updates the clock.
window.setInterval(updateTime, INTERVAL_TIME);


// Keep track of the start time as well as whether or not we are currently onBreak the web.
var startBreak;
function takeBreak() {

    // If we are starting to search, we pause the primary timer, store the time we start onBreak, and change the html.
    if(!onBreak){
        pause();
        document.getElementById('pause').disabled = true;
        startBreak = new Date();
        onBreak = true;
        document.getElementById('breakField').setAttribute('class', '');
        document.getElementById('breakButton').innerHTML = "Resume";
    }

    // If we are ending the search then we increment the time we have spent onBreak the web, change the button back, and unpause.
    else{
        document.getElementById('breakTime').innerHTML = "";
        breakTime += (new Date().getTime() - startBreak.getTime()) / 60000;
        onBreak = false;
        document.getElementById('breakButton').innerHTML = "Break";
        pause();
        document.getElementById('breakField').setAttribute('class', 'hidden');
        document.getElementById('breakTime').innerHTML = '0.00';
        document.getElementById('pause').disabled = false;
    }
}

function updateTimeBreak() {

    // This function only occurs while we are onBreak, we update the html and check to see if we have exceed the 15 min limit.
    if(onBreak){
        var elapsed = (new Date().getTime() - startBreak.getTime()) / 60000;
        if(elapsed >= 15){
            talkBreak();
            takeBreak();
        }
        else{
            document.getElementById('breakTime').innerHTML = elapsed.toFixed(2);
        }
    }
}

function talk(min, flag) {

    if(soundOn){
        var words;
        if (flag) {
            words = String(min) + "minutes have passed";
        }
        else{
            words = String(min) + "minutes remain";
        }

        meSpeak.speak( words, {
            amplitude: '100',
            wordgap: '10',
            pitch: '50',
            speed: '175',
            variant: 'm1 (male 1)'
        }, talkCallback);
    }

}


function talkBreak() {
    console.log(soundOn);
    if(soundOn){
        var words = "Your break is over.";

        meSpeak.speak( words, {
            amplitude: '100',
            wordgap: '10',
            pitch: '50',
            speed: '175',
            variant: 'm1 (male 1)'
        }, null);
    }

}

// The callback will call talk again without the flag (meaning we want remaining time).
// Uses the firstCallBack to avoid endless loops.
function talkCallback(){
    if(talkTime >= 5 && firstCallBack){
        firstCallBack = false;
        talk(60 - talkTime, false);
    }
}

window.setInterval(updateTimeBreak, INTERVAL_TIME);

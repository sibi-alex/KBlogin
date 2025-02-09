let timerInterval;
let isWorking = false;
let isOnBreak = false;
let totalSeconds = 0;


function updateCurrentTime() {
    const currentTime = new Date("2025-02-09T23:41:33+01:00"); // Updated provided time
    totalSeconds = Math.floor((new Date() - currentTime) / 1000); // Calculate elapsed time
    const now = new Date(currentTime.getTime() + totalSeconds * 1000); // Update to current time
    document.getElementById('current-time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

// Call updateCurrentTime immediately to set the initial time
updateCurrentTime();

// Update time every second
setInterval(updateCurrentTime, 1000);

document.getElementById('login-btn').addEventListener('click', function() {
    if (!isWorking) {
        isWorking = true;
        this.innerHTML = '<img src="img/logout.png" alt="Logout">';
        document.getElementById('status').innerText = "logged in";
        startTimer();
    } else {
        isWorking = false;
        clearInterval(timerInterval);
        this.innerHTML = '<img src="img/login.png" alt="Login">';
        document.getElementById('status').innerText = "logged out";
    }
});

document.getElementById('break-btn').addEventListener('click', function() {
    if (isWorking) {
        if (!isOnBreak) {
            isOnBreak = true;
            clearInterval(timerInterval);
            this.style.backgroundColor = 'red';
            document.getElementById('status').innerText += " You are on break";
        } else {
            isOnBreak = false;
            startTimer();
            this.style.backgroundColor = 'orange';
            document.getElementById('status').innerText = document.getElementById('status').innerText.replace(" You are on break", "");
        }
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;
        document.getElementById('timer').innerText = formatTime(totalSeconds);
    }, 1000);
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
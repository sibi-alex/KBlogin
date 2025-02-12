if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sworker.js").then(registration=>{
        console.log("Service worker registered")
        console.log(registration);
    }).catch(error=>{
        console.log("Service worker error")
        console.log(error)
    })
    
}
else {
    alert("Service worker not working")
}




const clockEl = document.getElementById("clock");
const startBtn = document.getElementById("startBtn");
const breakBtn = document.getElementById("breakBtn");
const workTimeEl = document.getElementById("workTime");

let workStartTime = null;
let workElapsedTime = 0;
let breakStartTime = null;
let isRunning = false;
let isOnBreak = false;

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-GB", { hour12: false });
    clockEl.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateWorkTime() {
    if (isRunning && !isOnBreak) {
        const now = Date.now();
        workElapsedTime = Math.floor((now - workStartTime) / 1000);
        workTimeEl.textContent = formatTime(workElapsedTime);
    }
}

setInterval(updateWorkTime, 1000);

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        workStartTime = Date.now() - workElapsedTime * 1000;
        isRunning = true;
        startBtn.textContent = "Gehen";
        startBtn.classList.remove("green-btn");
        startBtn.classList.add("red-btn");
        breakBtn.disabled = false;
    } else {
        isRunning = false;
        startBtn.textContent = "Kommen";
        startBtn.classList.remove("red-btn");
        startBtn.classList.add("green-btn");
        breakBtn.disabled = true;
    }
});

breakBtn.addEventListener("click", () => {
    if (!isOnBreak) {
        isOnBreak = true;
        breakStartTime = Date.now();
        breakBtn.textContent = "Pause Ende";
        breakBtn.classList.remove("orange-btn");
        breakBtn.classList.add("dark-red-btn");
    } else {
        isOnBreak = false;
        workStartTime += Date.now() - breakStartTime;
        breakBtn.textContent = "Pause";
        breakBtn.classList.remove("dark-red-btn");
        breakBtn.classList.add("orange-btn");
    }
});

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




let timer;
let workTime = 0;
let running = false;
let onBreak = false;

function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

document.getElementById("enterBtn").addEventListener("click", function() {
    if (running) {
        clearInterval(timer);
        running = false;
        document.getElementById("enterImg").src = "img/login.png";
        document.getElementById('status').innerText = "logged out";
    } else {
        timer = setInterval(() => {
            if (!onBreak) {
                workTime++;
                document.getElementById("workTime").innerText = formatTime(workTime);
            }
        }, 1000);
        running = true;
        document.getElementById("enterImg").src = "img/logout.png";
        document.getElementById('status').innerText = "logged in";
    }
});

document.getElementById("breakBtn").addEventListener("click", function() {
   
    if (running){
        onBreak = !onBreak;
        if (!onBreak) {
            this.style.backgroundColor = 'orange';
            document.getElementById('status').innerText = document.getElementById('status').innerText.replace(" -aber in Pause", "");
           
            
        } else {
            this.style.backgroundColor = 'red';
            document.getElementById('status').innerText += " -aber in Pause";
        }
    }

    
});

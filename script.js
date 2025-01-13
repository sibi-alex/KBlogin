// Get current system time
function updateClock() {
    const now = new Date();
    
    // Update clock display
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial update

// Radio stations data
const stations = [
     { name: 'Kronehit dig', url: 'https://secureonair.krone.at/kronehit-hp.mp3?aw_0_req.userConsentV2=CQLK2sAQLK2sAAFADCDEBYFgAAAAAAAAAAYgAAAO5gBgMEAZCA7kAoNABgACCjwiADAAEFHhUAGAAIKPDIAMAAQUeHQAYAAgo8SgAwABBR4tABgACCjxCADAAEFHikAGAAIKPBIAMAAQUeAA.YAAAAAAAAAAA&aggregator=hp' },
    { name: 'Kronehit gym', url: 'https://secureonair.krone.at/kronehit06.mp3?aw_0_req.userConsentV2=CQLK2sAQLK2sAAFADCDEBYFgAAAAAAAAAAYgAAAO5gBgMEAZCA7kAoNABgACCjwiADAAEFHhUAGAAIKPDIAMAAQUeHQAYAAgo8SgAwABBR4tABgACCjxCADAAEFHikAGAAIKPBIAMAAQUeAA.YAAAAAAAAAAA&aggregator=hp' },
];

let currentStationIndex = 0;

function changeStation(stationName, streamUrl) {
    const player = document.getElementById('radio-player');
    const stationDisplay = document.getElementById('station-name');
    
    player.src = streamUrl;
    stationDisplay.textContent = `Current Station: ${stationName}`;
    player.load();
    player.play().catch(error => {
        console.log('Error playing stream:', error);
        stationDisplay.textContent = `Error loading station: ${stationName}`;
    });
}

function nextStation() {
    currentStationIndex = (currentStationIndex + 1) % stations.length;
    const station = stations[currentStationIndex];
    changeStation(station.name, station.url);
}

function previousStation() {
    currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
    const station = stations[currentStationIndex];
    changeStation(station.name, station.url);
}

// Initialize with first station
changeStation(stations[0].name, stations[0].url);

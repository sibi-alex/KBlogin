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
    { name: 'BBC Radio 1', url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one' },
    { name: 'Classic FM', url: 'https://media-ice.musicradio.com/ClassicFMMP3' },
    { name: 'Jazz24', url: 'https://live.wostreaming.net/direct/ppm-jazz24aac-ibc1' }
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

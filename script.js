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
	{ name: 'AB In d mix', url: 'https://s3-webradio.antenne.de/in-the-mix/stream/mp3?aw_0_1st.playerid=AntenneBayernWebPlayer&aw_0_1st.skey=1736804933053&aw_0_req.userConsentV2=CQLK2sAQLK2sAAFADCDEBYFgAAAAAAAAAAYgAAASIgAgSIALCQAYAAgkQGgAwABBIgRABgACCRAqADAAEEiBkAGAAIJEDoAMAAQSIIQAYAAgkQSgAwABBIgpABgACCRAKADAAEEiC0AGAAIJEAAA.YAAAAAAAAAAA&companionAds=false&companion_zone_alias=41%2C42%2C40%2C731%2C752%2C756%2C765' },
	{ name: 'AB nur d musik', url: 'https://s6-webradio.antenne.de/nur-die-musik/stream/mp3?aw_0_1st.playerid=AntenneBayernWebPlayer&aw_0_1st.skey=1736805329602&aw_0_req.userConsentV2=CQLK2sAQLK2sAAFADCDEBYFgAAAAAAAAAAYgAAASIgAgSIALCQAYAAgkQGgAwABBIgRABgACCRAqADAAEEiBkAGAAIJEDoAMAAQSIIQAYAAgkQSgAwABBIgpABgACCRAKADAAEEiC0AGAAIJEAAA.YAAAAAAAAAAA&companionAds=false&companion_zone_alias=41%2C42%2C40%2C731%2C752%2C756%2C765' },
    { name: 'life radio', url: 'https://liferadio.streamabc.net/lfr-lr-mp3-192-7172638?sABC=67881rq3%231%23r22pn472s21qo97n3o8r27367p70o6s5%23jrofrvgr&pkey=web-liferadio-at&tcstring=CQLRckAQLRckAAFADBDEBYFgAAAAAAAAAACYAAAAAAFBoAMAAQPeEQAYAAge8KgAwABA94ZABgACB7w6ADAAED3ikAGAAIHvEIAMAAQPeJQAYAAge8EgAwABA94tABgACB7w.YAAAAAAAAAAA&listenerid=e22ca472f21db97a3b8e27367c70b6f5&awparams=companionAds:true&aw_0_1st.version=1.3.1:html5&aw_0_1st.playerid=webseite&aw_0_1st.skey=1736974031&1736974031256=&amsparams=playerid:webseite;skey:1736974035' }
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

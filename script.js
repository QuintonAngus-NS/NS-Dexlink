// --- ELEMENT REFERENCES ---
const submitBtn = document.getElementById('submitBtn');
const detailsWrapper = document.getElementById('detailsWrapper');
const loadingWrapper = document.getElementById('loadingWrapper');
const screenWrapper = document.getElementById('screenWrapper');

// --- LOGIN BUTTON HANDLER ---
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    detailsWrapper.style.display = 'none';
    screenWrapper.style.alignItems = 'center';
    loadingWrapper.style.display = 'flex';
    document.getElementById('loadingText').innerHTML = 'Redirecting to Dexcom Login';

    // EU PRODUCTION LOGIN URL
    window.location.href =
    "https://api.dexcom.eu/v2/oauth2/login" +
    "?client_id=ctT7YimKIZHQ4cC7g9j4EWtq7MQVR63y" +
    "&redirect_uri=https://dexlink-server-808702537090.europe-west1.run.app/callBack" +
    "&response_type=code" +
    "&scope=offline_access";

});

// --- FETCH GLUCOSE DATA FROM BACKEND ---
async function fetchGlucoseData() {
    const response = await fetch(
        'https://dexlink-server-808702537090.europe-west1.run.app/currentGlucose'
    );

    const currantGlucose = await response.json();
    console.log(currantGlucose);

    // Convert mg/dL → mmol/L
    const value = currantGlucose.value;
    const mmol = (value / 18).toFixed(1);

    document.getElementById('currentReading').innerHTML =
        `${mmol}<span id="dataTypeText">mmol/l</span>`;

    // Trend arrows
    const trendToIcon = {
        doubleUp: "↑↑",
        singleUp: "↑",
        fortyFiveUp: "↗",
        flat: "→",
        fortyFiveDown: "↘",
        singleDown: "↓",
        doubleDown: "↓↓"
    };

    const trendIcon = trendToIcon[currantGlucose.trend] || "→";
    document.getElementById('trendArrow').innerHTML = trendIcon;

    // Trend rate
    document.getElementById('trendDetails').innerHTML =
        `<b>Trend Rate: </b>${currantGlucose.trendRate}<span class="trendChangeMMOL">mmol/l/min</span>`;

    // Transmitter generation
    document.getElementById('transmitterGen').innerHTML =
        `<b>Transmitter Generation: </b>${currantGlucose.transmitterGeneration}`;

    return true;
}

// --- INITIALIZATION ---
async function init() {
    const params = new URLSearchParams(window.location.search);

    if (params.get("loggedIn") === "true") {
        // Hide login screen
        detailsWrapper.style.display = "none";

        // Show loading screen
        screenWrapper.style.alignItems = 'center';
        loadingWrapper.style.display = "flex";
        document.getElementById('loadingText').innerHTML = 'Loading API data';

        // Fetch glucose data
        await fetchGlucoseData();

        // Show data
        loadingWrapper.style.display = 'none';
        screenWrapper.style.alignItems = 'start';
        document.getElementById('dataWrapper').style.display = 'flex';
    }
}

init();
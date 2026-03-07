const submitBtn = document.getElementById('submitBtn')
const detailsWrapper = document.getElementById('detailsWrapper')
const loadingWrapper = document.getElementById('loadingWrapper')
const screenWrapper = document.getElementById('screenWrapper')

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    detailsWrapper.style.display = 'none'
    screenWrapper.style.alignItems = 'center'
    loadingWrapper.style.display = 'flex'
    document.getElementById('loadingText').innerHTML = 'Redirecting to Dexcom Login'

    window.location.href = 'https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=GiIF7R1az0aDCTZGiqcMzRCem88RN2vk&redirect_uri=https://dexlink-server-808702537090.europe-west1.run.app/callBack&response_type=code&scope=offline_access'

})

async function fetchGlucoseData() {
    const response = await fetch('https://dexlink-server-808702537090.europe-west1.run.app/currentGlucose')
    const currantGlucose = await response.json()
    const value = currantGlucose.value
    const mmol = (value / 18).toFixed(1)
    
    const mmolValue = document.getElementById('currentReading')

    mmolValue.innerHTML = `${mmol}<span id="dataTypeText">mmol/l</span>`

    const trendToIcon = {
    doubleUp: "↑↑",
    singleUp: "↑",
    fortyFiveUp: "↗",
    flat: "→",
    fortyFiveDown: "↘",
    singleDown: "↓",
    doubleDown: "↓↓"
    }

    const mmolArrow = document.getElementById('trendArrow')

    console.log(currantGlucose)

    const trendIcon = trendToIcon[currantGlucose.trendRate]

    mmolArrow.innerHTML = trendIcon

    return true
}
async function init() {
    const params = new URLSearchParams(window.location.search);

    if (params.get("loggedIn") === "true") {
        // Hide login screen
        detailsWrapper.style.display = "none";

        // Show loading screen
        screenWrapper.style.alignItems = 'center'
        loadingWrapper.style.display = "flex";
        document.getElementById('loadingText').innerHTML = 'Loading API data'

        // Start fetching glucose data
        await fetchGlucoseData();
        loadingWrapper.style.display = 'none'
        screenWrapper.style.alignItems = 'start'
        document.getElementById('dataWrapper').style.display = 'flex'
}
}

init()



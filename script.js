const submitBtn = document.getElementById('submitBtn')
const detailsWrapper = document.getElementById('detailsWrapper')
const loadingWrapper = document.getElementById('loadingWrapper')
const screenWrapper = document.getElementById('screenWrapper')

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    detailsWrapper.style.display = 'none'
    screenWrapper.style.alignItems = 'center'
    loadingWrapper.style.display = 'flex'

    window.location.href = 'https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=GiIF7R1az0aDCTZGiqcMzRCem88RN2vk&redirect_uri=https://dexlink-server-808702537090.europe-west1.run.app/callBack&response_type=code&scope=offline_access'

})

const params = new URLSearchParams(window.location.search);

if (params.get("loggedIn") === "true") {
    // Hide login screen
    detailsWrapper.style.display = "none";

    // Show loading screen
    screenWrapper.style.alignItems = 'center'
    loadingWrapper.style.display = "flex";

    // Start fetching glucose data
    fetchGlucoseData();
}

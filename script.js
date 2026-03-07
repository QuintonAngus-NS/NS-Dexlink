const submitBtn = document.getElementById('submitBtn')
const detailsWrapper = document.getElementById('detailsWrapper')
const loadingWrapper = document.getElementById('loadingWrapper')
const screenWrapper = document.getElementById('screenWrapper')

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    detailsWrapper.style.display = 'none'
    screenWrapper.style.alignItems = 'center'
    loadingWrapper.style.display = 'flex'

    window.location.href = 'https://sandbox-api.dexcom.eu'

})
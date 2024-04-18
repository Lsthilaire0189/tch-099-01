const urlParams = new URLSearchParams(window.location.search);
const recetteId = urlParams.get('no');

async function getInfo()
{
    if (recetteId) {
        const request = `/projet1/api/recette/${recetteId}`;
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                addInfo(data);
            } else {
                console.error('API request failed:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        console.error('No number provided.');
    }
}
async function addInfo(data)
{
    
}
const btnConnexion = document.querySelector('#idBtnConn')
const uName = sessionStorage.getItem('username')
btnConnexion.innerHTML = "Retour a votre compte: " + uName
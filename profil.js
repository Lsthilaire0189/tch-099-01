const urlParams = new URLSearchParams(window.location.search);
const mail = urlParams.get('chef');

getInfoChef();
console.log(mail);

async function getInfoChef() {
        const request = `/projet1/api/modifierCompte/${mail}`;
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                addInfoChef(data);
                console.log("test");
            } else {
                console.error('API request failed:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
  }

function addInfoChef(data){
    const nom =document.querySelector('#nom');
    nom.textContent= data.prenom + " " + data.nomDeFamille;

    const username =document.querySelector('#username');
    username.textContent= data.username;
  }
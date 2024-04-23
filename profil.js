const urlParams = new URLSearchParams(window.location.search);
const mail = urlParams.get('chef');

getInfoChef();
console.log(mail);
getRecetteChef();

const ulElement = document.getElementById("liste");

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

async function getRecetteChef(){
    const request = `/projet1/api/recetteChef/${mail}`;
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                addRecetteChef(data);
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

  function addRecetteChef(data){
      if(data.length===0)
      {
          const recetteFiche= document.createElement('li');
          recetteFiche.textContent = "Ce chef n'a toujours pas ";
          ulElement.append(recetteFiche);
      }
      else{
          data.forEach(recette => {
              const recetteFiche= document.createElement('li');
              const nomRecette= document.createElement('a');
              nomRecette.textContent = recette.nom;
              nomRecette.href= "./recette.html?no="+recette.id;
              const chef = document.createElement('a');
              chef.textContent = "Chef " + nom.textContent;
              const img = document.createElement('img');
              img.src = recette.src;
              recetteFiche.append(nomRecette, chef, img);
              ulElement.append(recetteFiche);
          });
      }
  } 
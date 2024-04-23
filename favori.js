function getUtilisateur(){
    if(sessionStorage.getItem('email')==null)
    {
        confirm("Vous n'êtes pas connecté! Veuillez vous connecter.")
        window.location.href='loginPage.html';
    }
}
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload(); 
    }
};

getUtilisateur();

const email= sessionStorage.getItem("email")
getFavori();
const ulElement = document.getElementById("liste");
function addElements(data)
{
    if(data.length===0)
    {
        const recetteFiche= document.createElement('li');
        recetteFiche.textContent = "Vous n'avez aucune recette dans vos favoris";
        ulElement.append(recetteFiche);
    }
    else{
        data.forEach(recette => {
            const recetteFiche= document.createElement('li');
            const nomRecette= document.createElement('a');
            nomRecette.textContent = recette.nom;
            nomRecette.href= "./recette.html?no="+recette.id;
            const chef = document.createElement('a');
            chef.textContent = "Chef " + recette.prenom;
            chef.href = "./profil.html?chef=" + recette.email;
            const img = document.createElement('img');
            img.src = recette.src;
            recetteFiche.append(nomRecette, chef, img);
            ulElement.append(recetteFiche);
        });
    }
}
async function getFavori() {
    const response = await fetch(`/projet1/api/favori/${email}`);
    const favori = await response.json();
    addElements(favori);
}
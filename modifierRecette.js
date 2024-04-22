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


const urlParams = new URLSearchParams(window.location.search);
const recetteId = urlParams.get('no');
getInfo();

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
    const nom = document.getElementById("nom");
    const pays = document.getElementById("origine");
    const regime = document.getElementById("regime");
    const typeAliment = document.getElementById("type");
    const description = document.getElementById("description");
    const recette = document.getElementById("recette");
    const img = document.getElementById("img");
    const email= sessionStorage.getItem('email');
    const ingredients = document.getElementById("ingredient");
    const tempsPreparation =document.getElementById("tempsPreparation");
    const tempsCuisson = document.getElementById("tempsCuisson");
    const portion = document.getElementById("portion");
    nom.value = data.nom;
    pays.value = data.origine;
    regime.value = data.regime;
    typeAliment.value = data.type;
    description.value = data.description;
    recette.value = data.etape;
    img.value = data.src;
    ingredients.value = data.ingredients;
    tempsPreparation.value = data.preparation;
    tempsCuisson.value = data.cuisson;
    portion.value = data.portion;
    
}
document.querySelector("#btnSend").addEventListener("click", async()=>{
    if (confirm("Voulez-vous sauvegarder votre recette?")) {
        const nom = document.getElementById("nom").value;
        const pays = document.getElementById("origine").value;
        const regime = document.getElementById("regime").value;
        const typeAliment = document.getElementById("type").value;
        const description = document.getElementById("description").value;
        const recette = document.getElementById("recette").value;
        const img = document.getElementById("img").value;
        const email= sessionStorage.getItem('email');
        const ingredients = document.getElementById("ingredient").value.split(",");
        const tempsPreparation =parseInt( document.getElementById("tempsPreparation").value);
        const tempsCuisson =parseInt( document.getElementById("tempsCuisson").value);
        const portion = parseInt( document.getElementById("portion").value);
        const id = parseInt( recetteId);


    
        if(nom!=null&&pays!=null&&regime!=null&&typeAliment!=null&&description!=null&&recette!=null&&img!=null&&email!=null&&ingredients!=null&&tempsPreparation!=null&&tempsCuisson!=null&&portion!=null){
            const newrecette={nom, pays, regime, typeAliment, description, recette, img, email,ingredients,tempsPreparation,tempsCuisson,portion, id };
            const response= await fetch("/projet1/api/modifierRecette",{
                method:"POST",
                headers:{
                    "Content-Type":"application"
                },
                body:JSON.stringify(newrecette),
            } );
            if(response.ok)
            {
                confirm("Votre recette est enregistrée.");
                window.location.href = 'pageUtilisateur.html';
            }
            else{
                alert("Erreur lors de l'enregistrement");
            }
        }
        
    }
})

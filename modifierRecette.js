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
    const list= document.getElementById("list");
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
    tempsPreparation.value = data.preparation;
    tempsCuisson.value = data.cuisson;
    portion.value = data.portion;
    for (let i = 0; i < data.ingredients.length; i++) {
        const list = document.getElementById("list");
        const li = document.createElement("li");
        const textarea = document.createElement("textarea");
        textarea.setAttribute("class", "ingredient");
        textarea.value = data.ingredients[i];
        const textarea2= document.createElement("textarea");
        textarea2.setAttribute("class", "quantite");
        textarea2.value = data.quantite[i];
        li.appendChild(textarea);
        li.appendChild(textarea2);
        list.appendChild(li);
    
}
document.querySelector("#btnAdd").addEventListener("click", async()=>{

    const list = document.getElementById("list");
    const li = document.createElement("li");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("class", "ingredient");
    const textarea2= document.createElement("textarea");
    textarea2.setAttribute("class", "quantite");
    li.appendChild(textarea);
    li.appendChild(textarea2);
    list.appendChild(li);
  });

document.querySelector("#btnRemove").addEventListener("click", async()=>{
const list = document.getElementById("list");
if(list.children.length>0){
    list.removeChild(list.lastChild);
}
});

document.querySelector("#btnSend").addEventListener("click", async()=>{
    if (confirm("Voulez-vous sauvegarder votre recette?")) {
        const nom = document.getElementById("nom").value;
        const origine = document.getElementById("origine").value;
        const regime = document.getElementById("regime").value;
        const type = document.getElementById("type").value;
        const description = document.getElementById("description").value;
        const recette = document.getElementById("recette").value;
        const img = document.getElementById("img").value;
        const email= sessionStorage.getItem('email');
        const tempsPreparation =document.getElementById("tempsPreparation").value;
        const tempsCuisson =document.getElementById("tempsCuisson").value;
        const portion = document.getElementById("portion").value;
        const id = parseInt( recetteId);

        const listItems = document.querySelectorAll("#list li textarea.ingredient");
        const ingredients = [];
        listItems.forEach((item) => {
          ingredients.push(item.value.toLowerCase());
        });
        console.log("Data in each item:", ingredients);
        const listItems2 = document.querySelectorAll("#list li textarea.quantite");
        const quantite= [];
        listItems2.forEach((item) => {
          quantite.push(item.value.toLowerCase());
        });
        console.log("Data in each item:", quantite);

        if(nom!=null&&description!=null&&recette!=null&&img!=null&&email!=null&&ingredients!=null&&tempsPreparation!=null&&tempsCuisson!=null&&portion!=null&&quantite!=null&&ingredients.length==quantite.length){
            const newrecette={nom, origine, regime, type, description, recette, img, email,ingredients,tempsPreparation,tempsCuisson,portion, id, quantite};
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
document.querySelector("#btnDelete").addEventListener("click", async()=>{
    if (confirm("Voulez-vous supprimer votre recette?")) {
        const id = parseInt( recetteId);
        const response= await fetch("/projet1/api/supprimerRecette",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify({id}),
        } );
        if(response.ok)
        {
            confirm("Votre recette est supprimée.");
            window.location.href = 'pageUtilisateur.html';
        }
        else{
            alert("Erreur lors de la suppression");
        }
    }
})}

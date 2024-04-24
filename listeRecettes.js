
const ulElement = document.getElementById("liste");
const bouton = document.getElementById("recherche");
bouton.addEventListener('click',filtrer);
filtrer();
async function filtrer()
{
    
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }
    const choixOrigine= document.getElementById("origine");
    const origine= choixOrigine.options[choixOrigine.selectedIndex].value;
    const choixRegime= document.getElementById("regime");
    const regime = choixRegime.options[choixRegime.selectedIndex].value;
    const choixType = document.getElementById("type");
    const type= choixType.options[choixType.selectedIndex].value;
    const ingredients = document.getElementById("ingredients").value.split(",");
    let filtre={origine,regime,type,ingredients};
    
    try{
        const response = await fetch("/projet1/api/filtrer",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(filtre),
        } );
        const data = await response.json();
        addElements(data);
    }
    catch(error)
    {

    }
}
function addElements(data)
{
    if(data.length===0)
    {
        const recetteFiche= document.createElement('li');
        recetteFiche.textContent = "Aucune recette ne correspond à votre recherche";
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
            chef.href= "./profil.html?chef="+recette.email;
            const frame = document.createElement('a');
            frame.href = "./recette.html?no="+recette.id;
            const img = document.createElement('img');
            img.src = recette.src;
            frame.append(img)
            recetteFiche.append(nomRecette, chef, frame);
            ulElement.append(recetteFiche);
        });
    }
}
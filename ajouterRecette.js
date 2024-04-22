

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
        const tempsPreparation = document.getElementById("tempsPreparation").value;
        const tempsCuisson =document.getElementById("tempsCuisson").value;
        const portion = document.getElementById("portion").value;
    
        if(nom!=null&&pays!=null&&regime!=null&&typeAliment!=null&&description!=null&&recette!=null&&img!=null&&email!=null&&ingredients!=null&&tempsPreparation!=null&&tempsCuisson!=null&&portion!=null){
            const newrecette={nom, pays, regime, typeAliment, description, recette, img, email,ingredients,tempsPreparation,tempsCuisson,portion };
            const response= await fetch("/projet1/api/ajouterRecette",{
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
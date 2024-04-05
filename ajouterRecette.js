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
    
        if(nom!=null&&pays!=null&&regime!=null&&typeAliment!=null&&description!=null&&recette!=null&&img!=null){
            const newrecette={nom, pays, regime, typeAliment, description, recette, img, email };
            const response= await fetch("/projet1/api/ajouterRecette",{
                method:"POST",
                headers:{
                    "Content-Type":"application"
                },
                body:JSON.stringify(newrecette),
            } );
            // if(response.ok)
            // {
            //     confirm("Votre recette est enregistrée.");
            //     window.location.href = 'pageUtilisateur.html';
            // }
        }
        
    }
   
})
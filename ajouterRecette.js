document.querySelector("#btnDeco").addEventListener("click", async()=>{
    sessionStorage.removeItem('username')
    window.location.href='/projet1/index.php'
})

document.querySelector("#btnSend").addEventListener("click", async()=>{
    if (confirm("Voulez-vous sauvegarder votre recette?")) {
        const nom = document.getElementById("nom").value;
        const pays = document.getElementById("pays").value;
        const regime = document.getElementById("regime").value;
        const typeAliment = document.getElementById("typeAliment").value;
        const description = document.getElementById("description").value;
        const ingredient = document.getElementById("ingredient").value;
        const recette = document.getElementById("recette").value;
        const img = document.getElementById("img").value;
        const email= sessionStorage.getItem('email');
    
        if(nom!=null&&pays!=null&&regime!=null&&typeAliment!=null&&description!=null&&ingredient!=null&&recette!=null&&img!=null){
            const newrecette={nom, pays, regime, typeAliment, description, ingredient, recette, img, email };
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
        }
        
    }
   
})
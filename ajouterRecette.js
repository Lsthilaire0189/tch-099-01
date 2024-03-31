document.querySelector("#btnDeco").addEventListener("click", async()=>{
    sessionStorage.removeItem('username')
    window.location.href='/projet1/index.php'
})

document.querySelector("#btnSend").addEventListener("click", async()=>{
    const nom = document.getElementById("nom").value;
    const pays = document.getElementById("pays").value;
    const regime = document.getElementById("regime").value;
    const typeAliments = document.getElementById("typesAliments").value;
    const description = document.getElementById("description").value;
    const ingredients = document.getElementById("ingredients").value;
    const recette = document.getElementById("recette").value;
    const img = document.getElementById("img").value;

    if(nom!=null&&pays!=null&&regime!=null&&typeAliments!=null&&description!=null&&ingredients!=null&&recette!=null&&img!=null){
        const newrecette={nom, pays, regime, typeAliments, description, ingredients, recette, img};
        const response= await fetch("/projet1/api/connexion",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(newrecette),
        } );
        
    }
})
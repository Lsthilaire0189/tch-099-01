

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
        const pays = document.getElementById("origine").value;
        const regime = document.getElementById("regime").value;
        const typeAliment = document.getElementById("type").value;
        const description = document.getElementById("description").value;
        const recette = document.getElementById("recette").value;
        const img = document.getElementById("img").value;
        const email= sessionStorage.getItem('email');
        // const ingredients = document.getElementById("ingredient").value.split(",").map(item => item.trim());
        const tempsPreparation = document.getElementById("tempsPreparation").value;
        const tempsCuisson =document.getElementById("tempsCuisson").value;
        const portion = document.getElementById("portion").value;
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
    
        if(nom!=null&&pays!=null&&regime!=null&&typeAliment!=null&&description!=null&&recette!=null&&img!=null&&email!=null&&ingredients!=null&&tempsPreparation!=null&&tempsCuisson!=null&&portion!=null&&quantite!=null&&ingredients.length==quantite.length){
            const newrecette={nom, pays, regime, typeAliment, description, recette, img, email,ingredients,quantite,tempsPreparation,tempsCuisson,portion };
            const response= await fetch("/projet1/api/ajouterRecette",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newrecette),
            } );
            if(response.ok){
                const responseData = await response.json();
                if(responseData.message == "Success"){
                    confirm("Votre recette est enregistrée.");
                    window.location.href = 'pageUtilisateur.html';
                }
                else{
                    alert(responseData.error);
                }
            }
            else{
                alert("Erreur lors de l'enregistrement");
            }
        }
        
    }
})
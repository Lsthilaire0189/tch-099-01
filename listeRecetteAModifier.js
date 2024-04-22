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


const ulElement = document.getElementById("liste");
filtrerUser();
async function filtrerUser()
{
    const emailUser = sessionStorage.getItem("email");
    const compte={emailUser};
    try {
        const response =await fetch("/projet1/api/filtrerUser",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(compte),
        });
        const data = await response.json();
        addElements(data);
    } catch (error) {
        
    }
}
function addElements(data)
{
    data.forEach(recette => {
        const recetteFiche= document.createElement('li');
        const nomRecette= document.createElement('a');
        nomRecette.textContent = recette.nom;
        nomRecette.href= "./modifierRecette.html?no="+recette.id;
        const img = document.createElement('img');
        img.src = recette.src;
        recetteFiche.append(nomRecette,img);
        ulElement.append(recetteFiche);
    });
}
const btnConnexion = document.querySelector('#idBtnConn')
const uName = sessionStorage.getItem('username')
btnConnexion.innerHTML = "Retour a votre compte: " + uName
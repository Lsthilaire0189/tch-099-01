const btnConnexion = document.querySelector('#idBtnConn')
const uName = sessionStorage.getItem('username')
if(uName != null){
    btnConnexion.innerHTML = "Retour a votre compte: " + uName
    btnConnexion.href = "pageUtilisateur.html"
}
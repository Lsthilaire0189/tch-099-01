if(sessionStorage.getItem("email") !== null){
    document.querySelector("#btnDeco").remove()
    document.querySelector("#lienHome").href = './pageUtilisateur.html'
}
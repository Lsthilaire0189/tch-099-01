function getUtilisateur(){
    const msgAccueil =document.getElementById("accueil")
    const str1= "Bonjour ";
    const str2= localStorage.getItem("username")
    const str3= "! Que souhaitez-vous faire aujourd'hui?"
    msgAccueil.append(str1,str2,str3);
}
getUtilisateur();
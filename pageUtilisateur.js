document.querySelector("#btnDeco").addEventListener("click", async()=>{
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('email')
    window.location.href='/projet1/index.php'
})

function getUtilisateur(){
    if(sessionStorage.getItem('email')!=null||sessionStorage.getItem('username')!=null)
    {
        const msgAccueil =document.getElementById("accueil")
        const str1= "Bonjour ";
        const str2= sessionStorage.getItem("username")
        const str3= "! Que souhaitez-vous faire aujourd'hui?"
        msgAccueil.append(str1,str2,str3);  

    }
    else{
        window.location.href='loginPage.html';
    }
    
}
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload(); 
    }
};
getUtilisateur();
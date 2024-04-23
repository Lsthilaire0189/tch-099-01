document.querySelector("#btnConnexion").addEventListener("click",async()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email!=null&&password!=null)
    {
        const compte= {email, password};
        const response= await fetch("/projet1/api/connexion",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(compte),
        } );
        const responseData= await response.json();
        if(responseData.connexion=="Connexion réussie")
        {
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('username',responseData.username);
            window.location.href='/projet1/pageUtilisateur.html';
        }
        if(responseData.connexion=="faux")
        {
            alert("Email ou mot de passe incorrect");
        }

    }
    else{
    }
});
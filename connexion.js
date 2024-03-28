document.querySelector("#btnConnexion").addEventListener("click",async()=>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username!=null&&password!=null)
    {
        const compte= {username, password};
        const response= await fetch("/projet1/api/connexion",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(compte),
        } );
        const responseData= await response.json();
        if(responseData.connexion=="vrai")
        {
            localStorage.setItem('username',username);
            console.log('allo');
            window.location.href='/projet1/pageUtilisateur.html';
        }

    }
    else{

    }



});
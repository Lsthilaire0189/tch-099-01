getDonnes();
async function getDonnes(){
    var mail = sessionStorage.getItem("email")
    const request = `/projet1/api/modifierCompte/${mail}`;
      try {
          const response = await fetch(request);
          if (response.ok) {
              const data = await response.json();
              remplireForm(data);
              
          } else {
              console.error('API request failed:', response.status);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
}
function remplireForm(data){
    document.getElementById('prenom').value = data.prenom
    document.getElementById('nomFamille').value = data.nomDeFamille
    document.getElementById('dateNaissance').value = data.dateDeNaissance
    document.getElementById('email').value = data.email
    document.getElementById('email').disabled = true
    document.getElementById('username').value = data.username
    document.getElementById('password').value = data.password
}
document.getElementById('modifyAccount').addEventListener("click", async()=>{
    const docPrenom = document.getElementById('prenom').value
    const docNomFamille = document.getElementById('nomFamille').value
    const docDateNaissance = document.getElementById('dateNaissance').value
    const docMail = document.getElementById('email').value
    const docUsername = document.getElementById('username').value
    const docPassword = document.getElementById('password').value
    
    if(docPrenom!=null&&docNomFamille!=null&&docDateNaissance!=null&&docMail!=null&&docUsername!=null&&docPassword!=null){
        const compte = {docPrenom, docNomFamille, docDateNaissance, docMail, docUsername, docPassword}
        const rep = await fetch("/projet1/api/pushModification",{
            method:"POST",
            headers:{
                "Content-Type":"application"
            },
            body:JSON.stringify(compte)
        })
        sessionStorage.setItem("email", docMail)
        sessionStorage.setItem("username", docUsername)
    }
})
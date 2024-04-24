const mesRep = document.createElement("p");
const body = document.getElementById("resForm")
document.querySelector("#createSubmit").addEventListener("click", async ()=>{
  const nom = document.getElementById("nomFamille").value;
  const prenom = document.getElementById("prenom").value;
  const dateNaissance = document.getElementById("dateNaissance").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  if (!nom || !prenom || !dateNaissance || !email || !password || !username) {
    confirm("Erreur dans le formulaire : information manquante");
  }
  else {
    const compte = { nom, prenom, dateNaissance, email, password, username };
    try {
      const response = await fetch("https://equipe500.tch099.ovh/projet1/api/ajouterCompte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compte),
      });

      if (!response.ok) {
        throw new Error("Failed to add account: " + response.status);
      }
      const responseData = await response.json();
      if(responseData.message != "Compte créé avec succès"){
        confirm("Erreur lors de la création du compte : " + responseData.message);
      }
      else{
        confirm("Votre compte est enregistré.");
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("username", username);
        window.location.href = 'pageUtilisateur.html';
      }
    }
    catch (error) {
      console.log("Error:", error.message);
    }
  }
})
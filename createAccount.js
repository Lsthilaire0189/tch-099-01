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
    mesRep.innerHTML = "Erreur dans le formulaire : information manquante"
    body.appendChild(mesRep)
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
      console.log(responseData.message);
      mesRep.innerHTML = responseData.message;
      body.appendChild(mesRep)
    }
    catch (error) {
      console.log("Error:", error.message);
    }
  }
})
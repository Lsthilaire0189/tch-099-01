
const message = document.createElement("p");
const body = document.querySelector(".loginBody");

document.querySelector("#createSubmit").addEventListener("click", async () => {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const dateNaissance = document.getElementById("dateDeNaissance").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    if (!nom || !prenom || !dateNaissance || !email || !password || !username) {
      message.textContent = "Erreur dans le formulaire : information manquante";
      body.appendChild(message);
      return;
    }

    const compte = { nom, prenom, dateNaissance, email, password, username };
    try {
      const response = await fetch("http://localhost/api/compte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compte),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      console.log("Data sent successfully!");
      message.textContent = "Votre compte a été créé!";
      body.appendChild(message);
    } catch (error) {
      message.textContent = "Erreur lors de l'envoi des données";
      body.appendChild(message);
      return;
    }
  });
const message = document.createElement("p");
const body = document.querySelector(".loginBody");
document.querySelector("#createSubmit").addEventListener("click", async () => {
    console.log("test test test 1");
    const nom = document.getElementById("nomFamille").value;
    const prenom = document.getElementById("prenom").value;
    const dateNaissance = document.getElementById("dateNaissance").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    

    if (!nom || !prenom || !dateNaissance || !email || !password || !username) { //peut etre enlever 2 verif
      message.textContent = "Erreur dans le formulaire : information manquante";
      body.appendChild(message);
      console.log("test test test 2");
      return;
    }
 
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
          console.log(responseData.message); // Assuming your PHP script returns a 'message' property in the JSON response
        
        } catch (error) {
          console.log("Error:", error.message);
        }
        // // try {
        //   // Send a POST request with JSON data to the server
        //   const response = await fetch("projet1/api/ajouterCompte", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(compte),
        //   });
          
        //   // Check if the request was successful
        //   if (!response.ok) {
        //     console.log("test test test 3");
        //     throw new Error("Failed to send data");
        //   }
        
        //   // Display success message  
        //   const reponseTxt = await response.json();
        //   console.log(reponseTxt.message);
          // const reussis = document.createElement('p');
          // reussis.append(reponseTxt.message);
          // document.querySelector("body").append(reussis);
        // } catch (error) {
        //   // Handle any errors that occur during the fetch operation
        //   const message = document.createElement('p');
        //   message.textContent = error;
        //   document.body.appendChild(message);
        //   console.log("test test test 4");
        // }
    })
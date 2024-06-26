const urlParams = new URLSearchParams(window.location.search);
const recetteId = urlParams.get('no');
const email = sessionStorage.getItem("email")
const username = sessionStorage.getItem("username")
getInfo();
getAvis();
getAvisUtilisateur();

if (email == null || username == null) {
  var items = document.querySelectorAll('#interactionsRecette');
  items.forEach(function (item) {
    item.remove();
  });
  var section = document.querySelector('.posEval');
  var indice = document.createElement('p').textContent = "Vous devez être connecté pour interagir avec la recette"
  section.append(indice);
}
else {
  activerInteractions();

}

fetchRatings(recetteId)
  .then(ratings => {
    const averageRating = calculateAverageRating(ratings);
    console.log('Average Rating:', averageRating);
    console.log(recetteId)
    console.log(email)
  })
  .catch(error => {
    console.error('Error:', error);
  });


async function getInfo() {
  if (recetteId) {
    const request = `/projet1/api/recette/${recetteId}`;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const data = await response.json();
        addInfo(data);
        console.log(data)
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    console.error('No number provided.');
  }
}

async function getAvis() {
  if (recetteId) {
    try {
      const response = await fetch(`/projet1/api/ratings/${recetteId}`);
      if (response.ok) {
        const avis = await response.json();
        addCommentToPage(avis);
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    console.error('No number provided.');
  }
}

function addInfo(data) {
  const titre = document.querySelector('#nomRecette');
  titre.textContent = data.nom;

  const ori = document.querySelector('#origine')
  ori.append(data.origine)
  if(data.origine == ""){
    ori.append("aucuneorigine")
  }

  const reg = document.querySelector('#regime')
  reg.append(data.regime);
  if(data.regime == ""){
    reg.append("aucunregime")
  }

  const ty = document.querySelector('#type')
  ty.append(data.type);
  if(data.type == ""){
    ty.append("aucuntype")
  }

  const image = document.querySelector('#image_recette');
  image.src = data.src;

  const tmpCuisson = document.querySelector('#tempsCuisson');
  tmpCuisson.append(data.cuisson)


  const tmpPreparation = document.querySelector('#tempsPreparation');
  tmpPreparation.append(data.preparation)

  const portion = document.querySelector('#portion');
  portion.append(data.portion)


  const description = document.querySelector('#description');
  description.textContent = data.description;

  const ingredients = document.querySelector('#ingredients');
  for(let i=0; i<data.ingredients.length; i++){
    const li = document.createElement('li');
    li.textContent = data.quantite[i]+" "+ data.ingredients[i]
    ingredients.appendChild(li);
  };

  const instruction = document.querySelector('#instructions');
  instruction.innerHTML = data.etape.replace(/\n/g, '<br>');

}
const commentaire = document.getElementById("commentaire").value;
  const rating = document.getElementById("ratingValue").value;
document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  const ratingValue = document.getElementById('ratingValue');
  
  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      const rating = parseInt(star.getAttribute('data-value'));
      ratingValue.value = rating;
      setRating(rating);

      stars.forEach(function (s, index) {
        s.classList.toggle('active', index < rating);
      });
    });

    star.addEventListener('mouseover', function () {
      const rating = parseInt(star.getAttribute('data-value'));
      highlightStars(rating);
    });

    star.addEventListener('mouseout', function () {
      const currentRating = parseInt(getRating());
      highlightStars(currentRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(function (star) {
      const starValue = parseInt(star.getAttribute('data-value'));
      star.classList.toggle('active', starValue <= rating);
    });
  }

  function getRating() {
    return document.querySelector('.stars').getAttribute('data-rating');
  }

  
});
function setRating(rating) {
    document.querySelector('.stars').setAttribute('data-rating', rating);
  }


async function fetchRatings(recetteId) {
  try {
    const response = await fetch(`/projet1/api/ratings/${recetteId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ratings');
    }
    const ratings = await response.json();
    return ratings;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return [];
  }
}

function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0;
  }
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

function activerInteractions() {
  document.querySelector("#avisSubmit").addEventListener("click", async () => {
    let statut = await getAvisUtilisateur();
    const commentaire = document.getElementById("commentaire").value;
    const rating = document.getElementById("ratingValue").value;
    if(statut ==true){
      if (rating != 0 || commentaire != null || commentaire != "") {
        const avis = { recetteId, email, commentaire, rating }
        try {
          const response = await fetch("/projet1/api/updateRatings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(avis),
          });
          if (!response.ok) {
            throw new Error("Failed to send data");
          }
          const responseData = await response.json();
          showSnackbar(responseData.message);
          location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    } else{
    if (rating != 0 || commentaire != null || commentaire != "") {
      const avis = { recetteId, email, commentaire, rating, username }
      try {
        const response = await fetch("/projet1/api/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(avis),
        });
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        const responseData = await response.json();
        showSnackbar(responseData.message);
        location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }
  })
  
  
document.querySelector("#addFavori").addEventListener("click", async () => {
  let statut = await getEstFavoris();
    if (statut == true) {
      const favori = { email, recetteId };
      try {
        const response = await fetch("/projet1/api/enleverFavoris", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },    
          body: JSON.stringify(favori),
        });
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        const responseData = await response.json();
        showSnackbar(responseData.message);
        modificationStatut();
      } catch (error) {
        console.error(error);
      }
    }
    else {
      const favori = { email, recetteId };
      try {
        const response = await fetch("/projet1/api/favori", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favori),
        });
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        const responseData = await response.json();
        showSnackbar(responseData.message);
        modificationStatut();

      } catch (error) {
        console.error(error);
      }
    }
  });
}

function showSnackbar(s) {
  var snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = s
  snackbar.className = "show";
  setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000); // Disparaît après 3 secondes
}

function addCommentToPage(commentlist) {
  var commentContainer = document.querySelector(".avis-list_item");
  commentlist.forEach((avis) => {
    var username = document.createElement("a");
    var note = document.createElement("span");
    var commentaire = document.createElement("span");
    var container = document.createElement("div");
    container.classList.add("avis");

    const starSymbolHtml = '\u2605';
    username.textContent = avis.username;
    username.href = `/projet1/profil.html?chef=${avis.userId}`;
    note.textContent = 'note : ' + avis.rating + starSymbolHtml;
    commentaire.textContent = avis.commentaire;

    container.appendChild(username);
    container.appendChild(note);
    container.appendChild(commentaire);

    commentContainer.appendChild(container);
  });
}


async function getEstFavoris() {
  const mail = email
  const recette = recetteId
  if (mail != null) {
    const verif = { mail, recette }
    try {
      const response = await fetch("/projet1/api/estFavoris", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verif),
      });
      const data = await response.json();

      if (data.result == "vrai") {
        console.log("YES")
        return true
      }
      else {
        return false
      }

    } catch (error) {
      console.error(error);
    }
  }
}

async function getAvisUtilisateur(){
  const mail = email
  const recette = recetteId
  if (mail != null) {
    const verif = { mail, recette }
    try {
      const response = await fetch("/projet1/api/ratingUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verif),
      });
      const data = await response.json();

      if (data.result == "vrai") {
        const commentaire = document.getElementById("commentaire");
        commentaire.textContent = data[0].commentaire;
        setRating(data.rating);
        return true
      }
      else {
        return false
      }

    } catch (error) {
      console.error(error);
    }
  }
}

 
async function modificationStatut() {
  const statut = await getEstFavoris();
  if (statut == true) {
    document.querySelector("#addFavori").textContent = "Retirer des favoris"
  }
  else {
    document.querySelector("#addFavori").textContent = "Mettre en favoris"
  }  
  return statut;
}
modificationStatut();

async function modificationAvis() {
  const statut = await getAvisUtilisateur();
  if (statut == true) {
    document.querySelector("#avisSubmit").textContent = "Modifier votre avis"
  }
  else {
    document.querySelector("#avisSubmit").textContent = "Envoyer votre avis"
  }  
  return statut;
}
modificationAvis();
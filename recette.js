const urlParams = new URLSearchParams(window.location.search);
const recetteId = urlParams.get('no');
const email = sessionStorage.getItem("email")
const username = sessionStorage.getItem("username")
getInfo();
getAvis();

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

  const image = document.querySelector('#image_recette');
  image.src = data.src;

  const tmpCuisson = document.querySelector('#tempsCuisson');
  tmpCuisson.append(data.cuisson)


  const tmpPreparation = document.querySelector('#tempsPreparation');
  tmpPreparation.append(data.preparation)

  const portion = document.querySelector('#portion');
  portion.append(data.portion)


  const description = document.querySelector('#description');
  description.textContent = data.Description;

  const ingredients = document.querySelector('#ingredients');
  data.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredients.appendChild(li);
  });

  const instruction = document.querySelector('#instructions');
  instruction.textContent = data.etape;

}

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

  function setRating(rating) {
    document.querySelector('.stars').setAttribute('data-rating', rating);
  }
});



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
    const commentaire = document.getElementById("commentaire").value;
    const rating = document.getElementById("ratingValue").value;
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
        console.log(responseData.message);
        document.getElementById("commentaire").value = "";
        document.getElementById("ratingValue").value = 0;

      } catch (error) {
        console.error(error);
      }
    }
  })

  let statut = getEstFavoris();

  document.querySelector("#addFavori").addEventListener("click", async () => {
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
    var username = document.createElement("span");
    var note = document.createElement("span");
    var commentaire = document.createElement("span");
    var container = document.createElement("div");
    container.classList.add("avis");

    const starSymbolHtml = '\u2605';
    username.textContent = avis.username;
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
      if (response.result === "vrai") {
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

modificationStatut();   
function modificationStatut() {
  let statut = getEstFavoris();
  if (statut == true) {
    document.querySelector("#addFavori").textContent = "Retirer des favoris"
  }
  else {
    document.querySelector("#addFavori").textContent = "Mettre en favoris"
  }  
  return statut;
}

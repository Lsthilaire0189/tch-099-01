const urlParams = new URLSearchParams(window.location.search);
const recetteId = urlParams.get('no');
getInfo();
const email= sessionStorage.getItem("email")
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

function addInfo(data){
  const titre= document.querySelector('#nomRecette');
  titre.textContent=data.nom;

  const image=document.querySelector('#image_recette');
  image.src= data.lienImage;

  const tmpCuisson=document.querySelector('#tempsCuisson');
  

  const tmpPreparation=document.querySelector('#tempsPreparation');


  const description=document.querySelector('#description');
  description.textContent=data.Description;

  const ingredients=document.querySelector('#ingredients');
  ingredients.textContent=data.listeIngredient;
  
  const instruction =document.querySelector('#instructions');
  instruction.textContent=data.etape;

}

document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star');
  const ratingValue = document.getElementById('ratingValue');

  stars.forEach(function(star) {
    star.addEventListener('click', function() {
      const rating = parseInt(star.getAttribute('data-value'));
      ratingValue.value = rating;
      setRating(rating);

      stars.forEach(function(s, index) {
        s.classList.toggle('active', index < rating);
      });
    });

    star.addEventListener('mouseover', function() {
      const rating = parseInt(star.getAttribute('data-value'));
      highlightStars(rating);
    });

    star.addEventListener('mouseout', function() {
      const currentRating = parseInt(getRating());
      highlightStars(currentRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(function(star) {
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

document.querySelector("#avisSubmit").addEventListener("click", async ()=>{
  const commentaire = document.getElementById("commentaire").value;
  const rating = document.getElementById("ratingValue").value;
  if (rating!=0||commentaire!=null||commentaire!=""){
    const avis ={recetteId,email, commentaire, rating}
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
      console.log('ça nenvoie pas')
    }
  }
})


 
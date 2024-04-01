document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star');

  stars.forEach(function(star) {
    star.addEventListener('click', function() {
      const rating = parseInt(star.getAttribute('data-value'));
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


fetchRatings(recetteId)
 .then(ratings => {
   const averageRating = calculateAverageRating(ratings);
   console.log('Average Rating:', averageRating);
 })
 .catch(error => {
   console.error('Error:', error);
 });
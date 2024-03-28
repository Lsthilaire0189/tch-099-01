async function fetchRatings(recetteId) {
    try {
      const response = await fetch(`/api/ratings/${recetteId}`);
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
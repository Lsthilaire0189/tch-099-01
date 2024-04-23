fetchBestRecipe();

async function fetchBestRecipe() {
    const request = `/projet1/api/getBestReview`;
    try {
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            addBestReviews(data);
        } else {
            console.error('API request failed:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

function addBestReviews(data) {
    const section = document.getElementById("listeMeilleuresRecettes");
    for (const recette of data) {
        const recetteItem = document.createElement('li');
        const lienItem = document.createElement('a');
        lienItem.textContent = recette.recette.nom;
        lienItem.href = `./recette.html?no=${recette.recette.id}`;
        const nomChef = document.createElement('span');
        nomChef.textContent = recette.recette.prenom;
        const img = document.createElement('img');
        img.src = recette.recette.src;
        recetteItem.append(lienItem, nomChef, img);
        section.append(recetteItem);
    }
}
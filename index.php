<!--Main menu, d'ici on voit le titre de notre site et on peut créer un compte, se connecter, ou directement parcourir les recettes -->
<!doctype html>
<html>
    <head>
        <title>index.php</title>
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <main>
            <header class="entete">
                <!--Futur bouton en css-->
                <img src="https://i.im.ge/2024/02/28/gvQxly.imagetest-Copie-2.png" alt="Nom du site web" id="imgageEntete">
                <a href="./loginPage.html" class="btnLogin">Connection</a>
            </header>
            <section>
                <section class="sectionImage">
                    <img src="https://i.im.ge/2024/02/28/gvQOwh.imagetest.png" alt="Logo du site web" id="imgSite">
                </section>
                <section class="msgbvn">
                    <span>Bienvenue chez ChefChatter! Ici, vous avez la liberté de partager au monde vos recettes ou de vous inspirez de plusieurs chefs de partout à travers le globle!</span>
                </section>
                <section class="btnMenu">
                    <a href="./createAccount.html">Pas de comptes? Inscrivez-vous ici!</a>
                    <a href="./listeRecettes.html">Parcourir les recettes!</a>
                </section>
            </section>
            <section class="ftrMenu">
                <h1>Recettes favoris de nos utilisateurs!</h1>
                <ul>
                    <li><a href="./recette.html?no=1">Soupe aux tomates</a><span>Chef Thom</span><img src="https://assets.shop.loblaws.ca/products/20707829/b1/fr/front/20707829_front_a01_@2.png"</li>
                    <li><a href="./recette.html?no=2">Sauté de crevettes</a><span>Chef Pierre</span><img src="https://assets.shop.loblaws.ca/products/20707829/b1/fr/front/20707829_front_a01_@2.png"</li>
                    <li><a href="./recette.html?no=3">Toast au pommes</a><span>Chef Albert</span><img src="https://assets.shop.loblaws.ca/products/20707829/b1/fr/front/20707829_front_a01_@2.png"</li>
                    <li><a href="./recette.html?no=4">Burger Américain</a><span>Chef Fred</span><img src="https://assets.shop.loblaws.ca/products/20707829/b1/fr/front/20707829_front_a01_@2.png"</li>
                </ul>
            </section>
        </main>
    </body>
    <footer class="footerMenu"></footer>
</html>
<!DOCTYPE html>
<html>
    <head>
        <title>index.php</title>
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <main>
            <header class="entete">
                <!-- Futur bouton en css -->
                <img src="https://i.im.ge/2024/02/28/gvQxly.imagetest-Copie-2.png" alt="Nom du site web" id="imgageEntete">
                <a id ="idBtnConn" href="./pageUtilisateur.html" class="btnLogin">Mon compte</a>
            </header>
            <section>
                <section class="sectionImage">
                    <img src="https://i.im.ge/2024/02/28/gvQOwh.imagetest.png" alt="Logo du site web" id="imgSite">
                </section>
                <section class="msgbvn">
                    <span>Bienvenue chez ChefChatter! Ici, vous avez la liberté de partager au monde vos recettes ou de vous inspirer de plusieurs chefs de partout à travers le globe!</span>
                </section>
                <section class="btnMenu">
                    <a href="./createAccount.html">Pas de compte? Inscrivez-vous ici!</a>
                    <a href="./listeRecettes.html">Parcourir les recettes!</a>
                </section>
            </section>
            <section class="ftrMenu">
                <h1>Recettes favorites de nos utilisateurs!</h1>
                <ul id="listeMeilleuresRecettes">
                </ul>
            </section>
        </main>
        <footer class="footerMenu"></footer>
        <script src="index.js"></script>
    </body>
</html>
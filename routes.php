<?php

require_once __DIR__ . '/router.php';

// ##################################################
// ##################################################
// ##################################################

$DBuser = 'equipe500';
$DBpass = '+Sdum3RzzBJGQYvo';
$pdo = null;

try {
    $database = 'mysql:h ost=localhost:3306;dbname=equipe500';
    $pdo = new PDO($database, $DBuser, $DBpass);
    
} catch (PDOException $e) {
   
}


// Fonctions compte

post('/projet1/api/ajouterCompte', function (){
    global $pdo;
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $email = $data['email']??null;
    $username = $data['username']??null;
    $password = $data['password']??null;
    $prenom = $data['prenom']??null;
    $nomDeFamille = $data['nom']??null;
    $dateDeNaissance = $data['dateNaissance']??null;
    if(empty($email)|| empty($username)|| empty($password)|| empty($prenom)|| empty($nomDeFamille)|| empty($dateDeNaissance)){
      echo json_encode(["message" => "Veuillez remplir tous les champs"]);
    }
    else if(usernameExist($pdo, $username)){
      echo json_encode(["message" => "Le nom d'utilisateur est déjà utilisé."]);
    }
    else if(usernameValide($username)){
      echo json_encode(["message" => "Le nom d'utilisateur est trop grand"]);
    }
    else if(emailExists($pdo, $email)){
      echo json_encode(["message" => "L'adresse courriel est déjà utilisée."]);
    }
    else if(emailInvalide($email)){
      echo json_encode(["message" => "L'adresse courriel n'est pas reconnue comme une adresse valide"]);
    }
    else{
        $requete = $pdo->prepare("INSERT INTO EQ1_Compte(email, username, password,
        prenom, nomDeFamille, dateDeNaissance) values (?,?,?,?,?,?)");
        $requete->execute([$email, $username, $password, $prenom, $nomDeFamille, $dateDeNaissance]);
       
        echo json_encode(["message" => "Compte crée avec succès"]);
    }
});

function usernameExist($pdo, $username){
  $verifMail = $pdo->prepare("SELECT 1 FROM EQ1_Compte WHERE username=?");
  $verifMail->execute([$username]);
  return (bool)$verifMail->fetchColumn();
}

function usernameValide($username){
  return strlen($username) > 12;
}

function emailExists($pdo, $email){
  $verifMail = $pdo->prepare("SELECT 1 FROM EQ1_Compte WHERE email=?");
  $verifMail->execute([$email]);
  return (bool)$verifMail->fetchColumn();
};

function emailInvalide($email){
  return filter_var($email, FILTER_VALIDATE_EMAIL) === false;
}

post('/projet1/api/connexion', function (){
  global $pdo;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $email = $data['email']??null;
  $password = $data['password']??null;
  if(empty($email)|| empty($password)){
    echo json_encode(["message" => "ca marche"]);
  }
  else{
    $stmt = $pdo->prepare("SELECT * FROM EQ1_Compte WHERE email = ? AND password = ?");
    $stmt->execute([$email, $password]);
    $user = $stmt->fetch();
    if((bool)$user!=null){
      echo json_encode(["connexion" => "vrai","username" => $user['username'] ]);
    }
    else{
      echo json_encode(["connexion" => "faux"]);
    }
  }
});

// Fonctions recette

post('/projet1/api/ajouterRecette', function (){
  global $pdo;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $nom = $data['nom']??null;
  $pays = $data['pays']??null;
  $regime = $data['regime']??null;
  $typeAliment = $data['typeAliment']??null;
  $description = $data['description']??null;
  $recette = $data['recette']??null;
  $img = $data['img']??null;
  $email = $data['email']??null;
  $ingredients = $data['ingredients']??null;
  $preparation=$data['tempsPreparation']??null;
  $cuisson=$data['tempsCuisson']??null;
  $portion=$data['portion']??null;
  if (empty($nom) || empty($description) || empty($recette) || empty($img) || empty($email) || empty($ingredients) || empty($preparation) || empty($cuisson) || empty($portion)) {
    echo json_encode(["message" => "Missing required fields"]);
    return;
  }

  try {
    $requete = $pdo->prepare("INSERT INTO EQ1_Recette(`nom`, `origine`, `regime`, `type`, `description`, `etape`, `src`, `email`, `preparation`, `cuisson`, `portion`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $requete->execute([$nom, $data['pays'] ?? null, $data['regime'] ?? null, $data['typeAliment'] ?? null, $description, $recette, $img, $email, $preparation, $cuisson, $portion]);

    $id = $pdo->lastInsertId();

    // Insert ingredients
    foreach ($ingredients as $ingredient) {
      ajoutIngredient($ingredient);
      $requete2 = $pdo->prepare("INSERT INTO EQ1_Recette_Ingredient(ingredient, recette) VALUES (?, ?)");
      $requete2->execute([$ingredient, $id]);
    }

    echo json_encode(["message" => "Success"]);
  } catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
  }
});

post('/projet1/api/modifierRecette',function(){
  global $pdo;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $id = $data['id']??null;
  $nom = $data['nom']??null;
  $pays = $data['pays']??null;
  $regime = $data['regime']??null;
  $typeAliment = $data['typeAliment']??null;
  $description = $data['description']??null;
  $recette = $data['recette']??null;
  $img = $data['img']??null;
  $email = $data['email']??null;
  $ingredients = $data['ingredients']??null;
  $preparation=$data['tempsPreparation']??null;
  $cuisson=$data['tempsCuisson']??null;
  $portion=$data['portion']??null;

  if(empty($id)||empty($nom)|| empty($pays)|| empty($regime)|| empty($typeAliment)|| empty($description)|| empty($recette)|| empty($img)|| empty($email)|| empty($ingredients)|| empty($preparation)|| empty($cuisson)|| empty($portion)){
    echo json_encode(["message" => "ca marche pas"]);
  }
  else{
    $requete = $pdo->prepare("UPDATE EQ1_Recette SET `nom`=?, `origine`=?, `regime`=?, `type`=?, `description`=?, `etape`=?, `src`=?, `email`=?, `preparation`=?, `cuisson`=?, `portion`=? WHERE `id`=?");
    $result =$requete->execute([$nom, $pays, $regime, $typeAliment, $description, $recette, $img, $email, $preparation, $cuisson, $portion, $id]);
    $requete1=$pdo->prepare("DELETE FROM EQ1_Recette_Ingredient WHERE recette=?");
    $requete1->execute([$id]);
    foreach($ingredients as $key =>$row){
      ajoutIngredient($row);
      $requete2=$pdo->prepare("INSERT INTO EQ1_Recette_Ingredient(ingredient, recette) values (?,?)");
      $requete2->execute([$row, $id]);
    }
    echo json_encode(["message" => "ca marche"]);
  }
});

function ajoutIngredient($ingredient)
{
  global $pdo;
  $requete=$pdo->prepare("SELECT * FROM EQ1_Ingredient WHERE ingredient=?");
  $requete->execute([$ingredient]);
  $ingredientExistant=$requete->fetch();
  if($ingredientExistant==null){
    $requete=$pdo->prepare("INSERT INTO EQ1_Ingredient(ingredient) values (?)");
    $requete->execute([$ingredient]);
  }
}


post('/projet1/api/supprimerRecette',function(){
  global $pdo;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $id = $data['id']??null;
  $requete = $pdo->prepare("DELETE FROM EQ1_Recette WHERE id=?");
  $requete->execute([$id]);
  header('Content-type: application/json');
  echo json_encode(["message" => "Recette supprimée avec succès"]);
});

// Fonctions fetch Recette


post('/projet1/api/filtrer', function(){
  global $pdo;
  $json = file_get_contents('php://input');
  $data=json_decode($json,true);
  $origine = isset($data['origine']) ? $data['origine'] : null;
  $regime = isset($data['regime']) ? $data['regime'] : null;
  $type = isset($data['type']) ? $data['type'] : null;
  $ingredients= isset($data['ingredients']) ? $data['ingredients'] : null;
//header('Content-type: application/json');
//echo json_encode(["message" => "origine: $origine, regime: $regime, type: $type"]);
$conditions = [];
$params = [];

if ($origine !== "") {
    $conditions[] = "origine = ?";
    $params[] = $origine;
}
if ($regime !== "") {
    $conditions[] = "regime = ?";
    $params[] = $regime;
}
if ($type !== "") {
    $conditions[] = "type = ?";
    $params[] = $type;
}
if ($ingredients !== null) {
  $contitionsIngredient = [];
  foreach ($ingredients as $ingredient) {
    $contitionsIngredient[] = "ingredient=?";;
  }
  $sqlIngredient = "SELECT recette FROM EQ1_Recette_Ingredient WHERE " . implode(" OR ", $contitionsIngredient);
  $requeteIngredient = $pdo->prepare($sqlIngredient);
  $requeteIngredient->execute($ingredients);
  $resultsIngredient = $requeteIngredient->fetchAll(PDO::FETCH_COLUMN);
  foreach ($resultsIngredient as $rowIngredient) {
    $conditions[] = "id=?";
    $params[] = $rowIngredient;
  }
}

$sql = "SELECT * FROM EQ1_Recette";
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$requete = $pdo->prepare($sql);
$requete->execute($params);
$results= $requete->fetchAll(PDO::FETCH_ASSOC);
foreach($results as $key =>$row){
  $email=$row['email'];
  $stmt = $pdo->prepare('SELECT * From EQ1_Compte where email=?');
  $stmt->execute([$email]);
  $user = $stmt->fetch();
  $results[$key]['prenom']=$user['prenom'];
}
header('Content-type: application/json');
echo json_encode($results);
});


// Fonction fetch Recette selon Utilisateur
post('/projet1/api/filtrerUser',function(){
  global $pdo;
  $json = file_get_contents('php://input');
  $data=json_decode($json,true);
  $email = isset($data['emailUser']) ? $data['emailUser'] : null;
  $requete = $pdo->prepare("SELECT * FROM EQ1_Recette WHERE email = ?");
  $requete->execute([$email]);
  $results= $requete->fetchAll();
 header('Content-type: application/json');
 echo json_encode($results);
});

// Fonction fetch Recette affichage

get('/projet1/api/recette/$id', function($id){
  global $pdo;
  $stmt = $pdo->prepare('SELECT * From EQ1_Recette where id=?');
  $stmt->execute([$id]);
  $recette= $stmt->fetch();
  $listeIngredient= ingredientRecette($id);
  $recette['ingredients']=$listeIngredient;

  echo json_encode($recette);
});

function ingredientRecette($id){
  global $pdo;
  $stmt = $pdo->prepare('SELECT ingredient From EQ1_Recette_Ingredient where recette=?');
  $stmt->execute([$id]);
  return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

get('/projet1/api/modifierCompte/$mail', function($mail){
  global $pdo;
  $stmt = $pdo->prepare('SELECT * From EQ1_Compte where email=?');
  $stmt->execute([$mail]);
  echo json_encode($stmt->fetch());
});

post('/projet1/api/pushModification', function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['docMail'];
  $username = $data['docUsername'];
  $password = $data['docPassword'];
  $prenom = $data['docPrenom'];
  $nomDeFamille = $data['docNomFamille'];
  $dateDeNaissance = $data['docDateNaissance'];
  $stmt = $pdo->prepare('UPDATE EQ1_Compte SET username = ?, password = ?, prenom = ?, nomDeFamille = ?, dateDeNaissance = ? WHERE email = ?');
  $stmt->execute([$username, $password, $prenom, $nomDeFamille, $dateDeNaissance, $email]);
});

post("/projet1/api/deleteAccount", function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['docMail'];
  $stmt = $pdo->prepare('DELETE FROM EQ1_Compte WHERE EQ1_Compte.email = ?');
  $stmt->execute([$email]);
});

get('/projet1/api/ratings/$recetteId', function($recetteId){
  global $pdo;
  $stmt = $pdo->prepare('SELECT * FROM EQ1_Avis WHERE recetteId = ?');
  $stmt->execute([$recetteId]);
  $ratings = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($ratings);
});

get('/projet1/api/favori/$email', function($email){
  global $pdo;
  $stmt = $pdo->prepare('SELECT EQ1_Recette.* FROM EQ1_Recette
  INNER JOIN EQ1_Favoris ON EQ1_Recette.id = EQ1_Favoris.RecetteId
  WHERE EQ1_Favoris.CompteEmail = ?');
  $stmt->execute([$email]);
  $favori = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach($favori as $key =>$row){
    $email=$row['email'];
    $stmt = $pdo->prepare('SELECT * From EQ1_Compte where email=?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    $favori[$key]['prenom']=$user['prenom'];
  }
  header('Content-Type: application/json');
  echo json_encode($favori);
});

post('/projet1/api/ratings', function (){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $recetteId = $data['recetteId']??null;
  $email = $data['email']??null;
  $rating = $data['rating']??null;
  $commentaire = $data['commentaire']??null;
  $username = $data['username']??null;
  $stmt = $pdo->prepare('INSERT INTO EQ1_Avis (userId, recetteId, rating,commentaire,username) VALUES (?, ?, ?,?,?)');
  $stmt->execute([$email, $recetteId,$rating, $commentaire,$username]);
  header('Content-Type: application/json');
  echo json_encode(["message" => "Avis ajouté avec succès"]);   
});

post('/projet1/api/favori', function (){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['email'];
  $recetteId = $data['recetteId'];
  $stmt = $pdo->prepare('INSERT INTO EQ1_Favoris (CompteEmail, RecetteId) VALUES (?, ?)');
  $stmt->execute([$email, $recetteId]);
  header('Content-Type: application/json');
  echo json_encode(["message" => "Recette ajoutée aux favoris avec succès"]);
});

post('/projet1/api/estFavoris', function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['mail'];
  $recetteId = $data['recette'];
  $stmt = $pdo->prepare('SELECT * FROM EQ1_Favoris WHERE RecetteId = ? AND CompteEmail = ?');
  $stmt->execute([$recetteId,$email]);
  $estFavoris = $stmt->fetch();
  if((bool)$estFavoris!=null){
    echo json_encode(["result" => "vrai"]);
  }
  else{
    echo json_encode(["result" => "faux"]);
  }
});

post('/projet1/api/enleverFavoris', function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['email'];
  $recetteId = $data['recetteId'];
  $stmt = $pdo->prepare('DELETE FROM EQ1_Favoris WHERE CompteEmail = ? AND RecetteId = ?');
  $stmt->execute([$email, $recetteId]);
  header('Content-Type: application/json');
  echo json_encode(["message" => "Recette retirée des favoris avec succès"]);
});

post('/projet1/api/ratingUser', function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['mail'];
  $recetteId = $data['recette'];
  $stmt = $pdo->prepare('SELECT * FROM EQ1_Avis WHERE userId = ? AND recetteId = ?');
  $stmt->execute([$email, $recetteId]);
  $aAvis = $stmt->fetch();
  if((bool)$aAvis!=null){
    echo json_encode($aAvis,['result' => "vrai"]);
  }
  else{
    echo json_encode($aAvis,['result' => "faux"] );
  }
});

post('/projet1/api/updateRatings', function(){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['mail'];
  $recetteId = $data['recette'];
  $commentaire = $data['commentaire'];
  $rating = $data['rating'];
  $stmt = $pdo->prepare('UPDATE EQ1_Avis SET commentaire = ?, rating = ? WHERE userId = ? AND recetteId = ?');
  $stmt->execute([$commentaire, $rating, $email, $recetteId]);
  header('Content-Type: application/json');
  echo json_encode(["message" => "Avis modifié avec succès"]);
});

get('/projet1/api/recetteChef/$mail', function($mail){
  global $pdo;
  $stmt = $pdo->prepare('SELECT * From EQ1_Recette where email=?');
  $stmt->execute([$mail]);
  $recette= $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($recette);
});

get('/projet1/api/getBestReview', function(){
  global $pdo;
  $stmt = $pdo->prepare('SELECT recetteId, AVG(rating) as average_rating FROM EQ1_Avis GROUP BY recetteId ORDER BY average_rating DESC limit 4');
  $stmt->execute();
  $recette= $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach($recette as $key =>$row){
    $recetteId=$row['recetteId'];
    $stmt = $pdo->prepare('SELECT * From `EQ1_Recette` where `id`=?');
    $stmt->execute([$recetteId]);
    $recette[$key]['recette'] = $stmt->fetch();
    $email = $recette[$key]['recette']['email'];
    $stmt = $pdo->prepare('SELECT `prenom` From `EQ1_Compte` where `email`=?');
    $stmt->execute([$email]);
    $recette[$key]['recette']['prenom'] = $stmt->fetch(PDO::FETCH_COLUMN);

  }
  echo json_encode($recette);
});

get('/projet1/api/AVGRatings/$mail', function($mail){
  global $pdo;
  $stmt = $pdo->prepare('SELECT ROUND(AVG(EQ1_Avis.rating),2) as average
  FROM EQ1_Avis 
  INNER JOIN EQ1_Recette ON EQ1_Recette.id = EQ1_Avis.recetteId
  INNER JOIN EQ1_Compte on EQ1_Compte.email = EQ1_Recette.email
  WHERE EQ1_Compte.email = ?');
  $stmt->execute([$mail]);
  $rating= $stmt->fetch();
  echo json_encode($rating);
});


any('/404', '/index.php');


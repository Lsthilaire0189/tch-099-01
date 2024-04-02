<?php

require_once __DIR__ . '/router.php';

// ##################################################
// ##################################################
// ##################################################

$DBuser = 'equipe500';
$DBpass = '+Sdum3RzzBJGQYvo';
$pdo = null;

try {
    $database = 'mysql:host=localhost:3306;dbname=equipe500';
    $pdo = new PDO($database, $DBuser, $DBpass);
    
} catch (PDOException $e) {
   
}

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
      echo json_encode(["message" => "ca marche"]);
    }
    else if(emailExists($pdo, $email)){
      echo json_encode(["message" => "le email existe déja"]);
    }
    else{
        $requete = $pdo->prepare("INSERT INTO EQ1_Compte(email, username, password,
        prenom, nomDeFamille, dateDeNaissance) values (?,?,?,?,?,?)");
        $requete->execute([$email, $username, $password, $prenom, $nomDeFamille, $dateDeNaissance]);
       
        echo json_encode(["message" => "ca marche"]);
    }
});

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

function emailExists($pdo, $email){
  $verifMail = $pdo->prepare("SELECT 1 FROM EQ1_Compte WHERE email=?");
  $verifMail->execute([$email]);
  return (bool)$verifMail->fetchColumn();
}

post('/projet1/api/ajouterRecette', function (){
  global $pdo;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $nom = $data['nom']??null;
  $pays = $data['pays']??null;
  $regime = $data['regime']??null;
  $typeAliment = $data['typeAliment']??null;
  $description = $data['description']??null;
  $ingredient = $data['ingredient']??null;
  $recette = $data['recette']??null;
  $img = $data['img']??null;
  $email = $data['email']??null;
  $note=0;
  if(empty($nom)|| empty($pays)|| empty($regime)|| empty($typeAliment)|| empty($description)|| empty($ingredient)|| empty($recette)|| empty($img)){
    echo json_encode(["message" => "ca marche pas"]);
  }else{
      $requete = $pdo->prepare("INSERT INTO EQ1_Recette(nom, paysOrigine,
      typeRegime, typeIngredient, Description, listeIngredient, etape, lienImage, note, compteEmail) values (?,?,?,?,?,?,?,?,?,?)");
      $requete->execute([$nom, $pays, $regime,$typeAliment, $description, $ingredient, $recette, $img,$note,$email]);
     
      echo json_encode(["message" => "ca marche"]);
  }
});

get('/projet1/api/ratings/:articleId', function ($articleId){
  global $pdo;
  $stmt = $pdo->prepare('SELECT * FROM ratings WHERE item_id = ?');
  $stmt->execute([$articleId]);
  $ratings = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
  echo json_encode($ratings);
});

post('/projet1/api/ratings', function (){
  global $pdo;
  $data = json_decode(file_get_contents('php://input'), true);
  $itemId = $data['itemId'];
  $userId = $data['userId'];
  $rating = $data['rating'];
  
  $stmt = $pdo->prepare('INSERT INTO ratings (item_id, user_id, rating) VALUES (?, ?, ?)');
  $stmt->execute([$itemId, $userId, $rating]);
  
  echo "Rating submitted successfully";
});

any('/404', 'views/404.php');
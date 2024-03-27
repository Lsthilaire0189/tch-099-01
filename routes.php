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

get('/api/pokemons', function () {
  global $pdo;

  $results = $pdo->query('select * from pokemon;');
  header('Content-Type: application/json');
  echo json_encode($results->fetchAll());
});

get('/api/pokemons/types/$nom', function ($nom) {
  global $pdo;

  $sql = "select * from pokemon where type1 =:nom or type2 =:nom";
  $results = $pdo->prepare($sql);
  $results->execute(['nom' => $nom]);
  header('Content-Type: application/json');
  echo json_encode($results->fetchAll());
});

get('/api/pokemons/$id', function ($id) {
  global $pdo;

  $sql = "select * from pokemon where pokedex_number=:id";
  $results = $pdo->prepare($sql);
  $results->execute(['id' => $id]);
  header('Content-Type: application/json');
  echo json_encode($results->fetch());

});

get('projet1/api/ajouterCompte','index.php');

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
    else{
        $requete = $pdo->prepare("INSERT INTO EQ1_Compte(email, username, password,
        prenom, nomDeFamille, dateDeNaissance) values (?,?,?,?,?,?)");
        $requete->execute([$email, $username, $password, $prenom, $nomDeFamille, $dateDeNaissance]);
       
        echo json_encode(["message" => "ca marche"]);
    }
    
});

// Static GET
// In the URL -> http://localhost
// The output -> Index
get('/api/test', 'monapi.php');
get('/api/autretest', 'monapi.php');

// Dynamic GET. Example with 1 variable
// The $id will be available in user.php
//api/user/4
//api/user/autre
get('/api/user/$mavariable', 'apidyn.php');

// Dynamic GET. Example with 2 variables
// The $name will be available in full_name.php
// The $last_name will be available in full_name.php
// In the browser point to: localhost/user/X/Y
get('/user/$name/$last_name', 'views/full_name.php');

// Dynamic GET. Example with 2 variables with static
// In the URL -> http://localhost/product/shoes/color/blue
// The $type will be available in product.php
// The $color will be available in product.php
get('/product/$type/color/$color', 'product.php');

$info = [
  [
    "message" => "Je suis un tableau associatif",
    "info" => [
      "nombre" => 42,
      "tableau" => [10, 20, 30]
    ]
  ]
  ,
  [
    "message" => "Je suis un deuxieme tableau associatif",
    "info" => [
      "nombre" => 30,
      "tableau" => [1, 2, 3]
    ]
  ]
];

// A route with a callback
get('/api/callback', function () {
  $info = [
    "message" => "Je suis un tableau associatif",
    "info" => [
      "nombre" => 42,
      "tableau" => [10, 20, 30]
    ]
    ,
    "message2" => "Je suis un deuxieme tableau associatif",
    "info2" => [
      "nombre" => 30,
      "tableau" => [1, 2, 3]
    ]
  ];

});

// A route with a callback passing a variable
// To run this route, in the browser type:
// http://localhost/user/A
get('/api/info/$no', function ($no) {
  global $info;
  header('Content-Type: application/json');
  echo json_encode($info[$no]);
});

get('/api/info/$no/message', function ($no) {
  global $info;
  header('Content-Type: application/json');
  echo json_encode($info[$no]['message']);
});

// Route where the query string happends right after a forward slash
get('/product', '');

// A route with a callback passing 2 variables
// To run this route, in the browser type:
// http://localhost/callback/A/B
get('/callback/$name/$last_name', function ($name, $last_name) {
  echo "Callback executed. The full name is $name $last_name";
});

// ##################################################
// ##################################################
// ##################################################
// Route that will use POST data
post('/user', '/api/save_user');



// ##################################################
// ##################################################
// ##################################################
// any can be used for GETs or POSTs

// // For GET or POST
// // The 404.php which is inside the views folder will be called
// // The 404.php has access to $_GET and $_POST
// any('/404', 'views/404.php');
const express = require("express");
const axios = require("axios");
const mariadb = require("mariadb");
const questions = require("./question.json");
const app = express();
require(".env").config();

//Middleware
app.use(express.json());

const pool = mariadb.createPool({
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
});

//Fonction fléchée () => {}
//app.get("/", (req, res) => {
 //   res.writeHead(200, {"Content-type" : "text/html"});
   // res.end("Bienvenue sur l'API!");
//})

//app.get("/questions", (req, res) => {
    // Envoie la réponse au format JSON
  //  res.status(200).json(questions);
//})

//app.get("/questions/:id/", (req, res) => {
  //  const id = parseInt(req.params.id);
    //const laQuestion = questions.find(questions => questions.id === id);
    //res.status(200).json(laQuestion);
//})

//Méthode POST pour créer une nouvelle question
//app.post('/questions', (req, res) => {
  //  questions.push(req.body);
   // res.status(200).json(questions);
//})

//Modification d'un élement
//app.put("/questions/:id/", (req, res) => {
  //  const id = parseInt(req.params.id);
   // let laQuestion = questions.find(questions => questions.id === id);
    //laQuestion.theme = req.body.theme;
    //laQuestion.question = req.body.question;
    //laQuestion.reponse = req.body.reponse;
    //res.status(200).json(laQuestion);
//})

//app.delete('/questions/:id/', (req, res) => {
  //  const id = parseInt(req.params.id);
    //let laQuestion = questions.find(questions => questions.id === id);
    //questions.splice(questions.indexOf(laQuestion), 1);
    //res.status(200).json(questions);
//})

app.get("/questions", async(req, res) => {
  let connection;
  try {
    console.log("Lancement de la connexion");
    //On met en attente le pool et on récupère la connection
    connection = await pool.getConnection();
    console.log("Lancement de la requete");
    const rows = await connection.query("SELECT * FROM questions;");
    console.log(rows);
    res.status(200).json(rows)

  } catch (error) {
    console.log(error);
    res.status(400).json({error : error.message});
      
  }

})

app.listen(8080, () => {
    console.log("En écoute sur le port 8080");
})


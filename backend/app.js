// Variables d'environnement - import du package dotenv
require("dotenv").config("../.env");

//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

const postRoutes = require("./routes/posts"); // router pour le "parcours" posts
const userRoutes = require("./routes/user"); //router pour le "parcours" utilisateur

// Connexion à la base de données (bdd)
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.s3ygkvi.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// création de l'application
const app = express();

app.use(express.json());

// utilisation de Helmet (configuration des en-êtes http)
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

// utilisation de cors pour limiter les erreurs
app.use(cors({ origin: "http://localhost:8080" }));

// Accès principaux
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;

// imports
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schéma de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique:true : pas de mail en doublon
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  username: {type:String, required:true, minlength: 3, maxlength: 25},
});

// passer le plugin sur le schema avant de l'exporter en modèle:
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

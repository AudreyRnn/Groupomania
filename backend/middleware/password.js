const passwordValidate = require("password-validator");

// schéma du password

const passwordSchema = new passwordValidate();

passwordSchema
  .is()
  .min(6) // Longueur minimal 6
  .is()
  .max(12) // Longueur maximal 12
  .has()
  .uppercase(1) // Doit avoir 1 lettre majuscule
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(1) // Doit avoir au moins 1 chiffre
  .has()
  .not()
  .spaces() // Ne doit pas avoir d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Passw0rd1234567", "Password1234", "Azerty123456"]); // Blacklist des mots de passe

//vérification du mot de passe
module.exports = (req, res, next)=> {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir entre 6 et 12 caractères, dont une majuscule et un chiffre!",
    });
  } else {
    next();
  }
};

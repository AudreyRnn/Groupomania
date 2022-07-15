//imports
const express = require("express");
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");

//création du router
const router = express.Router();

// routes inscription et connexion
router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;

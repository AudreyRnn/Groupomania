// imports
const express = require("express");
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//creation du router
const router = express.Router();

//création d'une sauce (create)
router.post("/", auth, multer, postCtrl.createPost);

//récupérer toutes les sauces (read)
router.get("/", auth, postCtrl.getAllPosts);

// récupérer une seule sauce d'après son id (read)
router.get("/:id", auth, postCtrl.getOnePost);

// mettre à jour une sauce (update)
router.put("/:id", auth, multer, postCtrl.modifyPost);

// supression d'une sauce (delete)
router.delete("/:id", auth, postCtrl.deletePost);

// Gestion des likes et dislikes
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;

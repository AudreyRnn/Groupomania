// imports
const express = require("express");
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//creation du router
const router = express.Router();

//création d'un post (create)
router.post("/", auth, multer, postCtrl.createPost);

//récupérer tous les posts (read)
router.get("/", auth, postCtrl.getAllPosts);

// récupérer un post d'après son id (read)
router.get("/:id", auth, postCtrl.getOnePost);

// mettre à jour un post(update)
router.put("/:id", auth, multer, postCtrl.modifyPost);

// supression d'un post (delete)
router.delete("/:id", auth, postCtrl.deletePost);

// Gestion des likes et dislikes
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;

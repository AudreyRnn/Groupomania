// imports
const Post = require("../models/post");
const fs = require("fs"); // package  file système

//création d'un post
exports.createPost = (req, res, next) => {
  console.log(req.body.post);
  const postObject = JSON.parse(req.body.post);
  console.log(postObject);
  delete postObject._id; // suppression du faux id envoyé par le frontend
  const post = new Post({
    ...postObject,
    likes: 0,
    usersliked: [],
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  //enregistrement en BDD
  post
    .save()
    .then(() => res.status(201).json({ message: "nouveau post crée!" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification d'un post
exports.modifyPost = (req, res, next) => {
  // si req.file présent
  if (req.file) {
    // récupération du post dans la bdd
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        // récupération du fichier image à supprimer
        const filename = post.imageUrl.split("/images/")[1];
        //suppression du fichier image dans le dossier du serveur
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }
  const postObject = req.file // si req.file existe on traite la nouvelle image, sinon on traite l'objet entrant
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) // trouver objet ds bdd
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "requête non autorisée!" });
      }
      //Verification que le post appartient à l'user ou que c'est l'admin qui supprime
      if (post.userId !== req.auth.userId) {
        return res.status(401).json({
          error: "Requête non autorisée",
        });
      }
      const filename = post.imageUrl.split("/images/")[1]; // on extraie nom du fichier à supprimer
      // supression du fichier fs.unlink
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id }) // ensuite supression de l'objet de la base
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// affichage tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// affichage d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) //trouver l'objet unique ayant le même id que le paramètre de la recherche
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Liker un post
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // Si le user n'a pas encore fait de choix
      if (post.usersLiked.indexOf(req.body.userId) == -1) {
        //Le user aime le post
        if (req.body.like == 1) {
          post.usersLiked.push(req.body.userId);
          post.likes += req.body.like;
        }
      }
      // Retirer un like
      if (
        post.usersLiked.indexOf(req.body.userId) != -1 &&
        req.body.like == 0
      ) {
        const likesUserIndex = post.usersLiked.findIndex(
          (user) => user === req.body.userId
        );
        post.usersLiked.splice(likesUserIndex, 1);
        post.likes -= 1;
      }

      post.save();
      res.status(201).json({ message: "Mise à jour like" });
    })
    .catch((error) => res.status(500).json({ error }));
};

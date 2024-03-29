// imports
const Post = require("../models/post");
const fs = require("fs"); // package  file système
const User = require("../models/User");

//création d'un post
exports.createPost = (req, res, next) => {
  //const postObject = JSON.parse(req.body.post);
  //const postObject = req.body;
  //delete postObject._id; // suppression du faux id envoyé par le frontend
  const post = new Post({
    userId: req.body.userId,
    message: req.body.message,
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

// //modification d'un post

exports.modifyPost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
      if (post.userId == user._id || user.role == "admin") {
        const postObject = req.file
          ? {
            
             message:req.body.message,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };

        Post.findByIdAndUpdate(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )

          .then((post) => {
            if (req.file) {
              const filename = post.imageUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                res.status(200).json({ message: "Post modifié avec succès !" });
              });
            }
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        res
          .status(401)
          .json({
            message:
              "Seuls le créateur du post ou un administrateur peuvent modifier les posts",
          });
      }
    });
  });
};

// supprimer un post

exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.userId == user._id || user.role == "admin") {
          const filename = post.imageUrl.split("/images/")[1];

          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          res.status(401).json({
            message: "Ce post doit être supprimé par son auteur ou un",
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
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

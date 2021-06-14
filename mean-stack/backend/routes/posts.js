const express = require("express");

const PostController = require("../controllers/posts");

const chechAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", chechAuth, extractFile, PostController.cratePost);

router.get("", PostController.getposts);

router.get("/:id", PostController.getPost);

router.put("/:id", chechAuth, extractFile, PostController.updatePost);

router.delete("/:id", chechAuth, PostController.deletePost);

module.exports = router;

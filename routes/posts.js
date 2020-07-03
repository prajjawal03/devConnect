const router = require("express").Router();
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const validator = require("../validation/posts");
const Posts = require("../models/Posts");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route      post api/posts
// @desc       create a post
// @access     private
router.get("/", [auth, validator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Posts({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: user._id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      get api/posts
// @desc       get all post
// @access     private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Posts.find().sort({ date: -1 });
    if (!post) return res.status(400).json({ msg: "no post found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      get api/posts/:id
// @desc       get post by id
// @access     private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "objectId") {
      return res.status(400).json({ msg: "post not found" });
    }
    res.status(500).send("internal server error");
  }
});

// @route      delete api/post/:id
// @desc       delete a post
// @access     private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "post not found" });
    //check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "not authenticated" });
    await post.remove();
    res.josn({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth");
const { validator, exp_validator } = require("../validation/profile");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// @route      get api/profile/me
// @desc       get current user profile
// @access     private
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) return res.status(400).json({ msg: "no profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});
// @route      post api/profile
// @desc       create or update user profile
// @access     private
router.post("/", [auth, validator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;
  //build profile object
  const profileFields = {};
  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  //buid social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    }
    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      get api/profile
// @desc       get all user profiles
// @access     public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      get api/profile/user/:user_id
// @desc       get profile by user id
// @access     public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(404).json({ msg: "no profile found with this id" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      delete api/profile
// @desc       delete profile, user and posts
// @access     private
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //@todo remove posts

    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      put api/profile/experience
// @desc       add profile experience
// @access     private
router.put("/experience", [auth, exp_validator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

// @route      put api/profile/experience/:exp_id
// @desc       delete experience from profile
// @access     private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //filter exp id
    profile.experience = profile.experience.filter(
      (item) => item._id !== req.params.exp_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

//@todo - education

module.exports = router;

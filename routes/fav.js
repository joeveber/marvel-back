const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/fav", async (req, res) => {
  console.log("login route");
  const { idfav, email } = req.fields;

  res.json(idfav + " added to your favs");

  const foundUser = await User.findOne({
    email: email,
  });

  foundUser.favs.push(idfav);
  console.log(foundUser.favs);

  foundUser.save();
});

module.exports = router;

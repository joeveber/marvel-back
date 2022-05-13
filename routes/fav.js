const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/fav", async (req, res) => {
  console.log("fav route");
  const { idfav, token } = req.fields;

  res.json(idfav + " added to your favs");

  const foundUser = await User.findOne({
    token: token,
  });

  foundUser.favs.push(idfav);
  console.log(foundUser.favs);

  foundUser.save();
});

module.exports = router;

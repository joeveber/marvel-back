const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/fav", async (req, res) => {
  console.log("fav route");
  const { idfav, token } = req.fields;

  const foundUser = await User.findOne({
    token: token,
  });

  console.log(foundUser.favs.indexOf(idfav));
  if (foundUser.favs.indexOf(idfav) === -1) {
    foundUser.favs.push(idfav);
    foundUser.save();
    res.json("working");
  } else {
    res.json("Ce comic est déjà dans vos favoris");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/deletefav", async (req, res) => {
  console.log("deleterfav route");
  const { idfavtodelete, token } = req.fields;

  const foundUser = await User.findOne({
    token: token,
  });

  const favIndex = foundUser.favs.indexOf(idfavtodelete);
  if (favIndex !== -1) {
    foundUser.favs.splice(favIndex, 1);
    console.log(foundUser.favs);
    foundUser.save();
    res.json("Fav deleted");
  } else {
    res.json("This id doesn't correspond to any fav");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/allfavs", async (req, res) => {
  console.log("allfavs route");
  const { token } = req.fields;
  console.log(req.fields.token);

  const currentUser = await User.findOne({
    token: token,
  });

  res.json(currentUser);
});

module.exports = router;

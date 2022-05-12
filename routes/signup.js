const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User.js");

router.post("/signup", async (req, res) => {
  console.log("signup route");

  try {
    const userToCheck = req.fields.username;

    if (!userToCheck) {
      res.status(400).json({ message: "Veuillez entrer un nom d'utilisateur" });
    } else {
      const isUserNew = await User.findOne({
        email: req.fields.email,
      });

      if (isUserNew !== null) {
        res.status(400).json({ message: "Utilisateur déjà existant" });
      } else {
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          account: { username: req.fields.username },
          email: req.fields.email,
          token: token,
          hash: hash,
          salt: salt,
          favs: [0],
        });
        await newUser.save();
        res.json({
          _id: newUser.id,
          token: newUser.token,
          email: newUser.email,
          account: {
            username: newUser.account.username,
          },
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

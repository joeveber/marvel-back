const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/character/:id", async (req, res) => {
  console.log("route character");
  console.log(req.params.id);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );

    response.data.results.map((result) => {
      if (result._id === req.params.id) {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

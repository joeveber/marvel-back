require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Welcome to Marvel API !");
});

//List of comics
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

//List of comics containing a specific character

//List of characters
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started !!");
});

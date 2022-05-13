require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(formidable());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const signup = require("./routes/signup");
app.use(signup);

const login = require("./routes/login");
app.use(login);

const comics = require("./routes/comics");
app.use(comics);

const comic = require("./routes/comic");
app.use(comic);

const characters = require("./routes/characters");
app.use(characters);

const character = require("./routes/character");
app.use(character);

const fav = require("./routes/fav");
app.use(fav);

const allfavs = require("./routes/allfavs");
app.use(allfavs);

app.all("*", (res) => {
  console.log("all routes");
  res.status(400).json({ message: "Page doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

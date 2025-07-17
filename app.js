const express = require("express");
const mongoose = require("mongoose");
const utils = require("./utils");
const engine = require("ejs-mate");
const app = express();

app.set("view engine", "ejs");
app.engine("ejs", engine);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/shows", async (req, res) => {
  const { show } = req.query;
  const showDetails = await utils.getShow(show);
  if (!showDetails.length) {
    return res.send("No results found.");
  }
  const bestMatch = showDetails[0];
  res.render("show", { bestMatch });
});

app.get("/:id/cast", async (req, res) => {
  const { id } = req.params;
  const castDetails = await utils.getCast(id);
  res.render("cast", { castDetails });
});

app.get("/:id/images", async (req, res) => {
  const { id } = req.params;
  const images = await utils.getImages(id);
  res.render("images", { images });
});

app.get("/:id/seasons", async (req, res) => {
  const { id } = req.params;
  const seasons = await utils.getSeasons(id);
  res.render("seasons", { seasons });
});

app.get("/seasons/:id/episodes", async (req, res, get) => {
  const { id } = req.params;
  const episodes = await utils.getEpisodes(id);
  res.render("episodes", { episodes: episodes.slice(0, episodes.length - 1) });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});

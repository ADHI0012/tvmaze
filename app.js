const express = require("express");
const mongoose = require("mongoose");
const utils = require("./utils");
const engine = require("ejs-mate");
const app = express();
const path = require("path");
const User = require("./models/user");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

mongoose
  .connect("mongodb://localhost:27017/TvMaze")
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.set("view engine", "ejs");
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({ secret: "thisisasecret" }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.get("/seasons/:id/episodes", async (req, res) => {
  const { id } = req.params;
  const episodes = await utils.getEpisodes(id);
  res.render("episodes", { episodes: episodes.slice(0, episodes.length - 1) });
});

app.get("/register", (req, res) => {
  res.render("users/register");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await new User({ username, email });
    const regUser = await User.register(user, password);
    req.flash("success", "You have successfully signed up :)");
    res.redirect("/");
  } catch (e) {
    req.flash("error", "Something went wrong :(");
  }
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});

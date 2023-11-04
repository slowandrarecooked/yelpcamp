const express = require("express");
const { connection } = require("./config/db.js");
const { CampgroundModel } = require("./models/campground.model.js");
const cities = require("./seeds/cities.js");
const { places, descriptors } = require("./seeds/seedHelpers.js");
const redditData = require("./data.json");
console.log(redditData);
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedCamp = async () => {
  await CampgroundModel.deleteMany({});
  for (let i = 0; i < 50; ++i) {
    const random100 = Math.floor(Math.random() * 1000);
    const data = new CampgroundModel({
      location: `${cities[random100].city},${cities[random100].state}`,
      title: `${sample(places)} ${sample(descriptors)}`,
    });
    await data.save();
  }
};
seedCamp();
app.get("/", async (req, res) => {
  res.render("home.ejs");
});
app.get("/rand", (req, res) => {
  let rn = Math.round(Math.random() * 100);
  res.render("random", { rn });
});
app.get("/cats", (req, res) => {
  const cats = ["blue", "red", "water"];
  res.render("cats", { cats });
});
app.get("/r/:subreddit", (req, res) => {
  let { subreddit } = req.params;
  let data = redditData[subreddit];
  res.render("subreddit", { ...data });
});
app.get("/viewcampgrounds", async (req, res) => {
  res.render("campgrounds/index");
});
app.post("/addcampground", async (req, res) => {
  const data = new CampgroundModel({
    title: "backyard",
  });
  await data.save();
  res.send("campground added");
});
app.listen(3000, async () => {
  try {
    await connection;
    console.log("connected to database ");
  } catch (error) {
    console.log("error while trying to connect to server");
    console.log(error);
  }
});

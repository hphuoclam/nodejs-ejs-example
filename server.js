// load the things we need
var express = require("express");

// dotenv load
require("dotenv").config();

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", async function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";

  let news = await newsapi.v2.topHeadlines({
    category: "technology",
    language: "en",
    country: "us",
  });

//   console.log(news);

  res.render("pages/index", {
    mascots,
    tagline,
    news
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

const app_port = process.env.SERVER_PORT || 8080;
app.listen(app_port);
console.log(`${app_port} is the magic port`);

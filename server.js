"use strict";

/* API relay code from https://www.freecodecamp.org/news/private-api-keys/
 */
const express = require("express");
require("dotenv").config();
const path = require("path");
const rateLimit = require("express-rate-limit");
const app = express();
const port = 1776;

// Serves front-end content in the public directory
app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limit (make sure I don't send a jillion requests to Unsplash)
// Demo mode limits to 50 json requests per hour.
const limiter = rateLimit({
  windowMs: 1000 * 3600,
  max: 50,
});
app.use(limiter); // apply rate limiter to all requests

// test route, use to verify it works
// localhost:PORT/hello
app.get("/hello", (req, res) =>
  res.send(
    "<html><head><title>Hello World</title></head><body><h1>Hello world</h1></body></html>"
  )
);

// Unsplash API relay route
app.get("/api/random-bg", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_API_KEY}`
    );
    const data = await response.json();
    if (data.errors) console.log(data.errors);
    const receivedPhoto = data; //.urls.regular;

    return res.json({
      success: true,
      data: receivedPhoto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Serves the whole app
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Press Ctrl+C to end this process.`);
});

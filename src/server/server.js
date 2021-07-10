const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const randomId = require("random-id");

const domain = "http://localhost:2000/";
const app = express();
const dirN = __dirname.slice(0, __dirname.length - 7) + "/client";

// Mongodbga ulanish
mongoose
  .connect(
    "mongodb+srv://root:shirina1708@cluster0.ufftb.mongodb.net/url-shortner?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Model hamda sxema
const urlScheme = new mongoose.Schema({
  id: String,
  shUrl: String,
  oUrl: String,
  date: { type: Date, default: Date.now },
});
const ShUrl = mongoose.model("Url", urlScheme);

app.use(express.json());
app.use(bodyParser());
app.use(cors());
app.use(express.static(dirN));

// Route parametrlar
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/fUrl", async (req, res) => {
  const findUrl = await ShUrl.find({
    oUrl: req.body.url,
  });
  let shortUrl = {};
  if (findUrl[0] == undefined) {
    const id = randomId(5, "a");
    console.log(req.body);
    console.log(id);
    shortUrl = {
      done: true,
      query: `?id=${id}`,
      host: 200,
      fU: `${domain}shUrl?id=${id}`,
    };
    const url = new ShUrl({
      id: id,
      shUrl: shortUrl.fU,
      oUrl: req.body.url,
    });
    const saveUrl = await url.save();
  } else {
    console.log("Else boshlandi...");
    shortUrl = {
      done: true,
      query: `?id=${findUrl[0].id}`,
      host: 200,
      fU: findUrl[0].shUrl,
    };
  }
  setTimeout(() => {
    res.send(shortUrl);
  }, 1000);
});

app.get("/shUrl", async (req, res) => {
  const url = await ShUrl.find({
    id: req.query.id,
  });
  if (url[0] !== undefined) {
    res.write(`<script> window.open('${url[0].oUrl}',"_parent")</script>`);
  } else {
    res.sendFile("not-found.html", { root: "./src/client" });
  }
});

//Server
app.listen(2000, () => {
  console.log(`Server is running on port: 2000`);
});

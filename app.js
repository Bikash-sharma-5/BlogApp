require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const cookiePaser = require("cookie-parser");

const Blog = require("./models/blog");


const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");



const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect(process.env.MONGO_URL
)
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", async (req, res) => {
  try {
    let category = req.query.category || "";
    let blogs;
    let user =req.user;
    
   console.log(user)

    if (category) {
      blogs = await Blog.find({ category: category });
    } else {
      blogs = await Blog.find();
    }

    res.render("home", { user, blogs, category });
  } catch (err) {
    console.error(err);
    res.render("home", { blogs: [], category: "", error: "Error fetching blogs." });
  }
});
app.get("/favorites", (req, res) => {
  res.render("favorites"); // Render the favorites.ejs page
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

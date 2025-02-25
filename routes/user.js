const { Router } = require("express");
const User = require("../models/user");




const multer = require("multer");
const path = require("path");

const router = Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // Store uploads in the public/uploads/ directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

const upload = multer({ storage });


router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
 

  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signin", { error: "Incorrect Email or Password" });
    }
    const token = await User.matchPasswordAndGenerateToken(email, password);
    req.session.user = user;
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
 

});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { fullName, email, password } = req.body;
  const profileImage = req.file ? "/images/" + req.file.filename : "/images/default.png"; // If no image, use default
 
  try {
    const user = await User.create({ fullName, email, password, profileImage });
    req.session.user = user; // Store in session
    res.redirect("/");
  } catch (error) {
    res.render("signup", { error: "Signup failed. Please try again." });
  }
});

module.exports = router;

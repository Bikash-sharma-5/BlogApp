const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});
router.get("/category/:category", async (req, res) => {
  try {
      const category = req.params.category;
      const blogs = await Blog.find({ category: category });
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy","user");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});


router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const {  body ,
  description,
    category,
    
    title, } = req.body;
  const blog = await Blog.create({
    body ,
    description,
      category,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/category/:category", async (req, res) => {
  try {
      const category = req.params.category;
      const blogs = await Blog.find({ category });

      res.render("categoryBlogs", { blogs, category }); // Render categoryBlogs.ejs
  } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching blogs");
  }
});




module.exports = router;

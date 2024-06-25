const express = require("express");
const rt2 = express.Router();
const { check_for_user } = require("../middlewares/authentication");
const { BLOG } = require("../models/blog_schema");
rt2.use(check_for_user("token"));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

rt2.get("/", (req, res) => {
  res.render("addblog", { user: req.user });
});
rt2.post("/add", upload.single("COVERPAGE"), async (req, res) => {
  const { TITLE, BODY } = req.body;
 
  await BLOG.create({
    title: TITLE,
    body_text: BODY,
    cover_img_url: `/uploads/${req.file.filename}`,
    created_by: req.user._id,
  });
  res.redirect("/");
});
rt2.get("/view/:id", check_for_user("token"), async (req, res) => {
  const blog = await BLOG.findById(req.params.id);
  console.log(blog);
  res.render("blog", { user: req.user, blog: blog });
});
module.exports = { rt2 };

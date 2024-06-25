//from files
const { rt1 } = require("./routes/user_routes");
const { connected } = require("./connection");
const { rt2 } = require("./routes/blog_routes");
const { BLOG } = require("./models/blog_schema");
const { check_for_user } = require("./middlewares/authentication");

connected("mongodb://localhost:27017/blogapp");
const PORT = 8000;

//dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.get("/", check_for_user("token"), async (req, res) => {
  const blogs = await BLOG.find({});
  res.render("home", { user: req.user, blogall: blogs });
});
app.use("/user", rt1);
app.use("/blog", rt2);
app.listen(PORT, () => {
  console.log(
    "SERVER STARTED AT -> http://localhost:8000/ or  http://192.168.5.161:8000/ "
  );
});

const a="./public/uploads/1719321207681--7b1533e189adab8c2b03272e8938a567.jpg"
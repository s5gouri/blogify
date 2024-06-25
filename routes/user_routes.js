const express = require("express");
const rt1 = express.Router();
const { check_for_user } = require("../middlewares/authentication");
const { USER } = require("../models/user_schema");

rt1
  .route("/signin")
  .get((req, res) => {
    res.render("signin");
  })
  .post(async (req, res) => {
    const { EMAIL, PASSWORD } = req.body;
    try {
      const user_token = await USER.match_password_and_generate_token(
        EMAIL,
        PASSWORD
      );

      res.cookie("token", user_token).redirect("/");
    } catch (error) {
      return res.render("signin", { error: "INCORRECT EMAIL OR PASSWORD" });
    }
  });
rt1
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const { NAME, EMAIL, PASSWORD } = req.body;
    const user = await USER.create({
      name: NAME,
      email: EMAIL,
      password: PASSWORD,
    });
    try {
      const user_token = await USER.match_password_and_generate_token(
        EMAIL,
        PASSWORD
      );

      res.cookie("token", user_token).redirect("/");
    } catch (error) {
      return res.render("signup");
    }
  });
rt1.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = { rt1 };

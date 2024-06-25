const {
  create_token_for_user,
  validate_token,
} = require("../services/service");
const check_for_user = (cookie_name) => {
  return (req, res, next) => {
    const cookie_value = req.cookies[cookie_name];
    if (!cookie_value) {
      return res.redirect("/user/signin");
      // return next();
    }
    try {
      const user_payload = validate_token(cookie_value);
      req.user = user_payload;
    } catch (error) {}
    return next();
  };
};

module.exports = { check_for_user,  };

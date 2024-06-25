const { Schema, model } = require("mongoose");
const blog_schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body_text: {
      type: String,
      require: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "userm",
     
    },
    cover_img_url: {
      type: String,
    },
  },
  { Collection: "blogs" },
  { timestamps: true }
);

const BLOG = model("blogm", blog_schema);
module.exports = { BLOG };

const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["heading", "image", "paragraph"],
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const MainSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [ContentSchema], 
    validate: [
      (val) => val.length > 0,
      "Content array must have at least one item.",
    ],
  },
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", MainSchema);

module.exports = BlogPost;

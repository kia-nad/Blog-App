const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    movieImg: {
      type: String,
      required: true,
      unique: false,
    },
    movieTitle: {
      type: String,
      required: true,
      unique: false,
    },
    movieSummary: {
      type: String,
      required: true,
      unique: false,
    },
    metaScore: {
      type: String,
      required: true,
      unique: false,
    },
    imdbRating: {
      type: String,
      required: true,
      unique: false,
    },
    Year: {
      type: String,
      required: true,
      unique: false,
    },
    Runtime: {
      type: String,
      required: true,
      unique: false,
    },
    Genre: {
      type: String,
      required: true,
      unique: false,
    },
    Director: {
      type: String,
      required: true,
      unique: false,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
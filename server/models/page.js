const mongoose = require("mongoose");

const Page = mongoose.model("Page", {
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title1: {
    type: String,
    required: true,
  },
  content1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
  },
  content3: {
    type: String,
  },
  mediumQ: {
    type: String,
    required: true,
  },
  mediumA: {
    type: String,
    required: true,
  },
  hardQ: {
    type: String,
    required: true,
  },
  hardA: {
    type: String,
    required: true,
  },
  creatorid: {
    type: String,
  },
});
module.exports = Page;

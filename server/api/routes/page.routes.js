const express = require("express");
const {
  getAllPages,
  getPage,
  postPage,
  editPage,
  deletePage,
} = require("../controllers/page.controllers");

const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPage);
pageRouter.post("/create", postPage);
pageRouter.put("/:id", editPage);
pageRouter.delete("/:id", deletePage);

module.exports = pageRouter;

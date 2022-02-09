const express = require("express");
const {
  getAllUsers,
  getUser,
  postUser,
  performAction,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/create", postUser);
userRouter.put("/:action/:id", performAction);

module.exports = userRouter;

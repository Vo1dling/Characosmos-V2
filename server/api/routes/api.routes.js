const express = require("express");
const userRouter = require("./user.routes");

const apiRouter = express.Router();

apiRouter.use("/", userRouter);

module.exports = apiRouter;

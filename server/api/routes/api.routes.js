const express = require("express");
const pageRouter = require("./page.routes");

const apiRouter = express.Router();

apiRouter.use("/", pageRouter);

module.exports = apiRouter;

const express = require("express");
const pageRouter = require("./page.router");
const userRouter = require("./user.router")

const apiRouter = express.Router();

apiRouter.use("/", pageRouter);
apiRouter.use("/" ,userRouter)

module.exports = apiRouter;

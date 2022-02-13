const express = require("express");
const { send } = require("express/lib/response");
const Page = require("../../models/page");
const { createCustomError } = require("./utils/error.utils");
// if you dont use it remove it
const { getData, addPage } = require("./utils/utils");

const app = express();
app.use(express.json());
// there is no reason for using express or app in here please remove it

const getAllPages = async (req, res) => {
  try {
    const pages = await getData();
    // getData is a general name please change it to getpages
    if (!pages.length) {
      throw Error({
        type: "getAllPages Error",
        statusCode: 404,
        message: "No Pages found",
      });
    }
    res.status(200).send(pages);
  } catch (e) {
    res.send(e);
  }
};

const postPage = async (req, res) => {
  try {
    const page = await addPage(req.body);

    await page.save();
    const user = req.user;
    user.pages.push(page._id);

    res.status(201).send(page);
  } catch (e) {
    if (e.message.includes("validation"))
      return res.send({ type: "Scheam Validation Error", error: e });
    res.send(e.message);
  }
};

const getPage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await getData(id);
    if (!page) {
      throw createCustomError("Page Not Found", 404, "getPage Error");
    }

    res.send(page);
  } catch (e) {
    res.send({ error: e });
  }
};

const editPage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);
    if (!page) throw createCustomError("Page not found", 404, "editPage Error");
    const newPage = req.body;
    for (const prop in newPage) {
      page[prop] = newPage[prop];
    }
    await page.save();
    res.send(page);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    await Page.findByIdAndDelete(id);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = { editPage, getAllPages, postPage, getPage, deletePage };

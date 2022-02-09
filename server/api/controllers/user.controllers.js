const express = require("express");
const { send } = require("express/lib/response");
const User = require("../../models/user");
const { createCustomError } = require("./utils/error.utils");
// if you dont use it remove it
const {
  getData,
  addUser,
  withdraw,
  deposit,
  updateCredit,
  transfer,
} = require("./utils/utils");

const app = express();
app.use(express.json());
// there is no reason for using express or app in here please remove it

const getAllUsers = async (req, res) => {
  try {
    const users = await getData();
    // getData is a general name please change it to getUsers
    if (!users.length) {
      throw Error({
        type: "getAllUsers Error",
        statusCode: 404,
        message: "No Users found",
      });
    }
    res.status(200).send(users);
  } catch (e) {
    res.send(e);
  }
};

const postUser = async (req, res) => {
  try {
    // const {soemthing} = req.body
    const user = await addUser(req.body);
    // i dont need to guess what is the body in the req parameter
    await user.save();
    // please dont use it here if the addUser fucntion on top
    res.status(201).send(user);
  } catch (e) {
    if (e.message.includes("validation"))
      return res.send({ type: "Scheam Validation Error", error: e });
    res.send(e.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getData(id);
    if (!user) {
      throw createCustomError("User Not Found", 404, "getUser Error");
    }

    res.send(user);
  } catch (e) {
    res.send({ error: e });
  }
};

const performAction = async (req, res) => {
  const { id, action } = req.params;
  const { amount } = req.body;
  // greate
  let actionFunction;
  switch (action) {
    case "withdraw":
      actionFunction = withdraw;
      break;
    case "deposit":
      actionFunction = deposit;
      break;
    case "transfer":
      actionFunction = transfer;
      break;
    case "updateCredit":
      actionFunction = updateCredit;
      break;
  }

  // this way of using Switch case it Ok but you dont really need to use it you need to sperate the functions to a 4 controllers like withdraw deposit ...

  try {
    const { targetID } = req.body;

    let users = [];
    if (!targetID) {
      users = await actionFunction(id, amount);
    } else {
      users = await actionFunction(id, targetID, amount);
    }
    res.send(users);
  } catch (e) {
    if (e.message.includes("validation") || e.message.includes("Not"))
      return res.status(400).send(e.message);
    else if (e.message.includes("null"))
      return res.status(404).send("User not found");
    res.status(500).send(e.message);
  }
};
module.exports = { getAllUsers, postUser, performAction, getUser };

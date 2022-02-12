const express = require("express");
const {
  postUser,
  login,
  logout,
  logoutAll,
  viewProfile,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
const auth = require("../../middleware/auth");
const router = new express.Router();

router.post("/users", postUser);

router.post("/users/login", login);

router.post("/users/logout", auth, logout);

router.post("/users/logoutAll", auth, logoutAll);

router.get("/users/me", auth, viewProfile);

router.get("/users/:id", getUser);

router.put("/users/:id", auth, updateUser);

router.delete("/users/:id", auth, deleteUser);

module.exports = router;

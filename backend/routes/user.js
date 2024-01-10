const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getDocboxsByUser,
} = require("../controllers/user");
const { verifyToken } = require("../auth/auth");
const validation = require("../validations/validation")();

const userRouter = express.Router();

userRouter.post("/register", validation.registerUser, registerUser);
userRouter.post("/login", validation.loginUser, loginUser);
userRouter.post("/logout", verifyToken, validation.logoutUser, logoutUser);
userRouter.get("/getAllUsers", verifyToken, getAllUsers);
userRouter.post("/getDocboxsbyUser", verifyToken, getDocboxsByUser);

module.exports = userRouter;

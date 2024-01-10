const express = require("express");
const {
  createDocBox,
  deleteDocBox,
  getAllDocBox,
  addUserToDocBox,
} = require("../controllers/docBox");
const { verifyToken } = require("../auth/auth");
const validation = require("../validations/validation")();

const docBoxRouter = express.Router();

docBoxRouter.post("/createDocBox", verifyToken, validation.createDocBox, createDocBox);
docBoxRouter.post("/deleteDocBox", verifyToken, validation.deleteDocBox, deleteDocBox);
docBoxRouter.get("/getAllDocBox",verifyToken, getAllDocBox);
docBoxRouter.post(
  "/addUserToDocBox",
  verifyToken,
  validation.addUserToDocBox,
  addUserToDocBox
);

module.exports = docBoxRouter;

const express = require("express");
const {
  uploadFile,
  deleteFile,
  getDocsByDocId,
  getFileById,
} = require("../controllers/document");
const { verifyToken } = require("../auth/auth");
const validation = require("../validations/validation")();

const documentRouter = express.Router();
documentRouter.post(
  "/getDocsByDocId",
  validation.getDocsByDocboxId,
  getDocsByDocId
);
documentRouter.post("/uploadDoc", verifyToken, validation.uploadFile, uploadFile);
documentRouter.post("/deleteDoc", verifyToken, validation.deleteFile, deleteFile);
documentRouter.post("/getFileById", verifyToken, validation.getFileById, getFileById);

module.exports = documentRouter;

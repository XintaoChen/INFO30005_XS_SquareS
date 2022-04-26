const express = require("express");

const recordRouter = express.Router();
const recordController = require("../controllers/recordController");

// get required datas of single patient
recordRouter.get("/get", (req, res) => {
  recordController.getOneRecordBypatientId(req, res);
});

// get list of comment
recordRouter.get("/comments", (req, res) => {
  recordController.getCommentList(req, res);
});

// insert new record into collection
recordRouter.post("/update", async (req, res) => {
  recordController.postUpdateRecord(req, res);
});

module.exports = recordRouter;

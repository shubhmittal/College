const express = require("express");
const errorController = require("../controllers/error");
const router = express.Router();

router.get("/500", errorController.load500);

module.exports = router;

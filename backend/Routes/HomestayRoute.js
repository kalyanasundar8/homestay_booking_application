const express = require("express");
const {
  getHomeStay,
  createHomestays,
} = require("../controller/HomestayController.js");

const router = express.Router();

router.post("/create_homestays", createHomestays);
router.get("/homestays_avail", getHomeStay);

module.exports = router;

const express = require("express");
const {
  getHomeStay,
  createHomestays,
  getHomestayById,
} = require("../controller/HomestayController.js");

const router = express.Router();

router.post("/create_homestays", createHomestays);
router.get("/homestays_avail", getHomeStay);
router.get("/:id", getHomestayById);

module.exports = router;

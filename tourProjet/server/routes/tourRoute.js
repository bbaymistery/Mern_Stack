const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMid");

const {
  getTours,
  createTour,
  getTour,
  getToursByUser,
  deleteTour,
  updateTour,
  getToursBySearch,
  getToursByTag,
  getRelatedTours,
  likeTour,
} = require("../controller/tourC.js");

//!without auth
router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);
router.get("/", getTours);
router.get("/:id", getTour);

//?with auth
router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/like/:id", auth, likeTour);

module.exports = router;

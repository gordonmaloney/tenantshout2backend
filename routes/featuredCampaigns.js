const express = require("express");
const router = express.Router();
const {
  getFeaturedCampaigns,
  updateFeaturedCampaigns,
} = require("../controllers/featuredCampaignsController");

const authenticateToken = require("../middleware/authMiddleware");

// GET the current featured campaigns list
router.get("/", getFeaturedCampaigns);

// UPDATE the featured campaigns list (protected)
router.put("/", authenticateToken, updateFeaturedCampaigns);

module.exports = router;

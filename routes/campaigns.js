const express = require("express");
const router = express.Router();
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);


const authenticateToken = require('../middleware/authMiddleware');

router.post("/", authenticateToken, createCampaign);
router.put("/:id", authenticateToken, updateCampaign);
router.delete("/:id", authenticateToken, deleteCampaign);


module.exports = router;

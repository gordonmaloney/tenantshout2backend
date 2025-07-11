const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  campaignId: { type: String, required: true, unique: true },
  campaign: {
    id: String,
    title: String,
    host: String,
    channel: String,
    target: String,
    link: String,
    blurb: String,
    subject: String,
    bcc: String,
    customTarget: mongoose.Schema.Types.Mixed,
    customTargetting: String,
    prompts: [
      {
        id: String,
        question: String,
        answerType: String,
        required: Boolean,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
    template: String,
    accordion: [
      {
        q: String,
        a: mongoose.Schema.Types.Mixed,
      },
    ],
  },
});

module.exports = mongoose.model("Campaign", CampaignSchema);

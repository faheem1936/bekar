const dt = require("downloadtiktok");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "autotiktok",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Auto-download TikTok videos without watermark from links",
  commandCategory: "media",
  usages: "Send a TikTok link — no prefix needed",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const msg = event.body;
    if (!msg) return;

    const urls = msg.match(
      /https?:\/\/(?:vm\.)?tiktok\.com\/\S+|https?:\/\/(?:www\.)?tiktok\.com\/@[^\s]+\/video\/\d+/gi
    );
    if (!urls) return;

    for (const url of urls) {
      try {
        await api.sendMessage("⏬ Downloading TikTok...", event.threadID);

        const result = await dt.downloadTiktok(url);
        const videos = dt.filterNoWatermark(result.medias);
        if (!videos.length) throw new Error("Video not found");

        const best = dt.getBestMediaWithinLimit(videos, 50 * 1024 * 1024); // max 50MB
        const buffer = await dt.getBufferFromURL(best.url);

        const filePath = path.join(
          __dirname,
          "cache",
          `tiktok_${Date.now()}.${best.extension}`
        );
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, buffer);

        await api.sendMessage(
          {
            body: "📥 TikTok video downloaded!",
            attachment: fs.createReadStream(filePath),
          },
          event.threadID,
          () => fs.unlinkSync(filePath),
          event.messageID
        );
      } catch (e) {
        console.error("TikTok Download Error:", e.message || e);
        await api.sendMessage(
          "❌ Could not download this TikTok video.",
          event.threadID
        );
      }
    }
  } catch (err) {
    console.error("[autotiktok] General error:", err.message);
  }
};

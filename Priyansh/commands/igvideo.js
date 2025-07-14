const axios = require("axios");
const fs = require("fs");
const path = require("path");
const request = require("request");

const APIFY_TOKEN = "apify_api_SqjcPYf04vp5IeYrm1yr7GcjSdrgS33i2iTx"; // Your token
const IG_REGEX =
  /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p|tv)\/[A-Za-z0-9_-]+/i;

module.exports.config = {
  name: "igvideo",
  version: "1.2.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Auto-download Instagram videos (no prefix)",
  commandCategory: "tools",
  usages: "Just send Instagram video/reel link",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  const msg = event.body;
  if (!msg || !IG_REGEX.test(msg)) return;

  const igUrl = msg.match(IG_REGEX)[0];
  api.sendMessage("⏳ Processing your Instagram video...", event.threadID);

  try {
    const { data: run } = await axios.post(
      `https://api.apify.com/v2/acts/pocesar~download-instagram-video/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      { startUrls: [{ url: igUrl }] }
    );

    if (!run || run.length === 0 || !run[0].downloadLink) {
      return api.sendMessage("❌ Video not found or private.", event.threadID);
    }

    const videoUrl = run[0].downloadLink;
    const tempPath = path.join(__dirname, "igtemp.mp4");
    const file = fs.createWriteStream(tempPath);

    await new Promise((resolve, reject) => {
      request(videoUrl).pipe(file).on("finish", resolve).on("error", reject);
    });

    await api.sendMessage(
      {
        body: "✅ Here's your Instagram video:",
        attachment: fs.createReadStream(tempPath),
      },
      event.threadID,
      () => fs.unlinkSync(tempPath)
    );
  } catch (err) {
    console.error("❌ IG Downloader Error:", err.message || err);
    return api.sendMessage(
      "❌ Failed to download video. Try again later.",
      event.threadID
    );
  }
};

module.exports.run = () => {};

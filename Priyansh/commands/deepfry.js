const Jimp = require("jimp");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "deepfry",
  version: "3.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description: "Apply deep-fry meme filter to profile picture",
  commandCategory: "edit-image",
  usages: "[@mention or reply]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  try {
    const uid =
      event.type === "message_reply"
        ? event.messageReply.senderID
        : Object.keys(event.mentions)[0] || event.senderID;

    const avatarUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
    const imgBuffer = (
      await axios.get(avatarUrl, { responseType: "arraybuffer" })
    ).data;

    const image = await Jimp.read(imgBuffer);

    // Apply deep-fry style effects using only core-supported Jimp filters
    image
      .resize(512, 512)
      .brightness(0.2)
      .contrast(0.5)
      .convolute([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ]) // sharpen
      .quality(25);

    // Save output
    const outPath = path.join(__dirname, "cache", `deepfry_${uid}.jpg`);
    await image.writeAsync(outPath);

    return api.sendMessage(
      {
        body: "🔥 Deepfried and overcooked!",
        attachment: fs.createReadStream(outPath),
      },
      event.threadID,
      () => fs.unlinkSync(outPath),
      event.messageID
    );
  } catch (err) {
    console.error("Deepfry Error:", err.message);
    return api.sendMessage(
      "❌ Failed to deepfry profile picture.",
      event.threadID
    );
  }
};

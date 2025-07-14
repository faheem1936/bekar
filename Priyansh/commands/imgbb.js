const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const API_KEY = "5bae8fa0609c95b634ac83e1f91921e9"; // ✅ Your ImgBB key

module.exports.config = {
  name: "imgbb",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Upload replied image to ImgBB and return public link",
  commandCategory: "tools",
  usages: "Reply to an image with .imgbb",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, messageReply } = event;

  if (
    !messageReply ||
    !messageReply.attachments ||
    messageReply.attachments.length === 0 ||
    messageReply.attachments[0].type !== "photo"
  ) {
    return api.sendMessage(
      "❌ Please reply to an image to upload it to ImgBB.",
      threadID,
      messageID
    );
  }

  const imageUrl = messageReply.attachments[0].url;
  const tempPath = path.join(__dirname, "cache", `imgbb_${Date.now()}.jpg`);

  try {
    // Download image from Facebook
    const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(tempPath, res.data);

    // Convert to base64
    const imageBase64 = fs.readFileSync(tempPath, { encoding: "base64" });

    // Upload to ImgBB
    const response = await axios.post("https://api.imgbb.com/1/upload", null, {
      params: {
        key: API_KEY,
        image: imageBase64,
      },
    });

    // Clean up
    fs.unlinkSync(tempPath);

    const uploadedURL = response.data?.data?.url;
    return api.sendMessage(
      `✅ Image uploaded:\n${uploadedURL}`,
      threadID,
      messageID
    );
  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    return api.sendMessage(
      "⚠️ Upload failed. Please try again later.",
      threadID,
      messageID
    );
  }
};

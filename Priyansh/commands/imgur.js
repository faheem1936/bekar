const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const FormData = require("form-data");

const IMGUR_CLIENT_ID = "YOUR_IMGUR_CLIENT_ID"; // Replace this with your Imgur Client ID

module.exports.config = {
  name: "imgurupload",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Upload replied image to Imgur (command-based)",
  commandCategory: "media",
  usages: ".imgurupload (reply to a photo)",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  if (
    !event.messageReply ||
    !event.messageReply.attachments ||
    event.messageReply.attachments.length === 0
  ) {
    return api.sendMessage(
      "❌ Please reply to a photo to upload to Imgur.",
      event.threadID,
      event.messageID
    );
  }

  const attachment = event.messageReply.attachments[0];
  if (attachment.type !== "photo") {
    return api.sendMessage(
      "⚠️ Only photo attachments are supported.",
      event.threadID,
      event.messageID
    );
  }

  try {
    const imgURL = attachment.url;
    const res = await axios.get(imgURL, { responseType: "arraybuffer" });
    const fileName = path.join(__dirname, "cache", `imgur_${Date.now()}.jpg`);
    fs.writeFileSync(fileName, res.data);

    const form = new FormData();
    form.append("image", fs.createReadStream(fileName));

    const upload = await axios.post("https://api.imgur.com/3/image", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
    });

    const imgurLink = upload.data.data.link;

    await api.sendMessage(
      `✅ Uploaded to Imgur:\n${imgurLink}`,
      event.threadID,
      event.messageID
    );
    fs.unlinkSync(fileName);
  } catch (err) {
    console.error("Imgur upload error:", err.message);
    return api.sendMessage(
      "❌ Failed to upload image to Imgur.",
      event.threadID,
      event.messageID
    );
  }
};

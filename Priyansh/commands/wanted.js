const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "wanted",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Faheem + ChatGPT",
  description: "Generate a WANTED poster with avatar and custom name",
  commandCategory: "meme",
  usages: "[name] or [reply/tag]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, messageReply, senderID, mentions } = event;

  // Get image source
  let imgURL;
  if (messageReply?.attachments?.[0]?.type === "photo") {
    imgURL = messageReply.attachments[0].url;
  } else if (Object.keys(mentions).length > 0) {
    const uid = Object.keys(mentions)[0];
    imgURL = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
  } else {
    imgURL = `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;
  }

  // Get name from input or fallback to sender name
  let name = args.join(" ").trim();
  if (!name) {
    try {
      const info = await api.getUserInfo(senderID);
      name = info[senderID]?.name || "Unknown";
    } catch {
      name = "Unknown";
    }
  }

  const apiURL = `https://api.popcat.xyz/v2/wanted?image=${encodeURIComponent(
    imgURL
  )}&name=${encodeURIComponent(name)}`;
  const filePath = path.join(__dirname, "cache", `wanted_${Date.now()}.jpg`);

  try {
    const res = await axios.get(apiURL, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, res.data);

    return api.sendMessage(
      {
        body: `🔍 WANTED: ${name.toUpperCase()}`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Wanted API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to create WANTED poster. Please try again.",
      threadID,
      messageID
    );
  }
};

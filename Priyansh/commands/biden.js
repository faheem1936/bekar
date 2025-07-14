const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "biden",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate a Biden meme with your text",
  commandCategory: "meme",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const { threadID, messageID } = event;

  if (!text) {
    return api.sendMessage(
      "🗣️ Please provide text for Biden to say.\n\nExample:\n.biden pop cat is horni",
      threadID,
      messageID
    );
  }

  const apiUrl = `https://api.popcat.xyz/v2/biden?text=${encodeURIComponent(
    text
  )}`;
  const filePath = path.join(__dirname, "cache", `biden_${Date.now()}.jpg`);

  try {
    const res = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, res.data);

    return api.sendMessage(
      {
        body: "🇺🇸 Here's your Biden speech:",
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Biden API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to generate meme. Try again later.",
      threadID,
      messageID
    );
  }
};

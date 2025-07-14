const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "facts",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem ",
  description: "Generate a stylized fact image from your text",
  commandCategory: "meme",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const { threadID, messageID } = event;

  if (!text) {
    return api.sendMessage(
      "🧐 Please enter some text to make into a fact.\n\nExample:\n.facts Honey never spoils",
      threadID,
      messageID
    );
  }

  const apiUrl = `https://api.popcat.xyz/v2/facts?text=${encodeURIComponent(
    text
  )}`;
  const filePath = path.join(__dirname, "cache", `facts_${Date.now()}.png`);

  try {
    const res = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, res.data);

    return api.sendMessage(
      {
        body: `🧠 Fun Fact:`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Facts API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to generate fact image. Try again later.",
      threadID,
      messageID
    );
  }
};

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "unforgivable",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate unforgivable meme ",
  commandCategory: "meme",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const { threadID, messageID } = event;

  if (!text) {
    return api.sendMessage("❌ Please enter some text.\n\nExample:\n.unforgivable Popcat API is trash", threadID, messageID);
  }

  const url = `https://api.popcat.xyz/v2/unforgivable?text=${encodeURIComponent(text)}`;
  const filePath = path.join(__dirname, "cache", `unforgivable_${Date.now()}.jpg`);

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, response.data);

    return api.sendMessage({
      body: "🩸 Here's your unforgivable meme:",
      attachment: fs.createReadStream(filePath),
    }, threadID, () => fs.unlinkSync(filePath), messageID);

  } catch (err) {
    console.error("❌ Unforgivable API error:", err.message);
    return api.sendMessage("⚠️ Failed to generate meme. Try again later.", threadID, messageID);
  }
};

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "draki",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Make a Drake meme from your text",
  commandCategory: "meme",
  usages: "[text1 | text2]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  const { threadID, messageID } = event;

  if (!input.includes("|")) {
    return api.sendMessage(
      "📌 Usage:\n.drake text1 | text2\n\nExample:\n.drake studying | sleeping",
      threadID,
      messageID
    );
  }

  const [text1, text2] = input.split("|").map((t) => t.trim());
  const url = `https://api.popcat.xyz/drake?text1=${encodeURIComponent(
    text1
  )}&text2=${encodeURIComponent(text2)}`;
  const filePath = path.join(__dirname, "cache", `drake_${Date.now()}.jpg`);

  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, res.data);

    return api.sendMessage(
      {
        body: "🔥 Here's your Drake meme!",
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Drake API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to generate Drake meme. Try again later or check your input.",
      threadID,
      messageID
    );
  }
};

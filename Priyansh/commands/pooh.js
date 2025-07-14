const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "pooh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate Pooh meme with two text phrases",
  commandCategory: "meme",
  usages: "[text1 | text2]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  const { threadID, messageID } = event;

  if (!input.includes("|")) {
    return api.sendMessage(
      "📌 Usage:\n.pooh text1 | text2\n\nExample:\n.pooh making a Discord bot | making an API",
      threadID,
      messageID
    );
  }

  const [text1, text2] = input.split("|").map((t) => t.trim());

  if (!text1 || !text2) {
    return api.sendMessage(
      "❌ Please provide both texts.",
      threadID,
      messageID
    );
  }

  const apiUrl = `https://api.popcat.xyz/v2/pooh?text1=${encodeURIComponent(
    text1
  )}&text2=${encodeURIComponent(text2)}`;
  const filePath = path.join(__dirname, "cache", `pooh_${Date.now()}.png`);

  try {
    const res = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, res.data);

    return api.sendMessage(
      {
        body: "🐻 Here's your Pooh meme!",
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Pooh Meme Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to generate meme. Try again later.",
      threadID,
      messageID
    );
  }
};

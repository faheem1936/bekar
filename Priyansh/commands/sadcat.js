const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "sadcat",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate sad cat meme from your text",
  commandCategory: "meme",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const { threadID, messageID } = event;

  if (!text) {
    return api.sendMessage(
      "😿 Please enter some text for the sad cat meme.\n\nExample:\n.sadcat I failed my test...",
      threadID,
      messageID
    );
  }

  const apiUrl = `https://api.popcat.xyz/v2/sadcat?text=${encodeURIComponent(text)}`;
  const filePath = path.join(__dirname, "cache", `sadcat_${Date.now()}.png`);

  try {
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, response.data);

    return api.sendMessage(
      {
        body: `😿 Here's your sad cat meme:`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ SadCat API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to generate sad cat meme. Try again later.",
      threadID,
      messageID
    );
  }
};

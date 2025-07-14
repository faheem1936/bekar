const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "screenshoot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem + ChatGPT",
  description: "Take a screenshot of any website",
  commandCategory: "tools",
  usages: "[url]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const url = args.join(" ");
  const { threadID, messageID } = event;

  if (!url || !url.startsWith("http")) {
    return api.sendMessage(
      "❌ Please provide a valid URL.\n\nExample:\n.screenshot https://example.com",
      threadID,
      messageID
    );
  }

  const apiUrl = `https://api.popcat.xyz/v2/screenshot?url=${encodeURIComponent(url)}`;
  const filePath = path.join(__dirname, "cache", `screenshot_${Date.now()}.png`);

  try {
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, response.data);

    return api.sendMessage(
      {
        body: `🖼️ Screenshot of:\n${url}`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Screenshot API Error:", err.message);
    return api.sendMessage(
      "⚠️ Failed to capture screenshot. Please check the URL or try again later.",
      threadID,
      messageID
    );
  }
};

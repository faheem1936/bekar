const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const mime = require("mime-types");

module.exports.config = {
  name: "autodownload",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Auto download and reply when a direct file link is sent",
  commandCategory: "utility",
  usages: "No prefix needed. Just send a direct file URL.",
  cooldowns: 1,
};

module.exports.handleEvent = async function ({ api, event }) {
  const message = event.body;
  if (!message) return;

  const urlRegex =
    /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|mp4|pdf|zip|rar|docx|pptx|xlsx|mp3|mkv|webm|txt|svg|webp))/gi;
  const match = message.match(urlRegex);
  if (!match) return;

  for (const url of match) {
    try {
      const res = await axios.get(url, { responseType: "arraybuffer" });
      const contentType = res.headers["content-type"];
      const ext = mime.extension(contentType) || "bin";
      const filename = `file_${Date.now()}.${ext}`;
      const filePath = path.join(__dirname, "cache", filename);

      fs.writeFileSync(filePath, res.data);

      await api.sendMessage(
        {
          body: `📥 Auto-downloaded file from link:\n${url}`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    } catch (err) {
      console.error("AutoDownload Error:", err.message);
    }
  }
};

module.exports.run = () => {}; // Not a prefix command

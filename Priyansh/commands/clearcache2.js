const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "clearcache2",
  version: "1.0.0",
  hasPermssion: 2, // Only bot admins
  credits: "Faheem King",
  description: "Clear all cache files and folders",
  commandCategory: "System",
  usages: "clearcache",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const cachePath = path.join(__dirname, "cache");

  if (!fs.existsSync(cachePath)) {
    return api.sendMessage(
      "❌ Cache folder not found.",
      event.threadID,
      event.messageID
    );
  }

  let deleted = 0;

  try {
    const files = fs.readdirSync(cachePath);

    for (const file of files) {
      const filePath = path.join(cachePath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
      deleted++;
    }

    api.sendMessage(
      `✅ Cleared cache.\n🗑️ Files/folders removed: ${deleted}`,
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(
      "❌ Error while clearing cache!",
      event.threadID,
      event.messageID
    );
  }
};

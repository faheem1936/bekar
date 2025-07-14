const fs = require("fs-extra");
const path = require("path");

const PREFIX_FILE = path.join(__dirname, "prefix.json");

module.exports.config = {
  name: "prefixset",
  version: "1.0.1",
  hasPermission: 0, // 0 = anyone can use
  credits: "Faheem King",
  description: "Change or check the bot's prefix per group",
  commandCategory: "system",
  usages: "prefix [newPrefix]",
  cooldowns: 3,
};

function loadPrefixes() {
  return fs.existsSync(PREFIX_FILE)
    ? JSON.parse(fs.readFileSync(PREFIX_FILE))
    : {};
}

function savePrefixes(data) {
  fs.writeFileSync(PREFIX_FILE, JSON.stringify(data, null, 2));
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const prefixes = loadPrefixes();
  const current = prefixes[threadID] || global.config.PREFIX || ".";

  if (!args[0]) {
    return api.sendMessage(
      `📌 Current prefix: "${current}"\nTo change: prefix [newSymbol]`,
      threadID,
      messageID
    );
  }

  const newPrefix = args[0].trim();

  if (newPrefix.length > 3) {
    return api.sendMessage(
      "❌ Prefix must be 1–3 characters only.",
      threadID,
      messageID
    );
  }

  prefixes[threadID] = newPrefix;
  savePrefixes(prefixes);

  return api.sendMessage(
    `✅ Prefix updated to: "${newPrefix}" for this group.`,
    threadID,
    messageID
  );
};

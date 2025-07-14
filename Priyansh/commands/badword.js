const fs = require("fs-extra");
const path = require("path");

const WORDS_FILE = path.join(__dirname, "badwords.json");

module.exports.config = {
  name: "badwords",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem + ChatGPT",
  description: "Manage bad word list",
  commandCategory: "moderation",
  usages: ".badwords list / add [word] / remove [word]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const [action, wordRaw] = args;
  const word = wordRaw?.toLowerCase();

  if (!fs.existsSync(WORDS_FILE))
    fs.writeFileSync(WORDS_FILE, JSON.stringify([]));
  let words = JSON.parse(fs.readFileSync(WORDS_FILE));

  switch (action) {
    case "list":
      return api.sendMessage(
        `📃 Bad Words:\n- ${words.join("\n- ")}`,
        threadID,
        messageID
      );
    case "add":
      if (!word)
        return api.sendMessage("⚠️ Provide word to add.", threadID, messageID);
      if (words.includes(word))
        return api.sendMessage("❌ Already exists.", threadID, messageID);
      words.push(word);
      fs.writeFileSync(WORDS_FILE, JSON.stringify(words, null, 2));
      return api.sendMessage(`✅ Added: ${word}`, threadID, messageID);
    case "remove":
      if (!word)
        return api.sendMessage(
          "⚠️ Provide word to remove.",
          threadID,
          messageID
        );
      if (!words.includes(word))
        return api.sendMessage("❌ Not in list.", threadID, messageID);
      words = words.filter((w) => w !== word);
      fs.writeFileSync(WORDS_FILE, JSON.stringify(words, null, 2));
      return api.sendMessage(`🗑 Removed: ${word}`, threadID, messageID);
    default:
      return api.sendMessage(
        "📘 Usage:\n.badwords list\n.badwords add [word]\n.badwords remove [word]",
        threadID,
        messageID
      );
  }
};

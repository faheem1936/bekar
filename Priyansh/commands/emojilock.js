const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "emojilock",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem King",
  description: "Lock and protect the group emoji from being changed",
  commandCategory: "group",
  usages: "emojilock [on/off/status]",
  cooldowns: 5,
};

const lockFile = path.join(__dirname, "emojiLocks.json");

// Load or create lock database
function loadLocks() {
  return fs.existsSync(lockFile) ? JSON.parse(fs.readFileSync(lockFile)) : {};
}
function saveLocks(data) {
  fs.writeFileSync(lockFile, JSON.stringify(data, null, 2));
}

// 🔁 Auto revert emoji when changed
module.exports.handleEvent = async function ({ api, event }) {
  if (event.logMessageType !== "log:thread-icon") return;

  const locks = loadLocks();
  const threadID = event.threadID;

  if (locks[threadID]?.locked) {
    const originalEmoji = locks[threadID].emoji;
    try {
      await api.changeThreadEmoji(originalEmoji, threadID);
      api.sendMessage(
        `🚫 Emoji change is locked. Reverted back to ${originalEmoji}`,
        threadID
      );
    } catch (err) {
      console.error("❌ Failed to revert emoji:", err.message);
    }
  }
};

// 🛠 Run command to enable/disable emoji lock
module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args[0]?.toLowerCase();
  const locks = loadLocks();

  switch (input) {
    case "on": {
      const info = await api.getThreadInfo(threadID);
      const currentEmoji = info.emoji || "👍";

      locks[threadID] = {
        locked: true,
        emoji: currentEmoji,
      };
      saveLocks(locks);
      return api.sendMessage(
        `🔒 Emoji lock is now enabled.\n🔁 Locked to: ${currentEmoji}`,
        threadID,
        messageID
      );
    }

    case "off": {
      delete locks[threadID];
      saveLocks(locks);
      return api.sendMessage(
        `🔓 Emoji lock disabled. Group members can now change the emoji.`,
        threadID,
        messageID
      );
    }

    case "status": {
      if (locks[threadID]?.locked) {
        return api.sendMessage(
          `✅ Emoji lock is active.\n🔒 Current locked emoji: ${locks[threadID].emoji}`,
          threadID,
          messageID
        );
      } else {
        return api.sendMessage(
          `ℹ️ Emoji lock is not active.`,
          threadID,
          messageID
        );
      }
    }

    default:
      return api.sendMessage(
        `📌 Usage:\n• emojilock on\n• emojilock off\n• emojilock status`,
        threadID,
        messageID
      );
  }
};

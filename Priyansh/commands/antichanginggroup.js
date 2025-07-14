const fs = require("fs");
const path = __dirname + "/antichange.json";

// Create storage file if not exists
if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
let data = JSON.parse(fs.readFileSync(path));

module.exports.config = {
  name: "antichangegroup",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem Akhtar",
  description: "Prevent group name, emoji, theme, image, nick changes",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, logMessageType, logMessageData } = event;

  if (!data[threadID]) return;
  if (!data[threadID].enabled) return;

  const restore = async () => {
    try {
      const info = await api.getThreadInfo(threadID);

      // Revert group name
      if (logMessageType === "log:thread-name") {
        await api.setTitle(info.name, threadID);
      }

      // Revert emoji
      if (logMessageType === "log:thread-emoji") {
        await api.changeThreadEmoji(info.emoji, threadID);
      }

      // Revert theme
      if (logMessageType === "log:thread-color") {
        await api.changeThreadColor(info.color, threadID);
      }

      // Revert nickname
      if (logMessageType === "log:thread-nickname") {
        const { participant_id, nickname } = logMessageData;
        await api.changeNickname(nickname, threadID, participant_id);
      }

      // Revert admin role changes
      if (logMessageType === "log:thread-admins") {
        const { admin_id, TARGET_ID, event } = logMessageData;
        const makeAdmin = event === "add_admin";
        await api.changeAdminStatus(threadID, TARGET_ID, !makeAdmin);
      }

      // Revert group image
      if (logMessageType === "log:thread-icon") {
        await api.changeGroupImage(null, threadID); // remove
      }
    } catch (e) {
      console.error("❌ Error restoring group:", e);
    }
  };

  // Call restore if detected a group change
  const watchTypes = [
    "log:thread-name",
    "log:thread-emoji",
    "log:thread-nickname",
    "log:thread-color",
    "log:thread-admins",
    "log:thread-icon",
  ];

  if (watchTypes.includes(logMessageType)) {
    await restore();
  }
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;
  const toggle = args[0]?.toLowerCase();

  if (!["on", "off"].includes(toggle)) {
    const status = data[threadID]?.enabled ? "🟢 ON" : "🔴 OFF";
    return api.sendMessage(
      `📛 Anti-Group-Change is currently: ${status}\nUse: .antichangegroup on/off`,
      threadID,
      messageID
    );
  }

  if (!data[threadID]) data[threadID] = {};
  data[threadID].enabled = toggle === "on";

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  return api.sendMessage(
    `✅ Anti-Group-Change is now: ${toggle.toUpperCase()}`,
    threadID,
    messageID
  );
};

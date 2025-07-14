const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "usermessages",
  version: "1.1.0",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description: "Show total and last 10 messages with content by a user",
  commandCategory: "group",
  usages: "usermessages @mention or reply",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const logPath = path.join(__dirname, "group_members.json");
  const { threadID, messageID, mentions, messageReply } = event;

  if (!fs.existsSync(logPath)) {
    return api.sendMessage(
      "❌ No tracking data yet. Let the bot run to collect user messages.",
      threadID,
      messageID
    );
  }

  const logs = JSON.parse(fs.readFileSync(logPath));
  const groupData = logs[threadID];

  if (!groupData || !groupData.recentMessages) {
    return api.sendMessage(
      "❌ No message data for this group yet.",
      threadID,
      messageID
    );
  }

  const targetID =
    Object.keys(mentions)[0] || (messageReply && messageReply.senderID);

  if (!targetID) {
    return api.sendMessage(
      "⚠️ Please mention or reply to a user.",
      threadID,
      messageID
    );
  }

  const userInfo = await api.getUserInfo(targetID);
  const name = userInfo[targetID]?.name || "Unknown";

  const allMessages = groupData.recentMessages;
  const userMessages = allMessages.filter((msg) => msg.userID === targetID);
  const total = userMessages.length;

  const last10 =
    userMessages
      .slice(-10)
      .reverse()
      .map((msg, i) => {
        const time = moment(msg.timestamp)
          .tz("Asia/Karachi")
          .format("DD MMM, hh:mm A");
        const text = msg.text || "🖼️ [No text or media message]";
        return `${i + 1}. 🕒 ${time}\n💬 ${text}`;
      })
      .join("\n\n") || "— No recent messages —";

  const reply = `🧾 Messages for: ${name} (${targetID})

🔢 Total Messages Tracked: ${total}

📥 Last 10 Messages:
${last10}`;

  return api.sendMessage(reply, threadID, messageID);
};

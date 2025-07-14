const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "chuzauser",
  version: "2.0.0",
  hasPermission: 2,
  credits: "Faheem Akhtar",
  description:
    "View chuza AI history of a specific user by UID, mention, or reply",
  commandCategory: "AI",
  usages: ".chuzauser [uid/@mention/reply]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, mentions, messageReply } = event;
  const dataPath = path.join(__dirname, "chuzaData.json");

  // Read user ID from mention / reply / args
  let targetID =
    Object.keys(mentions)[0] ||
    (messageReply ? messageReply.senderID : null) ||
    args[0];

  if (!targetID) {
    return api.sendMessage(
      "⚠️ Usage:\n• .chuzauser 1000xxxxxx\n• .chuzauser @mention\n• .chuzauser (reply to msg)",
      threadID,
      messageID
    );
  }

  // Load data
  if (!fs.existsSync(dataPath)) {
    return api.sendMessage("❌ koi chuza data nahi mila.", threadID, messageID);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (err) {
    return api.sendMessage(
      "❌ Error reading chuzaData.json",
      threadID,
      messageID
    );
  }

  const user = data[targetID];
  if (!user) {
    return api.sendMessage(
      "❌ Is user ID ka koi chuza data nahi mila.",
      threadID,
      messageID
    );
  }

  const name = user.name || "Unknown";
  const total = user.interactions.length;

  const recent = user.interactions
    .slice(-5)
    .reverse()
    .map((entry, i) => {
      const time = moment(entry.timestamp)
        .tz("Asia/Karachi")
        .format("DD MMM YYYY, h:mm A");
      return `#${total - i} — 🕒 ${time}\n🗣️: ${entry.message}\n🤖: ${
        entry.aiReply
      }`;
    })
    .join("\n\n");

  const msg = `📄 Chuza History for: ${name}\n🆔 UID: ${targetID}\n🗂️ Total Messages: ${total}\n\n🕵️ Last 5 Interactions:\n\n${recent}`;

  return api.sendMessage(msg, threadID, messageID);
};

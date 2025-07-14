const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "userinfo",
  version: "1.0.2",
  hasPermission: 0,
  credits: "Faheem King",
  description:
    "Get group join/leave/message info of a mentioned or replied user",
  commandCategory: "group",
  usages: "userinfo @mention or reply",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const logPath = path.join(__dirname, "group_members.json");
  const { threadID, messageID, mentions, messageReply } = event;

  if (!fs.existsSync(logPath)) {
    return api.sendMessage(
      "❌ No tracking data found yet. Let the bot run to collect data first.",
      threadID,
      messageID
    );
  }

  const logs = JSON.parse(fs.readFileSync(logPath));
  const groupData = logs[threadID];

  if (!groupData) {
    return api.sendMessage(
      "❌ No data found for this group yet.",
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

  const history = groupData.history || [];
  const messages = groupData.recentMessages || [];

  const joinLog = history.find(
    (e) => e.userID === targetID && e.action === "joined"
  );
  const joinTime = joinLog
    ? moment(joinLog.timestamp)
        .tz("Asia/Karachi")
        .format("DD MMM YYYY, hh:mm A")
    : "❓ Not recorded";

  const leaveLogs = history.filter(
    (e) => e.userID === targetID && e.action === "left"
  );
  const leaveText = leaveLogs.length
    ? leaveLogs
        .map(
          (e, i) =>
            `#${i + 1}: ${moment(e.timestamp)
              .tz("Asia/Karachi")
              .format("DD MMM, hh:mm A")}`
        )
        .join("\n")
    : "— No leave history —";

  // Total + recent messages
  const allMessages = groupData.recentMessages || [];
  const userMessages = allMessages.filter((m) => m.userID === targetID);
  const totalCount = userMessages.length;

  const lastMessages =
    userMessages
      .slice(-10)
      .reverse()
      .map(
        (e, i) =>
          `${i + 1}. 🕒 ${moment(e.timestamp)
            .tz("Asia/Karachi")
            .format("DD MMM, hh:mm A")}`
      )
      .join("\n") || "— No recent messages —";

  // 🧾 Final result
  const replyText = `👤 Info for: ${name} (${targetID})

🟢 Joined: ${joinTime}
🗨️ Total Messages Tracked: ${totalCount}

📤 Last 10 Messages:
${lastMessages}

🚪 Leave History:
${leaveText}`;

  return api.sendMessage(replyText, threadID, messageID);
};

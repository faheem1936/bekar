const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "botstats",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Faheem Akhtar",
  description: "Show Chuza bot total stats",
  commandCategory: "System",
  usages: ".botstats",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const dataPath = path.join(__dirname, "chuzaData.json");

  if (!fs.existsSync(dataPath)) {
    return api.sendMessage(
      "❌ No data found. Chuza hasn’t been used yet.",
      threadID,
      messageID
    );
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (err) {
    return api.sendMessage(
      "❌ Failed to read chuzaData.json",
      threadID,
      messageID
    );
  }

  const allUsers = Object.values(data);
  const totalUsers = allUsers.length;
  const totalMessages = allUsers.reduce(
    (sum, u) => sum + u.interactions.length,
    0
  );

  const todayDate = moment().tz("Asia/Karachi").format("YYYY-MM-DD");
  const todayUsers = allUsers.filter((u) =>
    u.interactions.some(
      (msg) =>
        moment(msg.timestamp).tz("Asia/Karachi").format("YYYY-MM-DD") ===
        todayDate
    )
  ).length;

  const sorted = allUsers
    .map((u) => ({ name: u.name, count: u.interactions.length }))
    .sort((a, b) => b.count - a.count);

  const mostActive = sorted[0];

  const allTimestamps = allUsers.flatMap((u) =>
    u.interactions.map((i) => i.timestamp)
  );
  const firstActivity = moment(Math.min(...allTimestamps))
    .tz("Asia/Karachi")
    .format("DD MMM, h:mm A");
  const lastActivity = moment(Math.max(...allTimestamps))
    .tz("Asia/Karachi")
    .format("DD MMM, h:mm A");

  const msg = `🤖 Bot Stats Report:
👥 Total Users: ${totalUsers}
💬 Total Messages: ${totalMessages}
📆 Users Active Today: ${todayUsers}

🥇 Most Active User: ${mostActive?.name || "Unknown"} (${
    mostActive?.count || 0
  } msgs)

🕒 First Activity: ${firstActivity}
🕓 Last Activity: ${lastActivity}

🗂️ Data File: chuzaData.json`;

  return api.sendMessage(msg, threadID, messageID);
};

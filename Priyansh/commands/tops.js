const fs = require("fs-extra");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "messageCount.json");

module.exports.config = {
  name: "tops",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem",
  description: "Show top 10 most active users",
  commandCategory: "group",
  usages: ".top",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  // Load stored message counts
  if (!fs.existsSync(DATA_FILE))
    return api.sendMessage("❌ No data found.", threadID, messageID);
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const threadData = data[threadID];

  if (!threadData || Object.keys(threadData).length === 0) {
    return api.sendMessage(
      "⚠️ No message data found for this group.",
      threadID,
      messageID
    );
  }

  // Sort users by message count
  const sorted = Object.entries(threadData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  let reply = `📊 Top 10 Most Active Users:\n`;

  const userInfo = await api.getUserInfo(sorted.map((u) => u[0]));

  for (let i = 0; i < sorted.length; i++) {
    const [userID, count] = sorted[i];
    const name = userInfo[userID]?.name || `User ${userID}`;
    reply += `${i + 1}. ${name}: ${count} messages\n`;
  }

  return api.sendMessage(reply, threadID, messageID);
};

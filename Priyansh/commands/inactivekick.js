const fs = require("fs-extra");

module.exports.config = {
  name: "inactivekick",
  version: "2.0.0",
  hasPermission: 1,
  credits: "Faheem King",
  description: "Kick members inactive for X days (based on activity log)",
  commandCategory: "group",
  usages: "inactivekick [days]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const days = parseInt(args[0]) || 7;
  const limitTime = Date.now() - days * 24 * 60 * 60 * 1000;

  const activityPath = __dirname + "/user_activity.json";

  if (!fs.existsSync(activityPath)) {
    return api.sendMessage(
      "⚠️ Activity data not found. Let the bot run to collect activity first.",
      threadID,
      messageID
    );
  }

  const activity = JSON.parse(fs.readFileSync(activityPath, "utf-8"));
  const threadActivity = activity[threadID] || {};

  const threadInfo = await api.getThreadInfo(threadID);
  const botID = api.getCurrentUserID();

  let removed = 0;

  for (const user of threadInfo.userInfo) {
    const userID = user.id;
    const isAdmin = threadInfo.adminIDs.some((e) => e.id === userID);

    if (userID === botID || isAdmin) continue;

    const lastSeen = threadActivity[userID] || 0;
    if (lastSeen < limitTime) {
      try {
        await api.removeUserFromGroup(userID, threadID);
        removed++;
        await new Promise((res) => setTimeout(res, 500)); // wait to prevent spam
      } catch (e) {
        console.error(`❌ Couldn’t remove ${user.name}:`, e.message);
      }
    }
  }

  return api.sendMessage(
    `✅ Removed ${removed} user(s) inactive for more than ${days} days.`,
    threadID,
    messageID
  );
};

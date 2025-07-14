module.exports.config = {
  name: "checkadmincmd",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "List all group admins",
  commandCategory: "group",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const adminIDs = threadInfo.adminIDs.map((admin) => admin.id);

    const userInfo = await api.getUserInfo(adminIDs);
    const adminNames = adminIDs.map(
      (id) => userInfo[id]?.name || "Unknown User"
    );

    const msg =
      `👑 Group Admins (${adminIDs.length}):\n\n` +
      adminNames.map((name, i) => `${i + 1}. ${name}`).join("\n");

    return api.sendMessage(msg, event.threadID, event.messageID);
  } catch (err) {
    console.error("❌ Error getting admins:", err);
    return api.sendMessage(
      "❌ Failed to fetch admin list. Make sure the bot is in the group.",
      event.threadID,
      event.messageID
    );
  }
};

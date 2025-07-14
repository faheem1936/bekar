// commands/clearnick.js

module.exports.config = {
  name: "clearnick",
  version: "1.0.0",
  hasPermission: 1, // only bot admin
  credits: "Faheem Akhtar",
  description: "Clear all nicknames in the group",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const threadID = event.threadID;
    const threadInfo = await api.getThreadInfo(threadID);
    const members = threadInfo.userInfo;

    for (const user of members) {
      await api.changeNickname("", threadID, user.id);
    }

    return api.sendMessage("✅ All nicknames have been cleared!", threadID);
  } catch (err) {
    console.error("❌ Nickname clear error:", err);
    return api.sendMessage("❌ Failed to clear nicknames.", event.threadID);
  }
};

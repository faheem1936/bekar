const axios = require("axios");

module.exports.config = {
  name: "crushs",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Faheem",
  description: "Pick a random crush from the group and mention them 💘",
  commandCategory: "fun",
  usages: ".crush",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, senderID, messageID } = event;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const members = threadInfo.participantIDs.filter((id) => id !== senderID);

    if (members.length === 0) {
      return api.sendMessage(
        "😕 No one else found in this group!",
        threadID,
        messageID
      );
    }

    const crushID = members[Math.floor(Math.random() * members.length)];
    const userInfo = await api.getUserInfo(crushID);
    const crushName = userInfo[crushID]?.name || "someone special";
    const percent = Math.floor(Math.random() * 101);

    return api.sendMessage(
      {
        body: `💘 Your crush is: ${crushName}\n❤️ Love Match: ${percent}%`,
        mentions: [
          {
            tag: crushName,
            id: crushID,
          },
        ],
      },
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ .crush error:", err);
    return api.sendMessage(
      "⚠️ Could not find your crush. Try again later.",
      threadID,
      messageID
    );
  }
};

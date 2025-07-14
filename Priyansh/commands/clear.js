module.exports.config = {
  name: "clear",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem + ChatGPT",
  description: "Clear bot's recent messages in the thread",
  commandCategory: "moderation",
  usages: ".clear",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const botID = api.getCurrentUserID();

  try {
    const history = await api.getThreadHistory(threadID, 100, null);
    const botMessages = history.filter((msg) => msg.senderID === botID);

    for (const msg of botMessages) {
      await api.unsendMessage(msg.messageID);
    }

    return api.sendMessage(
      `🧹 Cleared ${botMessages.length} of my own messages.`,
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ Error in .clear:", err);
    return api.sendMessage(
      "⚠️ Failed to clear messages. Try again later.",
      threadID,
      messageID
    );
  }
};

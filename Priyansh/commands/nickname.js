module.exports.config = {
  name: "nick",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem Akhtar",
  description: "Change the nickname of a mentioned user",
  commandCategory: "group",
  usages: "@mention [new nickname]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;

  // Check if user mentioned someone
  const mentionID = Object.keys(event.mentions)[0];
  if (!mentionID) {
    return api.sendMessage(
      "❌ Mention someone to set nickname.\n\nUsage:\n.nick @user new nickname",
      threadID,
      messageID
    );
  }

  // Extract nickname text after mention
  const newNick = args.slice(1).join(" ");
  if (!newNick) {
    return api.sendMessage(
      "❌ Please provide the new nickname.\n\nExample:\n.nick @user Pro King",
      threadID,
      messageID
    );
  }

  try {
    await api.changeNickname(newNick, threadID, mentionID);
    return api.sendMessage(
      `✅ Nickname of ${event.mentions[mentionID]} changed to "${newNick}"`,
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ Nickname change failed:", err);
    return api.sendMessage(
      "❌ Failed to change nickname. Make sure the bot has admin rights.",
      threadID,
      messageID
    );
  }
};

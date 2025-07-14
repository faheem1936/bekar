module.exports.config = {
  name: "fakeadmin",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Fake admin promotion message",
  commandCategory: "fun",
  usages: "[tag/reply user]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, mentions, type, senderID } = event;

  let targetID = null;
  let name = null;

  // If message is a reply
  if (type === "message_reply" && event.messageReply.senderID) {
    targetID = event.messageReply.senderID;
    name = (await api.getUserInfo(targetID))[targetID].name;
  }

  // If user is tagged
  else if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    name = mentions[targetID];
  }

  // No user selected
  else {
    return api.sendMessage(
      "❌ Please tag or reply to a user to fake promote as admin.",
      threadID,
      messageID
    );
  }

  const fakeMsg = `✅ ${name} has been promoted to group admin!\n\n🔒 Permissions granted.\n👑 Respect the new boss.`;

  return api.sendMessage(
    {
      body: fakeMsg,
      mentions: [{ tag: name, id: targetID }],
    },
    threadID,
    messageID
  );
};

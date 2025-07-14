module.exports.config = {
  name: "welcome2",
  version: "1.2.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Send welcome message with mention or reply",
  commandCategory: "fun",
  usages: "[mention/reply/name]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let targetID, targetName;

  // If mentioned
  if (Object.keys(event.mentions).length > 0) {
    targetID = Object.keys(event.mentions)[0];
  }

  // If replied
  else if (event.messageReply) {
    targetID = event.messageReply.senderID;
  }

  // If just text
  else {
    const name = args.join(" ") || "New Member";
    return api.sendMessage(`👋 Welcome, ${name}! 🎉`, event.threadID);
  }

  // Get user name
  const userInfo = await api.getUserInfo(targetID);
  targetName = userInfo[targetID]?.name || "there";

  const message = `
🌟✨ 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 ✨🌟

💖 Hey @${targetName}!
We're so happy to have you here 💫

🌈 Be kind, chill, and vibe with us 💬
🎉 Let’s laugh, share, grow and make memories!

— Team 💌
`;

  return api.sendMessage(
    {
      body: message,
      mentions: [{ tag: `@${targetName}`, id: targetID }],
    },
    event.threadID
  );
};

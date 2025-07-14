module.exports.config = {
  name: "spam2",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Faheem Akhtar",
  description: "Spam mentioned user",
};

module.exports.run = async ({ api, event }) => {
  const mention = Object.keys(event.mentions)[0];
  if (!mention)
    return api.sendMessage("❌ Mention someone to spam.", event.threadID);
  for (let i = 0; i < 10; i++) {
    api.sendMessage(
      { body: `🔥 Spam ${i + 1}`, mentions: [{ id: mention }] },
      event.threadID
    );
  }
};

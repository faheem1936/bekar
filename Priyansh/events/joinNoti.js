module.exports.config = {
  name: "botJoinAnnounce",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Faheem Akhtar",
  description: "Send text-only message when bot joins a group",
};

module.exports.run = async function ({ api, event }) {
  const botID = api.getCurrentUserID();
  const { threadID, logMessageData } = event;

  const isBotJoining = logMessageData?.addedParticipants?.some(
    (p) => p.userFbId == botID
  );
  if (!isBotJoining) return;

  const message = `🤖 Bot connected successfully!\n\n👑 Owner: Faheem Akhtar\n🔗 Facebook: https://www.facebook.com/faheemakhtar001`;

  return api.sendMessage(message, threadID);
};

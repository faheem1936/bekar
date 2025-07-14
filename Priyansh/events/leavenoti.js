module.exports.config = {
  name: "leaveAnnounce",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Faheem Akhtar",
  description:
    "Sends a goodbye message when someone leaves the group (text only)",
};

module.exports.run = async function ({ api, event }) {
  const { threadID, logMessageData } = event;
  const userID = logMessageData.leftParticipantFbId;

  // Skip if bot itself left
  if (userID == api.getCurrentUserID()) return;

  try {
    const info = await api.getUserInfo(userID);
    const name = info[userID]?.name || "Someone";

    return api.sendMessage(
      {
        body: `👋 Goodbye ${name}, see you next time! We will miss you.`,
        mentions: [{ tag: name, id: userID }],
      },
      threadID
    );
  } catch (error) {
    console.error("❌ LeaveAnnounce Error:", error);
    return api.sendMessage(
      "👋 Someone just left the group. See you next time!",
      threadID
    );
  }
};

module.exports.config = {
  name: "groupstats",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Show group statistics",
  commandCategory: "group",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const threadID = event.threadID;

  try {
    const threadInfo = await api.getThreadInfo(threadID);

    const memberCount = threadInfo.participantIDs.length;
    const adminCount = threadInfo.adminIDs.length;
    const groupName = threadInfo.threadName || "Unnamed Group";
    const approvalMode = threadInfo.approvalMode ? "🔒 On" : "🔓 Off";

    let male = 0;
    let female = 0;
    let unknown = 0;

    const userInfo = await api.getUserInfo(...threadInfo.participantIDs);
    for (const id in userInfo) {
      const gender = userInfo[id].gender;
      if (gender === "MALE") male++;
      else if (gender === "FEMALE") female++;
      else unknown++;
    }

    const msg = `📊 Group Stats for "${groupName}"
  
  👥 Total Members: ${memberCount}
  🛡️ Admins: ${adminCount}
  🧑‍🤝‍🧑 Gender Breakdown:
     👨 Males: ${male}
     👩 Females: ${female}
     ❓ Unknown: ${unknown}
  
  🛂 Approval Mode: ${approvalMode}
  🆔 Thread ID: ${threadID}`;

    return api.sendMessage(msg, threadID, event.messageID);
  } catch (err) {
    console.error("Error fetching group stats:", err);
    return api.sendMessage(
      "❌ Unable to fetch group stats.",
      threadID,
      event.messageID
    );
  }
};

const fs = require("fs-extra");
const path = __dirname + "/antibot-config.json";

if (!fs.existsSync(path)) fs.writeJsonSync(path, {});

module.exports.config = {
  name: "antibot",
  version: "2.0.0",
  hasPermission: 1,
  credits: "Faheem King",
  description:
    "Kick/leave if other bots join group — global and per-thread toggle",
  commandCategory: "moderation",
  usages: ".antibot on/off [all|<tid>]",
  cooldowns: 5,
};

const warnedThreads = new Set();

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, logMessageData, logMessageType } = event;
  if (logMessageType !== "log:subscribe") return;

  const config = fs.readJsonSync(path);
  const isEnabled = config.hasOwnProperty(threadID) ? config[threadID] : true;
  if (!isEnabled) return;

  const addedMembers = logMessageData.addedParticipants || [];

  for (const user of addedMembers) {
    const uid = user.userFbId || user.userId;

    if (uid == api.getCurrentUserID()) continue;

    if (
      uid.startsWith("6155") ||
      uid.startsWith("10008") ||
      uid.startsWith("100081")
    ) {
      if (warnedThreads.has(threadID)) return;

      warnedThreads.add(threadID);

      try {
        await api.sendMessage(
          "⚠️ Warning: A suspected bot joined the group.\nAdmins, please verify!\nIf another bot joins, I will leave the group automatically.",
          threadID
        );

        setTimeout(async () => {
          await api.sendMessage(
            "🚨 Bot activity detected. Leaving group for safety.",
            threadID
          );
          await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
        }, 10_000);
      } catch (err) {
        console.error("Error in antibot:", err.message);
      }
    }
  }
};

module.exports.run = async function ({ api, event, args }) {
  const config = fs.readJsonSync(path);
  const action = args[0];
  const target = args[1];

  if (!action || !["on", "off"].includes(action)) {
    return api.sendMessage(
      "🛡️ Usage:\n.antibot on/off [all | <threadID>]\nExamples:\n.antibot on\n.antibot off all\n.antibot on 1234567890",
      event.threadID
    );
  }

  // Handle ON action
  if (action === "on") {
    if (target === "all") {
      const allThreads = await api.getThreadList(100, null, ["INBOX"]);
      for (const thread of allThreads) {
        config[thread.threadID] = true;
      }
      fs.writeJsonSync(path, config, { spaces: 2 });
      return api.sendMessage(
        "✅ Antibot ENABLED for all threads.",
        event.threadID
      );
    }

    const tid = target || event.threadID;
    config[tid] = true;
    fs.writeJsonSync(path, config, { spaces: 2 });
    return api.sendMessage(
      `✅ Antibot ENABLED for thread: ${tid}`,
      event.threadID
    );
  }

  // Handle OFF action
  if (action === "off") {
    if (target === "all") {
      Object.keys(config).forEach((tid) => (config[tid] = false));
      fs.writeJsonSync(path, config, { spaces: 2 });
      return api.sendMessage(
        "❌ Antibot DISABLED for all threads.",
        event.threadID
      );
    }

    const tid = target || event.threadID;
    config[tid] = false;
    fs.writeJsonSync(path, config, { spaces: 2 });
    return api.sendMessage(
      `❌ Antibot DISABLED for thread: ${tid}`,
      event.threadID
    );
  }
};

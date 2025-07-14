const fs = require("fs");
const path = require("path");
const axios = require("axios");

const replyMap = new Map();
const ADMIN_UID = ["100029722602303"]; // Replace with your real Facebook UID

module.exports.config = {
  name: "notiall",
  version: "1.3.0",
  hasPermission: 2,
  credits: "Faheem Akhtar",
  description: "Broadcast message to all groups & get user replies",
  commandCategory: "system",
  usages: "announceall [message] (or reply with file/image)",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!ADMIN_UID.includes(senderID))
    return api.sendMessage(
      "❌ You don't have permission to use this command.",
      threadID
    );

  const msgText =
    args.join(" ") || (event.messageReply && event.messageReply.body);
  if (!msgText)
    return api.sendMessage(
      "❗ Provide a message or reply to a message.",
      threadID,
      messageID
    );

  let attachment = [];
  if (
    event.type === "message_reply" &&
    event.messageReply.attachments.length > 0
  ) {
    try {
      const fileURL = event.messageReply.attachments[0].url;
      const ext = path.extname(fileURL.split("?")[0]);
      const filePath = __dirname + `/cache/announce${ext}`;
      const res = await axios.get(fileURL, { responseType: "stream" });
      res.data.pipe(fs.createWriteStream(filePath));
      await new Promise((resolve) => res.data.on("end", resolve));
      attachment.push(fs.createReadStream(filePath));
    } catch (e) {
      return api.sendMessage("❌ Error downloading attachment.", threadID);
    }
  }

  const allThreads = await api.getThreadList(100, null, ["INBOX"]);
  let success = 0,
    failed = 0;

  for (const thread of allThreads) {
    try {
      const msg = await api.sendMessage(
        {
          body: `📢 Message from Bot Operator

🕒 ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" })}
👤 Operator: Faheem Akhtar 🤍🌝

📨 ${msgText}

🔁 Reply to this message to respond.`,
          attachment,
        },
        thread.threadID
      );

      replyMap.set(msg.messageID, {
        userTID: thread.threadID,
        userUID: thread.participantIDs || [],
      });

      success++;
    } catch (e) {
      failed++;
    }
  }

  if (attachment.length > 0) attachment[0].destroy?.();
  return api.sendMessage(`✅ Sent: ${success}\n❌ Failed: ${failed}`, threadID);
};

module.exports.handleReply = async function ({ api, event }) {
  const { messageID, senderID, threadID, body, messageReply } = event;

  // User replies to announcement
  if (messageReply && replyMap.has(messageReply.messageID)) {
    try {
      const userInfo = await api.getUserInfo(senderID);
      const userName = userInfo?.[senderID]?.name || "Unknown";

      const forward = `📥 Reply from: ${userName}\n🆔 ${senderID}\n\n💬 ${body}`;

      for (const adminID of ADMIN_UID) {
        await api.sendMessage(forward, adminID, (err, info) => {
          if (!err) replyMap.set(info.messageID, { userTID: threadID });
        });
      }
    } catch (err) {
      console.log("❌ Error forwarding reply:", err);
      return api.sendMessage(
        "❌ Couldn't forward your reply to the operator.",
        threadID
      );
    }
  }

  // Admin replies to user
  if (
    ADMIN_UID.includes(senderID) &&
    messageReply &&
    replyMap.has(messageReply.messageID)
  ) {
    const { userTID } = replyMap.get(messageReply.messageID);
    return api.sendMessage(body, userTID);
  }
};

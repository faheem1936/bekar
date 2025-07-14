const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "chuza",
  version: "3.4.0",
  hasPermission: 2,
  credits: "Faheem Akhtar",
  description:
    "AI chatbot that replies when 'chuza' is triggered or bot is replied to",
  commandCategory: "AI",
  usages: "chuza on / off / status",
  cooldowns: 5,
};

let chuzaActive = false;
const dataPath = path.join(__dirname, "chuzaData.json");

// Ensure data file exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({}));
}

function saveUserInteraction({ senderID, userName, message, aiReply }) {
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (err) {
    console.error("❌ Error reading chuzaData.json:", err.message);
  }

  const timestamp = Date.now();

  if (!data[senderID]) {
    data[senderID] = {
      name: userName,
      interactions: [],
    };
  }

  data[senderID].interactions.push({
    message,
    aiReply,
    timestamp,
  });

  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Error saving chuzaData.json:", err.message);
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!chuzaActive || !body) return;

  const lower = body.toLowerCase();
  const triggeredByWord =
    lower.includes("chuza") ||
    lower.startsWith("haan chuza") ||
    lower.startsWith("oye chuza");

  const triggeredByReply =
    messageReply && messageReply.senderID === api.getCurrentUserID();

  if (!triggeredByWord && !triggeredByReply) return;

  // Get user name
  let userName = "User";
  try {
    const info = await api.getUserInfo(senderID);
    userName = info[senderID]?.name || "User";
  } catch {}

  const userQuery = body;
  const apiURL = `https://jordan-amir-api.vercel.app/api/shona?message=${encodeURIComponent(
    userQuery
  )}&name=Chuza&author=Faheem&senderID=${senderID}&username=${encodeURIComponent(
    userName
  )}`;

  try {
    const res = await axios.get(apiURL);
    const aiReply = res.data?.reply || "😐 Mujhe samajh nahi aaya.";

    // Save interaction with AI reply
    saveUserInteraction({
      senderID,
      userName,
      message: userQuery,
      aiReply,
    });

    // Random prefix
    const prefixOptions = ["Haan", "Oye", "Suno", "Haan Oye", " "];
    const prefix =
      prefixOptions[Math.floor(Math.random() * prefixOptions.length)];

    // Mention tag
    const tag = {
      tag: userName,
      id: senderID,
    };

    const fullMessage = `${prefix} ${userName}, ${aiReply}`;

    return api.sendMessage(
      {
        body: fullMessage,
        mentions: [tag],
      },
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ Chuza AI Error:", err.message);
    return api.sendMessage(
      {
        body: `${userName}, maafi chahta hoon, reply nahi mila.`,
        mentions: [{ tag: userName, id: senderID }],
      },
      threadID,
      messageID
    );
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args[0]?.toLowerCase();

  switch (input) {
    case "on":
      chuzaActive = true;
      return api.sendMessage("✅ Chuza AI is now active.", threadID, messageID);
    case "off":
      chuzaActive = false;
      return api.sendMessage(
        "❌ Chuza AI is now deactivated.",
        threadID,
        messageID
      );
    case "status":
      return api.sendMessage(
        chuzaActive ? "📶 Chuza AI is ACTIVE." : "📴 Chuza AI is INACTIVE.",
        threadID,
        messageID
      );
    default:
      return api.sendMessage(
        "📘 Usage:\n• chuza on\n• chuza off\n• chuza status",
        threadID,
        messageID
      );
  }
};

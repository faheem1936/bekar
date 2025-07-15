 require("dotenv").config();
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const togglePath = path.join(__dirname, "newchuza_toggle.json");
const userDataPath = path.join(__dirname, "newchuza_users.json");

// 🛡️ Ensure toggle + log files exist
if (!fs.existsSync(togglePath)) {
  fs.writeFileSync(togglePath, JSON.stringify({ enabled: false }, null, 2));
}
if (!fs.existsSync(userDataPath)) {
  fs.writeFileSync(userDataPath, JSON.stringify([], null, 2));
}

module.exports.config = {
  name: "newchuza2",
  version: "3.3.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Aggressive reply to chuza or replies to bot messages (AI-based)",
  commandCategory: "ai",
  usages: "[on/off]",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const toggle = JSON.parse(fs.readFileSync(togglePath));
    if (!toggle.enabled) return;

    const botID = api.getCurrentUserID();
    const messageText = (event.body || "").toLowerCase();

    const isChuzaTrigger =
      messageText.includes("chuza") ||
      messageText.includes("oye chuza") ||
      messageText.includes("suno chuza");

    const isReplyToBot =
      event.messageReply && event.messageReply.senderID === botID;

    if (!isChuzaTrigger && !isReplyToBot) return;

    const senderInfo = await api.getUserInfo(event.senderID);
    const senderName = senderInfo?.[event.senderID]?.name || "bhai";

    const prefixes = [
      "Haan", "Oye", "Abey", "Wow Yaar", "Ary", "Ary Yaar", "O Bhai", "Sun Zara",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_KEY) {
      console.warn("⚠️ OPENROUTER_API_KEY is missing in env.");
      return;
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nousresearch/hermes-3-llama-3.1-70b",
        messages: [
          {
            role: "system",
            content:
              "Tum ek desi Urdu/Hindi AI ho. Jab koi 'chuza' ya bot ko reply kare, to tu usko sadak-chaap, taunting, funny, ya mooh tod reply de. Bold gali tone bhi acceptable hai, lekin entertaining style mein.",
          },
          {
            role: "user",
            content: messageText || "chuza",
          },
        ],
        temperature: 0.9,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply =
      response?.data?.choices?.[0]?.message?.content?.trim() ||
      "Tu kya bol raha hai chuza?";

    // Log to file
    const logData = fs.readJSONSync(userDataPath);
    logData.push({
      uid: event.senderID,
      name: senderName,
      message: messageText,
      ai: aiReply,
      threadID: event.threadID,
      time: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
    });
    fs.writeFileSync(userDataPath, JSON.stringify(logData, null, 2));

    return api.sendMessage(
      `${prefix} ${senderName}, ${aiReply}`,
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.error("❌ newchuza error:", err.message || err);
  }
};

module.exports.run = function ({ api, event, args }) {
  const status = args[0]?.toLowerCase();
  const toggle = fs.readJSONSync(togglePath);

  if (status === "on") {
    toggle.enabled = true;
    fs.writeJSONSync(togglePath, toggle, { spaces: 2 });
    return api.sendMessage(
      "✅ newchuza globally ON ho gaya bhai.",
      event.threadID,
      event.messageID
    );
  }

  if (status === "off") {
    toggle.enabled = false;
    fs.writeJSONSync(togglePath, toggle, { spaces: 2 });
    return api.sendMessage(
      "❌ newchuza globally OFF kar diya gaya bhai.",
      event.threadID,
      event.messageID
    );
  }

  return api.sendMessage(
    "📌 Use: .newchuza on OR .newchuza off",
    event.threadID,
    event.messageID
  );
};

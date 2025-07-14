require("dotenv").config();
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "aivoice",
  version: "1.0.3",
  hasPermission: 0,
  credits: "Faheem King",
  description: "AI reply converted to female Hindi voice with user name",
  commandCategory: "ai",
  usages: "aivoice [your message]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const userMessage = args.join(" ");

  if (!userMessage) {
    return api.sendMessage("❗ Use: .aivoice [your message]", threadID, messageID);
  }

  const AI_KEY = process.env.A4F_API_KEY;
  const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = "ulZgFXalzbrnPUGQGs0S"; // Female Hindi voice

  if (!AI_KEY || !ELEVEN_KEY) return;

  let userName = "User";
  try {
    const userInfo = await api.getUserInfo(senderID);
    userName = userInfo[senderID]?.name || "User";
  } catch (e) {
    console.warn("⚠️ Could not fetch user name.");
  }

  try {
    // Get AI reply
    const aiRes = await axios.post(
      "https://api.a4f.co/v1/chat/completions",
      {
        model: "provider-2/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a friendly Indian female AI assistant. Reply in Hindi only. Call the user by name: ${userName}.`,
          },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiTextRaw = aiRes.data.choices[0].message.content;
    const spokenText = `${userName}, ${aiTextRaw}`;

    const voicePath = path.join(__dirname, "hindivoice.mp3");

    const voiceRes = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: spokenText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.9,
        },
      },
      {
        headers: {
          "xi-api-key": ELEVEN_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    fs.writeFileSync(voicePath, Buffer.from(voiceRes.data, "binary"));

    return api.sendMessage(
      {
        body: `🎙️ ${userName} ${aiTextRaw}`,
        attachment: fs.createReadStream(voicePath),
      },
      threadID,
      () => fs.unlinkSync(voicePath),
      messageID
    );
  } catch (err) {
    console.error("❌ AI Voice Error:", err.message || err);
    return api.sendMessage("⚠️ Voice generation failed. Try again.", th

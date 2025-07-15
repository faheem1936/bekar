const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "aivoice",
  version: "1.0.3",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description: "AI reply in Hindi female voice with user's name",
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

  const AI_KEY = process.env.A4F_KEY;
  const ELEVEN_KEY = process.env.ELEVEN_KEY;
  const VOICE_ID = "ulZgFXalzbrnPUGQGs0S"; // Female Hindi voice

  let userName = "User";
  try {
    const userInfo = await api.getUserInfo(senderID);
    userName = userInfo[senderID]?.name || "User";
  } catch (e) {
    console.warn("⚠️ Could not fetch user name.");
  }

  try {
    // 🧠 Get AI reply in Hindi
    const aiRes = await axios.post(
      "https://api.a4f.co/v1/chat/completions",
      {
        model: "provider-2/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Tum ek friendly Indian female ho. Reply sirf Hindi mein do. User ka naam: ${userName}.`,
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

    const aiText = aiRes?.data?.choices?.[0]?.message?.content?.trim();
    const spokenText = `${userName}, ${aiText}`;

    const voicePath = path.join(__dirname, "..", "cache", `aivoice_${senderID}.mp3`);
    fs.ensureDirSync(path.join(__dirname, "..", "cache")); // Make sure folder exists

    // 🎙️ Generate voice with ElevenLabs
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
        body: `🎙️ ${userName}, ${aiText}`,
        attachment: fs.createReadStream(voicePath),
      },
      threadID,
      () => fs.unlinkSync(voicePath),
      messageID
    );
  } catch (err) {
    console.error("❌ aivoice error:", err.message || err);
    return api.sendMessage(
      "⚠️ Voice generation failed. Try again later.",
      threadID,
      messageID
    );
  }
};

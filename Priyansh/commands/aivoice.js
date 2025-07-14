const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "aivoice",
  version: "1.0.2",
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
    return api.sendMessage(
      "❗ Use: .aivoice [your message]",
      threadID,
      messageID
    );
  }

  const AI_KEY = "ddc-a4f-58cf64b46fd84575a17c351b4dbc7da5"; // A4F GPT-3.5
  const ELEVEN_KEY = "sk_618d15f034f0f96a52b0d2e27987247312c6a77a0d4ea8fb"; // ElevenLabs key
  const VOICE_ID = "ulZgFXalzbrnPUGQGs0S"; // Female Hindi voice

  let userName = "User";
  try {
    const userInfo = await api.getUserInfo(senderID);
    userName = userInfo[senderID]?.name || "User";
  } catch (e) {
    console.warn("⚠️ Could not fetch user name.");
  }

  try {
    // 🧠 Get AI reply
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
    const spokenText = `${userName}, ${aiTextRaw}`; // 👈 Adds name in voice

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
    console.error("❌ AI Voice Error:", err);
    return api.sendMessage(
      "⚠️ Failed to generate voice. Try again later.",
      threadID,
      messageID
    );
  }
};

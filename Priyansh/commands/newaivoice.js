process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + "/credentials.json";
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const textToSpeech = require("@google-cloud/text-to-speech");
const gTTS = require("gtts");

module.exports.config = {
  name: "newaivoice2",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT Merge",
  description: "AI + Urdu/Hindi text-to-voice",
  commandCategory: "ai",
  usages: "newaivoice [text] OR newaivoice urdu [text]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!args[0]) {
    return api.sendMessage(
      "❗ Use: .newaivoice [text] or .newaivoice urdu [text]",
      threadID,
      messageID
    );
  }

  const mode = args[0].toLowerCase() === "urdu" ? "urdu" : "ai";
  const content = args.slice(mode === "urdu" ? 1 : 0).join(" ");

  if (!content) {
    return api.sendMessage("❗ Please provide some text.", threadID, messageID);
  }

  let userName = "User";
  try {
    const userInfo = await api.getUserInfo(senderID);
    userName = userInfo[senderID]?.name || "User";
  } catch (e) {
    console.warn("⚠️ Could not fetch user name.");
  }

  // 📍 Urdu mode via gTTS
  if (mode === "urdu") {
    const voicePath = path.join(__dirname, "cache", `gtts_${senderID}.mp3`);
    try {
      const gtts = new gTTS(content, "hi"); // Try 'hi' or 'ur' for Hindi/Urdu

      await new Promise((resolve, reject) => {
        gtts.save(voicePath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return api.sendMessage(
        {
          body: `🎤 ${userName}, yeh lo tumhari voice:`,
          attachment: fs.createReadStream(voicePath),
        },
        threadID,
        () => fs.unlinkSync(voicePath),
        messageID
      );
    } catch (err) {
      console.error("❌ gTTS Error:", err.message);
      return api.sendMessage(
        "❌ Failed to generate Urdu voice. Try again.",
        threadID,
        messageID
      );
    }
  }

  // 🤖 AI mode with Google Cloud Hindi voice
  const AI_KEY = "ddc-a4f-58cf64b46fd84575a17c351b4dbc7da5"; // A4F key
  try {
    const aiRes = await axios.post(
      "https://api.a4f.co/v1/chat/completions",
      {
        model: "provider-2/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a friendly Indian female AI assistant. Reply in Hindi only. Call the user by name: ${userName}.`,
          },
          { role: "user", content },
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

    const aiReply = aiRes.data.choices[0].message.content;
    const spokenText = `${userName}, ${aiReply}`;

    const client = new textToSpeech.TextToSpeechClient();
    const request = {
      input: { text: spokenText },
      voice: { languageCode: "hi-IN", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);
    const voicePath = path.join(
      __dirname,
      "cache",
      `hindivoice_${senderID}.mp3`
    );
    fs.writeFileSync(voicePath, response.audioContent, "binary");

    return api.sendMessage(
      {
        body: `🎙️ ${userName}, ${aiReply}`,
        attachment: fs.createReadStream(voicePath),
      },
      threadID,
      () => fs.unlinkSync(voicePath),
      messageID
    );
  } catch (err) {
    console.error("❌ AI Voice Error:", err.message || err);
    return api.sendMessage(
      "⚠️ Failed to generate AI voice. Try again later.",
      threadID,
      messageID
    );
  }
};

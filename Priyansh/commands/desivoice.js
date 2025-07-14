const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "desibot",
  version: "1.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Desi Indian funny female AI voice (Kajal from Voicemaker)",
  commandCategory: "voice",
  usages: "[text]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  if (!text)
    return api.sendMessage(
      "❌ Kuch text likho jo Kajal bole.",
      event.threadID,
      event.messageID
    );

  const filePath = __dirname + `/desibot-${event.senderID}.mp3`;

  const apiURL = "https://developer.voicemaker.in/voice/api";
  const apiKey =
    "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";

  const payload = {
    Engine: "neural",
    LanguageCode: "hi-IN",
    VoiceId: "ai1-Kajal", // Funny Hindi desi female
    Text: text,
    OutputFormat: "mp3",
    SampleRate: "22050",
    Effect: "default",
    MasterSpeed: "0",
    MasterVolume: "0",
    MasterPitch: "0",
    Style: "general",
    ApiKey: apiKey,
  };

  try {
    api.sendMessage("🎙 Kajal bol rahi hai... zara ruk jao 🤭", event.threadID);

    const res = await axios.post(apiURL, payload);
    const audioURL = res.data?.path;

    if (!audioURL) throw new Error("Audio URL not returned by API");

    const audioRes = await axios.get(audioURL, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(audioRes.data, "binary"));

    return api.sendMessage(
      {
        body: "✅ Lo suno Kajal ki awaaz 😂",
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (err) {
    console.error("❌ DesiBot Error:", err.message || err);
    return api.sendMessage(
      "❌ Kajal ki awaaz nahi bani. API ya net issue ho sakta hai.",
      event.threadID,
      event.messageID
    );
  }
};

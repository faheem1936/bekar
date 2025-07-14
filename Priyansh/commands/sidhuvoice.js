const fs = require("fs");
const path = require("path");
const gTTS = require("gtts");

module.exports.config = {
  name: "say3",
  version: "1.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description: "Convert text to voice urdu",
  commandCategory: "media",
  usages: "voice [text]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
  const text = args.join(" ");
  if (!text) {
    return api.sendMessage(
      "📝 Please enter some text.\nExample: anything.",
      event.threadID
    );
  }

  const filePath = path.join(__dirname, "cache", `sidhu_${event.senderID}.mp3`);

  try {
    const gtts = new gTTS(text, "hi"); // You can try "hi" or "pa" for Hindi/Punjabi

    await new Promise((resolve, reject) => {
      gtts.save(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return api.sendMessage(
      {
        body: "🎤 Here's your voice:",
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (err) {
    console.error("TTS Error:", err.message);
    return api.sendMessage(
      "❌ Failed to generate Sidhu voice. Try again.",
      event.threadID
    );
  }
};

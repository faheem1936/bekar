const axios = require("axios");

module.exports.config = {
  name: "ocr",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "Faheem + ChatGPT",
  description: "OCR: Extracts text from images (Tesseract)",
  commandCategory: "tools",
  usages: "[reply to image]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID, messageReply } = event;

  if (!messageReply?.attachments?.[0]?.url) {
    return api.sendMessage(
      "📸 Please reply to an image to read text.",
      threadID,
      messageID
    );
  }

  const imgURL = messageReply.attachments[0].url;

  try {
    api.sendMessage(
      "🔍 Reading text from image using Tesseract OCR...",
      threadID,
      messageID
    );

    const res = await axios.get(
      `https://api.popcat.xyz/ocr?image=${encodeURIComponent(imgURL)}`
    );

    const text = res.data.text?.trim();

    if (!text || text.length < 2) {
      return api.sendMessage(
        "❌ No readable text found. Try with a clearer image.",
        threadID,
        messageID
      );
    }

    return api.sendMessage(
      `📄 Extracted Text:\n\n${text}`,
      threadID,
      messageID
    );
  } catch (e) {
    console.error("OCR error:", e.message);
    return api.sendMessage(
      "❌ OCR failed. Try again later or with another image.",
      threadID,
      messageID
    );
  }
};

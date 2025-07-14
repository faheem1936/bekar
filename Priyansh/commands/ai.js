const axios = require("axios");
const fs = require("fs");
const path = require("path");
const request = require("request");
const tesseract = require("tesseract.js");

module.exports.config = {
  name: "ai",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem Akhtar + GPT",
  description: "AI that responds to text or images starting with 'ai'",
  commandCategory: "AI",
  usages: "ai [question] or image with 'ai'",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  const msg = event.body || "";
  const lowerMsg = msg.toLowerCase();

  const hasTextTrigger = lowerMsg.startsWith("ai ");
  const hasImageTrigger = !msg && event.attachments?.[0]?.type === "photo";

  if (!hasTextTrigger && !hasImageTrigger) return;

  const senderInfo = await api.getUserInfo(event.senderID);
  const senderName = senderInfo?.[event.senderID]?.name || "bhai";

  let prompt = "";

  // 📷 If image only (OCR)
  if (hasImageTrigger) {
    const imgUrl = event.attachments[0].url;
    const imgPath = path.join(__dirname, "ocr_temp.jpg");

    const file = fs.createWriteStream(imgPath);
    await new Promise((resolve) =>
      request(imgUrl).pipe(file).on("close", resolve)
    );

    const ocrData = await tesseract.recognize(imgPath, "eng+urd", {
      logger: (m) => null,
    });
    prompt = ocrData.data.text.trim();

    fs.unlinkSync(imgPath); // Clean temp file
    if (!prompt) return;
  }

  // 📝 If message starts with "ai "
  if (hasTextTrigger) {
    prompt = msg.slice(3).trim();
    if (!prompt) return;
  }

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "Tum Urdu aur English dono samajhne wale AI ho. User ke sawal ya image ke content ka friendly aur madadgaar jawab do.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = res.data.choices[0].message.content.trim();
    return api.sendMessage(
      `${senderName}, ${aiReply}`,
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.error("❌ AI Image/Text Error:", err.message || err);
    return api.sendMessage("❌ AI response failed bhai.", event.threadID);
  }
};

module.exports.run = () => {};

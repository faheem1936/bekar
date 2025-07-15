require("dotenv").config();
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const request = require("request");
const tesseract = require("tesseract.js");

module.exports.config = {
  name: "ai",
  version: "2.1.0",
  hasPermission: 0,
  credits: "Faheem Akhtar + ChatGPT",
  description: "AI that responds to messages or image text (OCR)",
  commandCategory: "AI",
  usages: "ai [question] OR send image with 'ai'",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  const message = event.body || "";
  const lowerMsg = message.toLowerCase();

  const hasTextTrigger = lowerMsg.startsWith("ai ");
  const hasImageTrigger = !message && event.attachments?.[0]?.type === "photo";

  if (!hasTextTrigger && !hasImageTrigger) return;

  const senderInfo = await api.getUserInfo(event.senderID);
  const senderName = senderInfo?.[event.senderID]?.name || "bhai";

  let prompt = "";

  // 🖼️ OCR if image is attached
  if (hasImageTrigger) {
    const imgUrl = event.attachments[0].url;
    const imgPath = path.join(__dirname, "ocr_temp.jpg");

    try {
      const file = fs.createWriteStream(imgPath);
      await new Promise((resolve, reject) => {
        request(imgUrl)
          .pipe(file)
          .on("finish", resolve)
          .on("error", reject);
      });

      const ocrData = await tesseract.recognize(imgPath, "eng+urd", {
        logger: () => null,
      });
      fs.unlinkSync(imgPath);

      prompt = ocrData.data.text.trim();
      if (!prompt) return api.sendMessage("❌ No text found in image.", event.threadID);
    } catch (err) {
      console.error("❌ OCR Error:", err.message || err);
      return api.sendMessage("❌ Failed to read image text.", event.threadID);
    }
  }

  // 🧠 Text after "ai "
  if (hasTextTrigger) {
    prompt = message.slice(3).trim();
    if (!prompt) return;
  }

  const API_KEY = process.env.OPENROUTER_API_KEY;
  if (!API_KEY) {
    return api.sendMessage(
      "⚠️ OPENROUTER_API_KEY missing in environment.",
      event.threadID,
      event.messageID
    );
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "Tum Urdu aur English dono samajhne wale AI ho. User ke sawal ya tasveer ke content ka madadgaar aur friendly jawab do.",
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
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data.choices?.[0]?.message?.content?.trim();
    if (!aiReply) throw new Error("Empty AI response");

    return api.sendMessage(`${senderName}, ${aiReply}`, event.threadID, event.messageID);
  } catch (err) {
    console.error("❌ AI Error:", err.message || err);
    return api.sendMessage("❌ AI response failed bhai.", event.threadID);
  }
};

// ⛔ No command trigger needed
module.exports.run = () => {};

const axios = require("axios");
const fs = require("fs-extra");
const FormData = require("form-data");

module.exports.config = {
  name: "aiimg",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem + ChatGPT",
  description: "Describe image using Cloudmersive AI",
  commandCategory: "ai",
  usages: ".aiimg (reply to image)",
  cooldowns: 5,
};

const CLOUDMERSIVE_KEY = "c7817d5c-5f00-4af0-86fe-756c0f6d755b"; // ✅ your working key

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, messageReply } = event;

  if (!messageReply?.attachments?.length) {
    return api.sendMessage("📸 Please reply to an image.", threadID, messageID);
  }

  const image = messageReply.attachments.find(
    (a) => a.type === "photo" || a.type === "image"
  );

  if (!image?.url) {
    return api.sendMessage("❌ No valid image found.", threadID, messageID);
  }

  const tempPath = __dirname + `/cache/aiimg_${Date.now()}.jpg`;

  try {
    api.sendMessage(
      "🧠 Analyzing image using Cloudmersive AI...",
      threadID,
      messageID
    );

    // Download image
    const imgRes = await axios.get(image.url, { responseType: "arraybuffer" });
    fs.writeFileSync(tempPath, imgRes.data);

    const form = new FormData();
    form.append("imageFile", fs.createReadStream(tempPath));

    // Send to Cloudmersive
    const result = await axios.post(
      "https://api.cloudmersive.com/image/recognize/describe",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Apikey: CLOUDMERSIVE_KEY,
        },
      }
    );

    const desc =
      result.data?.Descriptions?.[0]?.Text || "🤖 No description found.";
    const tags = result.data?.Tags?.map((t) => t.Name).join(", ") || "None";

    fs.unlinkSync(tempPath);

    return api.sendMessage(
      `📝 Description:\n${desc}\n\n🏷️ Tags:\n${tags}`,
      threadID,
      messageID
    );
  } catch (err) {
    console.error("aiimg error:", err.message);
    fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
    return api.sendMessage(
      "❌ Error analyzing image. Please try again later.",
      threadID,
      messageID
    );
  }
};

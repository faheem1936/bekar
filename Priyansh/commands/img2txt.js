const axios = require("axios");
const FormData = require("form-data");

module.exports.config = {
  name: "img2txt",
  version: "5.0.0",
  hasPermission: 0,
  credits: "Faheem + ChatGPT",
  description: "Convert an image to ASCII using Asciified API",
  commandCategory: "fun",
  usages: ".img2txt (reply to image)",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, messageReply } = event;

  // Check for image reply
  if (!messageReply || !messageReply.attachments?.length) {
    return api.sendMessage("⚠️ Please reply to an image.", threadID, messageID);
  }

  const attachment = messageReply.attachments.find(
    (a) => a.type === "photo" || a.type === "image"
  );

  if (!attachment?.url) {
    return api.sendMessage("❌ No valid image found.", threadID, messageID);
  }

  api.sendMessage(
    "🕐 Converting image to ASCII text art...",
    threadID,
    messageID
  );

  try {
    const imageRes = await axios.get(attachment.url, {
      responseType: "arraybuffer",
    });

    const form = new FormData();
    form.append("image", Buffer.from(imageRes.data), {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });

    const res = await axios.post(
      "https://asciified.thelicato.io/api/v2/ascii",
      form,
      {
        headers: form.getHeaders(),
        timeout: 20000,
      }
    );

    const ascii = res.data?.result;
    if (!ascii) throw new Error("ASCII not found in response");

    return api.sendMessage(`\`\`\`\n${ascii}\n\`\`\``, threadID, messageID);
  } catch (err) {
    console.error("img2txt error:", err.message);
    return api.sendMessage(
      "❌ Failed to convert image. Try a different image or later.",
      threadID,
      messageID
    );
  }
};

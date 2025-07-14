const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "opinion",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate Opinion meme with image and text",
  commandCategory: "meme",
  usages: "[text] (use reply/tag image or your avatar)",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID, messageReply, mentions } = event;
  const text = args.join(" ");

  if (!text) {
    return api.sendMessage(
      "📝 Please enter the text for the opinion sign.\n\nExample:\n.opinion Popcat API sucks",
      threadID,
      messageID
    );
  }

  let imgURL;

  // 1. Replied image
  if (messageReply?.attachments?.[0]?.type === "photo") {
    imgURL = messageReply.attachments[0].url;
  }
  // 2. Mentioned user
  else if (Object.keys(mentions).length > 0) {
    const uid = Object.keys(mentions)[0];
    imgURL = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
  }
  // 3. Fallback to sender's avatar
  else {
    imgURL = `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;
  }

  const apiUrl = `https://api.popcat.xyz/v2/opinion?image=${encodeURIComponent(
    imgURL
  )}&text=${encodeURIComponent(text)}`;
  const filePath = path.join(__dirname, "cache", `opinion_${Date.now()}.jpg`);

  try {
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, response.data);

    return api.sendMessage(
      {
        body: `🪧 OPINION: ${text}`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Opinion API Error:", err.message);
    return api.sendMessage(
      "⚠️ Couldn't generate the opinion meme. Please try again.",
      threadID,
      messageID
    );
  }
};

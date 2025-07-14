const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "dpname",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description: "Write your name on the replied image",
  commandCategory: "image",
  usages: "dpname YourName",
  cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
  const { messageReply, threadID, messageID } = event;

  if (
    !messageReply ||
    !messageReply.attachments ||
    messageReply.attachments[0].type !== "photo"
  ) {
    return api.sendMessage(
      "❌ Reply to an image with:\ndpname YourName",
      threadID,
      messageID
    );
  }

  const nameText = args.join(" ");
  if (!nameText) {
    return api.sendMessage("⚠️ Please provide a name!", threadID, messageID);
  }

  const imageUrl = messageReply.attachments[0].url;
  const encodedText = encodeURIComponent(nameText);
  const encodedBg = encodeURIComponent(imageUrl);

  const finalUrl = `https://api.memegen.link/images/custom/_/${encodedText}.png?background=${encodedBg}`;

  try {
    const res = await axios.get(finalUrl, { responseType: "arraybuffer" });
    const filePath = path.join(__dirname, "dp_result.png");
    fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));

    return api.sendMessage(
      {
        body: `✅ Name written: ${nameText}`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("❌ Image error:", err.message);
    return api.sendMessage(
      "⚠️ Couldn't generate the image. Try again later.",
      threadID,
      messageID
    );
  }
};

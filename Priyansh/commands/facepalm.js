const axios = require("axios");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "facepalm",
  version: "1.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description: "Overlay a facepalm meme on profile picture",
  commandCategory: "edit-image",
  usages: "[@mention or reply]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  try {
    const uid =
      event.type === "message_reply"
        ? event.messageReply.senderID
        : Object.keys(event.mentions)[0] || event.senderID;

    const avatarUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
    const avatarBuffer = (
      await axios.get(avatarUrl, { responseType: "arraybuffer" })
    ).data;

    const avatar = await Canvas.loadImage(avatarBuffer);

    const facepalmPath = path.join(__dirname, "cache", "facepalm.png");
    if (!fs.existsSync(facepalmPath)) {
      return api.sendMessage(
        "❌ Missing overlay file: `facepalm.png` in cache folder.",
        event.threadID
      );
    }
    const facepalm = await Canvas.loadImage(facepalmPath);

    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(avatar, 0, 0, 512, 512);
    ctx.drawImage(facepalm, 0, 0, 512, 512); // transparent PNG overlay

    const outPath = path.join(__dirname, "cache", `facepalm_${uid}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outPath, buffer);

    return api.sendMessage(
      {
        body: "🤦 Here's your facepalm moment.",
        attachment: fs.createReadStream(outPath),
      },
      event.threadID,
      () => fs.unlinkSync(outPath),
      event.messageID
    );
  } catch (err) {
    console.error("Facepalm Error:", err.message);
    return api.sendMessage("❌ Failed to apply facepalm edit.", event.threadID);
  }
};

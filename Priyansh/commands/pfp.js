const axios = require("axios");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

module.exports.config = {
  name: "beautifulpfp",
  version: "2.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description: "Create beautiful profile picture with glow, bg, and name",
  commandCategory: "edit-image",
  usages: "[bgNumber] [@mention]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const uid =
      event.type === "message_reply"
        ? event.messageReply.senderID
        : Object.keys(event.mentions)[0] || event.senderID;

    const name =
      event.type === "message_reply"
        ? event.messageReply.senderID === event.senderID
          ? "You"
          : event.messageReply.senderName
        : event.mentions[uid] || (await api.getUserInfo(uid))[uid].name;

    // Background
    const bgNumber = args[0] && !isNaN(args[0]) ? args[0] : 1;
    const bgPath = path.join(__dirname, "cache", `bg${bgNumber}.png`);
    if (!fs.existsSync(bgPath))
      return api.sendMessage(
        `❌ Background bg${bgNumber}.png not found.`,
        event.threadID
      );

    const avatarURL = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
    const avatarBuffer = (
      await axios.get(avatarURL, { responseType: "arraybuffer" })
    ).data;

    // Load assets
    const [bgImg, avatar] = await Promise.all([
      Canvas.loadImage(bgPath),
      Jimp.read(avatarBuffer),
    ]);

    // Blur avatar a bit for smooth glow
    avatar.circle().blur(1);

    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Draw glowing circle
    ctx.save();
    ctx.arc(350, 300, 160, 0, Math.PI * 2);
    ctx.shadowColor = "hotpink";
    ctx.shadowBlur = 40;
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();

    // Draw profile picture (masked)
    const circAvatar = await Canvas.loadImage(
      await avatar.getBufferAsync(Jimp.MIME_PNG)
    );
    ctx.beginPath();
    ctx.arc(350, 300, 150, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(circAvatar, 200, 150, 300, 300);
    ctx.restore();

    // Add name text
    ctx.font = "bold 40px Sans";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeText(name, 350, 530);
    ctx.fillText(name, 350, 530);

    const outPath = path.join(__dirname, "cache", `output_${uid}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outPath, buffer);

    return api.sendMessage(
      {
        body: `🌸 Here's your beautiful profile picture!`,
        attachment: fs.createReadStream(outPath),
      },
      event.threadID,
      () => fs.unlinkSync(outPath),
      event.messageID
    );
  } catch (err) {
    console.error("BeautifulPFP Error:", err);
    return api.sendMessage(
      "❌ Failed to create beautiful profile picture.",
      event.threadID
    );
  }
};

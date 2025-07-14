const axios = require("axios");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

module.exports.config = {
  name: "beautifulpfp",
  version: "3.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description:
    "💎 Generate a luxurious, glowing profile picture with premium background and name",
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

    // Background selection
    const bgNumber = args[0] && !isNaN(args[0]) ? args[0] : 1;
    const bgPath = path.join(__dirname, "cache", `bg${bgNumber}.png`);
    const overlayPath = path.join(__dirname, "cache", `sparkle.png`); // optional

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
    const [bgImg, avatar, sparkleOverlay] = await Promise.all([
      Canvas.loadImage(bgPath),
      Jimp.read(avatarBuffer),
      fs.existsSync(overlayPath) ? Canvas.loadImage(overlayPath) : null,
    ]);

    // Blur avatar + crop circle
    avatar.circle().blur(2);

    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Glowing outer ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(350, 300, 160, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = "#ffd700"; // golden
    ctx.lineWidth = 10;
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 40;
    ctx.stroke();
    ctx.restore();

    // Draw circular avatar
    const circAvatar = await Canvas.loadImage(
      await avatar.getBufferAsync(Jimp.MIME_PNG)
    );
    ctx.beginPath();
    ctx.arc(350, 300, 150, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(circAvatar, 200, 150, 300, 300);
    ctx.restore();

    // Optional sparkle overlay
    if (sparkleOverlay) {
      ctx.globalAlpha = 0.3;
      ctx.drawImage(sparkleOverlay, 0, 0, 700, 700);
      ctx.globalAlpha = 1;
    }

    // Gradient gold text
    const gradient = ctx.createLinearGradient(250, 520, 450, 560);
    gradient.addColorStop(0, "#FFD700"); // gold
    gradient.addColorStop(1, "#FF8C00"); // orange-gold

    ctx.font = "bold 45px 'Segoe UI', 'Poppins', 'Sans'";
    ctx.fillStyle = gradient;
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.fillText(name, 350, 550);

    // Save and send image
    const outPath = path.join(__dirname, "cache", `luxpfp_${uid}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer());

    return api.sendMessage(
      {
        body: `💖 Here's your **luxurious profile picture** ✨`,
        attachment: fs.createReadStream(outPath),
      },
      event.threadID,
      () => fs.unlinkSync(outPath),
      event.messageID
    );
  } catch (err) {
    console.error("BeautifulPFP Error:", err);
    return api.sendMessage(
      "❌ Failed to generate beautiful profile picture.",
      event.threadID
    );
  }
};

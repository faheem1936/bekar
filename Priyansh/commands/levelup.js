const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

const LEVEL_FILE = path.join(__dirname, "level_data.json");

if (!fs.existsSync(LEVEL_FILE)) fs.writeFileSync(LEVEL_FILE, "{}");

function loadLevels() {
  return JSON.parse(fs.readFileSync(LEVEL_FILE));
}

function saveLevels(data) {
  fs.writeFileSync(LEVEL_FILE, JSON.stringify(data, null, 2));
}

module.exports.config = {
  name: "level",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description: "Check your level and XP with profile pic",
  commandCategory: "rank",
  usages: "level",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  const { senderID, threadID, messageID } = event;
  const levels = loadLevels();
  const user = levels[senderID] || { xp: 0, level: 1 };
  const xpNeeded = user.level * 100;

  try {
    const userInfo = await api.getUserInfo(senderID);
    const userName = userInfo[senderID].name || "User";
    const profileUrl = `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;

    const bg = await loadImage("https://i.imgur.com/qsbPMgC.jpg"); // Custom background
    const avatar = await loadImage(
      (
        await axios.get(profileUrl, { responseType: "arraybuffer" })
      ).data
    );

    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // Avatar circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(125, 125, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 45, 45, 160, 160);
    ctx.restore();

    // Text & bar
    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Sans-serif";
    ctx.fillText(userName, 240, 80);

    ctx.font = "22px Sans-serif";
    ctx.fillText(`Level: ${user.level}`, 240, 130);
    ctx.fillText(`XP: ${user.xp} / ${xpNeeded}`, 240, 170);

    // Progress bar
    const barX = 240;
    const barY = 190;
    const barWidth = 400;
    const progress = user.xp / xpNeeded;
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barWidth, 20);
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(barX, barY, barWidth * progress, 20);

    // Send image
    const filePath = path.join(__dirname, `level-${senderID}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(filePath, buffer);

    return api.sendMessage(
      {
        body: `🏆 Your Level Profile`,
        attachment: fs.createReadStream(filePath),
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  } catch (err) {
    console.error("Level error:", err.message);
    return api.sendMessage(
      "❌ Failed to generate level card.",
      threadID,
      messageID
    );
  }
};

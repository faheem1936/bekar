const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ship",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem",
  description: "Ship two users with image 💘",
  commandCategory: "fun",
  usages: ".ship @user1 @user2",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, senderID, mentions, messageID } = event;
  const mentionIDs = Object.keys(mentions);

  // Determine participants
  let id1, id2, name1, name2;

  if (mentionIDs.length >= 2) {
    id1 = mentionIDs[0];
    id2 = mentionIDs[1];
    name1 = mentions[id1];
    name2 = mentions[id2];
  } else if (mentionIDs.length === 1) {
    id1 = senderID;
    id2 = mentionIDs[0];
    const info = await api.getUserInfo(senderID);
    name1 = info[senderID]?.name || "You";
    name2 = mentions[id2];
  } else {
    return api.sendMessage(
      "📌 Use: .ship @user1 @user2\nOr tag 1 person to ship with yourself.",
      threadID,
      messageID
    );
  }

  // Fetch profile pics
  const url1 = `https://graph.facebook.com/${id1}/picture?width=512&height=512`;
  const url2 = `https://graph.facebook.com/${id2}/picture?width=512&height=512`;
  const img1 = (await axios.get(url1, { responseType: "arraybuffer" })).data;
  const img2 = (await axios.get(url2, { responseType: "arraybuffer" })).data;

  const avatar1 = await loadImage(img1);
  const avatar2 = await loadImage(img2);

  // Create canvas
  const canvas = createCanvas(700, 400);
  const ctx = canvas.getContext("2d");

  // Optional background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw avatars
  ctx.drawImage(avatar1, 50, 50, 300, 300);
  ctx.drawImage(avatar2, 350, 50, 300, 300);

  // Draw heart or break
  const percent = Math.floor(Math.random() * 101);
  const emoji = percent >= 50 ? "❤️" : "💔";

  ctx.font = "80px Arial";
  ctx.fillStyle = percent >= 50 ? "red" : "gray";
  ctx.fillText(emoji, 310, 220);

  // Draw text
  ctx.font = "30px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(`${name1}`, 100, 370);
  ctx.fillText(`${name2}`, 400, 370);
  ctx.fillStyle = "purple";
  ctx.fillText(`Love Match: ${percent}%`, 230, 30);

  // Save image
  const filePath = path.join(__dirname, "ship-result.png");
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filePath, buffer);

  // Send image
  return api.sendMessage(
    {
      body: `💘 ${name1} ❤️ ${name2}\nLove Compatibility: ${percent}%`,
      attachment: fs.createReadStream(filePath),
    },
    threadID,
    () => fs.unlinkSync(filePath),
    messageID
  );
};

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "autoMemberWelcome",
  eventType: ["log:subscribe"],
  version: "1.0.0",
  credits: "Faheem + ChatGPT",
  description: "Auto welcome members with image card (no owner info)",
};

module.exports.run = async function ({ api, event }) {
  const { threadID, logMessageData } = event;
  const newMember = logMessageData?.addedParticipants?.[0];

  if (!newMember || newMember.userFbId === api.getCurrentUserID()) return;

  const userID = newMember.userFbId;

  try {
    const userInfo = await api.getUserInfo(userID);
    const userName = userInfo[userID]?.name || "New Member";
    const avatar = `https://graph.facebook.com/${userID}/picture?width=512&height=512`;
    const background = "https://cdn.popcat.xyz/welcome-bg.png";

    const welcomeImgURL = `https://api.popcat.xyz/v2/welcomecard?background=${encodeURIComponent(
      background
    )}&text1=${encodeURIComponent(userName)}&text2=${encodeURIComponent(
      "Welcome to the group!"
    )}&text3=${encodeURIComponent(
      "Enjoy your stay 😎"
    )}&avatar=${encodeURIComponent(avatar)}`;

    const filePath = path.join(__dirname, "cache", `welcome_${Date.now()}.png`);

    const imageRes = await axios.get(welcomeImgURL, {
      responseType: "arraybuffer",
    });
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, imageRes.data);

    const message = {
      body: `🎉 Welcome ${userName} to the group!`,
      attachment: fs.createReadStream(filePath),
    };

    api.sendMessage(message, threadID, () => fs.unlinkSync(filePath));
  } catch (err) {
    console.error("❌ AutoMemberWelcome Error:", err.message);
  }
};

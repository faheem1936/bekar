const https = require("https");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "randomdp",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Send a random DP image",
  commandCategory: "fun",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const links = [
    "https://i.imgur.com/tV0zLqz.jpeg",
    "https://i.imgur.com/5q2FdEm.jpeg",
    "https://i.imgur.com/IF7LFAg.jpeg",
    "https://i.imgur.com/pbifOst.jpeg",
    "https://i.imgur.com/FrcTt83.jpeg",
    "https://i.imgur.com/1Qdb5yQ.jpeg",
    "https://i.imgur.com/oIJEtEe.jpeg",
    "https://i.imgur.com/xDOr0Q1.jpeg",
    "https://i.imgur.com/P5ocadV.jpeg",
    "https://i.imgur.com/6aYyYBK.jpeg",
    "https://i.imgur.com/xjJBSG6.jpeg",
    "https://i.imgur.com/OGtxEtQ.jpeg",
    "https://i.imgur.com/rLSTFSr.jpeg",
    "https://i.imgur.com/vpadJrF.jpeg",
    "https://i.imgur.com/jOlbEiH.jpeg",
    "https://i.imgur.com/QJH8yX2.jpeg",
    "https://i.imgur.com/onbQxWN.jpeg",
    "https://i.imgur.com/IJ06YXP.jpeg",
    "https://i.imgur.com/JO51dV7.jpeg",
    "https://i.imgur.com/WaM2WvN.jpeg",
    "https://i.imgur.com/twPUGFW.jpeg",
    "https://i.imgur.com/B9EZLI7.jpeg",
    "https://i.imgur.com/8Me6mQI.jpeg",
    "https://i.imgur.com/01NBo9r.jpeg",
    "https://i.imgur.com/QB4ArDa.jpeg",
    "https://i.imgur.com/qHRK0Ic.jpeg",
    "https://i.imgur.com/K2qSbvJ.jpeg",
    "https://i.imgur.com/3tyzZW8.jpeg",
    "https://i.imgur.com/VasdCUq.jpeg",
    "https://i.imgur.com/Aa9Z7zc.jpeg",
  ];

  const imgUrl = links[Math.floor(Math.random() * links.length)];
  const imgPath = path.join(__dirname, "cache", `${Date.now()}.jpg`);

  const file = fs.createWriteStream(imgPath);

  https
    .get(imgUrl, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          api.sendMessage(
            {
              body: "Here's your DP 🎯",
              attachment: fs.createReadStream(imgPath),
            },
            event.threadID,
            () => fs.unlinkSync(imgPath),
            event.messageID
          );
        });
      });
    })
    .on("error", (err) => {
      fs.unlinkSync(imgPath);
      console.error("Image download error:", err);
      api.sendMessage(
        "❌ Failed to fetch the image.",
        event.threadID,
        event.messageID
      );
    });
};

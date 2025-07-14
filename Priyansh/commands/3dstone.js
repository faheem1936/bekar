const fs = require("fs");
const request = require("request");
const path = require("path");

module.exports.config = {
  name: "year7",
  version: "31.7.6",
  hasPermission: 0,
  credits: "THE_FAHEEM",
  description: "Generate New Year logo from PhotoOxy",
  commandCategory: "logo",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  if (!input) {
    return api.sendMessage(
      "⚠️ Please provide some text.",
      event.threadID,
      event.messageID
    );
  }

  const { Maker } = require("imagemaker.js");
  const maker = new Maker();

  try {
    const result = await maker.PhotoOxy(
      "https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html",
      [input]
    );

    const filePath = path.join(
      __dirname,
      "..",
      "cache",
      `newyear2_${event.senderID}.png`
    );

    const writeStream = fs.createWriteStream(filePath);
    request(encodeURI(result.imageUrl))
      .pipe(writeStream)
      .on("close", () => {
        api.sendMessage(
          {
            body: `🎉 New Year Logo for: ${input}`,
            attachment: fs.createReadStream(filePath),
          },
          event.threadID,
          () => fs.unlinkSync(filePath),
          event.messageID
        );
      });
  } catch (err) {
    console.log("❌ Error in newyear2:", err);
    return api.sendMessage(
      "❌ Failed to create image.",
      event.threadID,
      event.messageID
    );
  }
};

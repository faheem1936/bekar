const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "castlepop",
  version: "1.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Apply 3D Castle Pop-Out effect to an image using Ephoto360",
  commandCategory: "image",
  usages: "[reply to an image]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  try {
    if (
      !event.messageReply ||
      !event.messageReply.attachments ||
      event.messageReply.attachments[0].type !== "photo"
    ) {
      return send("📸 Please reply to an image to use this effect.");
    }

    const imageURL = event.messageReply.attachments[0].url;
    const imgPath = path.join(
      __dirname,
      "cache",
      `castle_${event.senderID}.jpg`
    );

    const downloading = await axios.get(imageURL, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(imgPath, Buffer.from(downloading.data, "binary"));

    const form = new FormData();
    form.append("image", fs.createReadStream(imgPath));
    form.append("effect_id", "786");

    const res = await axios.post("https://e1.yotools.net/api/ephoto360", form, {
      headers: form.getHeaders(),
    });

    fs.unlinkSync(imgPath);

    if (!res.data.url)
      return send("❌ Failed to generate image. Try again later.");

    const img = await axios.get(res.data.url, { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(img.data, "binary"));

    return api.sendMessage(
      {
        body: "🏰 3D Castle Pop-Out created!",
        attachment: fs.createReadStream(imgPath),
      },
      event.threadID,
      () => fs.unlinkSync(imgPath),
      event.messageID
    );
  } catch (err) {
    console.log(err);
    return send("⚠️ Error generating effect. Possibly bad image or network.");
  }
};

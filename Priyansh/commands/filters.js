const axios = require("axios");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "filters",
  version: "1.0",
  hasPermssion: 0,
  credits: "FaheemDev",
  description: "Apply various filters to a profile picture",
  commandCategory: "edit-image",
  usages: "[filterName] [@mention or reply]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const filters = [
      "greyscale",
      "sepia",
      "invert",
      "blur",
      "vintage",
      "duotone",
    ];
    const filter = args[0]?.toLowerCase();
    if (!filters.includes(filter)) {
      return api.sendMessage(
        `🎨 Available filters:\n${filters
          .map((f) => `- ${f}`)
          .join("\n")}\n\nUsage:\nfilters [filter] [@mention or reply]`,
        event.threadID
      );
    }

    const uid =
      event.type === "message_reply"
        ? event.messageReply.senderID
        : Object.keys(event.mentions)[1] ||
          Object.keys(event.mentions)[0] ||
          event.senderID;

    const avatarURL = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
    const avatarBuffer = (
      await axios.get(avatarURL, { responseType: "arraybuffer" })
    ).data;

    const img = await Canvas.loadImage(avatarBuffer);
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i],
        g = data[i + 1],
        b = data[i + 2];

      switch (filter) {
        case "greyscale":
          const avg = (r + g + b) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
          break;
        case "sepia":
          data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
          data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
          data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
          break;
        case "invert":
          data[i] = 255 - r;
          data[i + 1] = 255 - g;
          data[i + 2] = 255 - b;
          break;
        case "duotone":
          const gray = (r + g + b) / 3;
          data[i] = gray * 0.9; // purple tone
          data[i + 1] = gray * 0.4; // pink
          data[i + 2] = gray * 0.8;
          break;
        case "vintage":
          data[i] = Math.min(255, r * 0.9 + 20);
          data[i + 1] = Math.min(255, g * 0.85 + 15);
          data[i + 2] = Math.min(255, b * 0.7 + 30);
          break;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Apply blur if requested
    if (filter === "blur") {
      ctx.globalAlpha = 0.5;
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          ctx.drawImage(canvas, x, y);
        }
      }
      ctx.globalAlpha = 1.0;
    }

    const filePath = path.join(
      __dirname,
      "cache",
      `filter_${filter}_${uid}.png`
    );
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(filePath, buffer);

    return api.sendMessage(
      {
        body: `🖼️ Applied filter: ${filter}`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (err) {
    console.error("Filter error:", err);
    return api.sendMessage("❌ Failed to apply filter.", event.threadID);
  }
};

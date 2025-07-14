const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");

module.exports.config = {
  name: "imran",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Generate Imran Khan meme with your custom text",
  commandCategory: "meme",
  usages: "[text]",
  cooldowns: 5,
};

const templateURL = "https://i.imgur.com/eLwZkHZ.jpeg"; // ✅ Verified Imran Khan meme image
const localImagePath = path.join(__dirname, "cache", "imran_template.jpg");

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const { threadID, messageID } = event;

  if (!text) {
    return api.sendMessage(
      "📌 Usage:\n.imran <your text>\n\nExample:\n.imran Mujhe kyun nikala?",
      threadID,
      messageID
    );
  }

  try {
    // Download image if not already cached
    if (!fs.existsSync(localImagePath)) {
      const response = await axios.get(templateURL, {
        responseType: "arraybuffer",
      });
      fs.ensureDirSync(path.dirname(localImagePath));
      fs.writeFileSync(localImagePath, response.data);
    }

    const image = await Jimp.read(localImagePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    image.print(
      font,
      20,
      image.getHeight() - 90,
      {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      image.getWidth() - 40,
      100
    );

    const outputPath = path.join(__dirname, "cache", `imran_${Date.now()}.jpg`);
    await image.writeAsync(outputPath);

    return api.sendMessage(
      {
        body: `🗣️ Imran Khan says:`,
        attachment: fs.createReadStream(outputPath),
      },
      threadID,
      () => fs.unlinkSync(outputPath),
      messageID
    );
  } catch (err) {
    console.error("❌ Error:", err.message);
    return api.sendMessage(
      "⚠️ Meme generation failed. Try again later.",
      threadID,
      messageID
    );
  }
};

const fs = require("fs");
const axios = require("axios");
const path = require("path");
const { exec } = require("child_process");

module.exports.config = {
  name: "removebg",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem + GPT",
  description: "Remove image background using rembg",
  commandCategory: "tools",
  usages: "reply to image",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    const reply = event.messageReply;
    if (!reply || !reply.attachments || reply.attachments.length === 0)
      return api.sendMessage("⚠️ Please reply to an image.", event.threadID);

    const imageUrl = reply.attachments[0].url;
    const inputPath = path.join(__dirname, "input.jpg");
    const outputPath = path.join(__dirname, "output.png");

    // Download image
    const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(inputPath, res.data);

    // Try rembg normally first
    const command = `rembg i "${inputPath}" "${outputPath}" || python3 -m rembg i "${inputPath}" "${outputPath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error("❌ BG Remove Error:", stderr);
        return api.sendMessage("❌ Failed to remove background.", event.threadID);
      }

      // Send result
      api.sendMessage(
        {
          body: "✅ Background removed:",
          attachment: fs.createReadStream(outputPath)
        },
        event.threadID,
        () => {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }
      );
    });
  } catch (err) {
    console.error(err);
    api.sendMessage("⚠️ Unexpected error occurred.", event.threadID);
  }
};

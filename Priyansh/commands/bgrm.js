const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { exec } = require("child_process");

module.exports.config = {
  name: "bgrm",
  version: "2.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Remove image background (Offline - No API)",
  commandCategory: "image",
  usages: "[reply to an image]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const rembgPath = "/usr/local/python/current/bin/rembg"; // ⚠️ Change this to the path from 'which rembg'

  // Make sure user replied to an image
  const attachment = event.messageReply?.attachments?.[0];
  if (!attachment || attachment.type !== "photo")
    return api.sendMessage(
      "⚠️ Please reply to a photo to remove background.",
      event.threadID,
      event.messageID
    );

  // Define file paths
  const inputPath = path.join(
    __dirname,
    "cache",
    `${event.senderID}_input.png`
  );
  const outputPath = path.join(
    __dirname,
    "cache",
    `${event.senderID}_output.png`
  );

  try {
    // Ensure cache dir
    fs.ensureDirSync(path.dirname(inputPath));

    // Download the image
    const res = await axios.get(attachment.url, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(inputPath, res.data);

    // Run rembg
    exec(
      `"${rembgPath}" i "${inputPath}" "${outputPath}"`,
      async (err, stdout, stderr) => {
        if (err || !fs.existsSync(outputPath)) {
          console.error("rembg error:", stderr || err);
          return api.sendMessage(
            "❌ Failed to process image. Is rembg installed and working?",
            event.threadID,
            event.messageID
          );
        }

        // Send the background-removed image
        return api.sendMessage(
          {
            body: "✅ Background removed!",
            attachment: fs.createReadStream(outputPath),
          },
          event.threadID,
          () => {
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
          },
          event.messageID
        );
      }
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(
      "❌ Something went wrong while processing.",
      event.threadID,
      event.messageID
    );
  }
};

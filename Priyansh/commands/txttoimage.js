const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "logo",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description:
    "Generate a custom text logo image with color, size and background options",
  commandCategory: "image",
  usages:
    "logo <text> | size=80 | color=#ffffff | bg=#000000 | width=1200 | height=600",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  if (!args.length) {
    return api.sendMessage(
      "❌ Please provide text and optional settings.\n\nExample:\nlogo Hello World | size=100 | color=#ffffff | bg=#000000 | width=1000 | height=500",
      threadID,
      messageID
    );
  }

  // Combine args and split on "|"
  const fullInput = args
    .join(" ")
    .split("|")
    .map((item) => item.trim());
  const text = fullInput[0] || "Logo";

  // Defaults
  let fontSize = 100;
  let textColor = "#ffffff";
  let bgColor = "#000000";
  let width = 1200;
  let height = 600;

  // Parse options
  fullInput.slice(1).forEach((option) => {
    if (option.startsWith("size="))
      fontSize = parseInt(option.replace("size=", ""));
    if (option.startsWith("color="))
      textColor = option.replace("color=", "").trim();
    if (option.startsWith("bg=")) bgColor = option.replace("bg=", "").trim();
    if (option.startsWith("width="))
      width = parseInt(option.replace("width=", ""));
    if (option.startsWith("height="))
      height = parseInt(option.replace("height=", ""));
  });

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Register a font if needed
  // registerFont(path.join(__dirname, "fonts", "YourFont.ttf"), { family: "CustomFont" });

  // Text style
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Shadow for style
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 12;

  ctx.fillStyle = textColor;
  ctx.fillText(text, width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer("image/png");
  const filePath = path.join(__dirname, `logo_${Date.now()}.png`);
  fs.writeFileSync(filePath, buffer);

  // Send
  api.sendMessage(
    {
      body: `🖼 Logo Generated\n📝 Text: ${text}\n🎨 Text Color: ${textColor}\n📐 Size: ${fontSize}px\n🖌 Background: ${bgColor}`,
      attachment: fs.createReadStream(filePath),
    },
    threadID,
    () => fs.unlinkSync(filePath),
    messageID
  );
};

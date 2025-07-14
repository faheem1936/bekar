const axios = require("axios");

module.exports.config = {
  name: "textart",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Faheem",
  description: "Generate ASCII text art ",
  commandCategory: "fun",
  usages: ".textart <your text>",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const input = args.join(" ").trim();
  if (!input) {
    return api.sendMessage(
      "⚠️ Please enter text.\n\nExample:\n.textart Faheem",
      event.threadID,
      event.messageID
    );
  }

  try {
    const response = await axios.get("https://textart.io/api/figlet", {
      params: {
        text: input,
        style: "Standard", // Optional: try Shadow, Slant, Doom, etc.
      },
    });

    const art = Buffer.from(response.data.figlet, "base64").toString("utf-8");

    return api.sendMessage(
      `🎨 TextArt for: ${input}\n\n` + "```" + art + "```",
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.error("❌ API Error:", err.message);
    return api.sendMessage(
      "❌ Failed to generate text art. Try again later.",
      event.threadID,
      event.messageID
    );
  }
};

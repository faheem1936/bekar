const axios = require("axios");

module.exports.config = {
  name: "npm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Search NPM package info using Popcat API",
  commandCategory: "tools",
  usages: "[package name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ");
  const { threadID, messageID } = event;

  if (!query)
    return api.sendMessage(
      "📦 Please enter an NPM package name to search.",
      threadID,
      messageID
    );

  const apiUrl = `https://api.popcat.xyz/v2/npm?q=${encodeURIComponent(query)}`;

  try {
    const res = await axios.get(apiUrl);
    const pkg = res.data;

    const msg = `
📦 Package: ${pkg.name}
📝 Description: ${pkg.description || "No description"}
📍 Version: ${pkg.version}
👨‍💻 Author: ${pkg.author || "N/A"}
🔗 Homepage: ${pkg.links?.homepage || "N/A"}
📁 Repo: ${pkg.links?.repository || "N/A"}
📥 Install: npm i ${pkg.name}
📅 Last Published: ${pkg.last_published}
`.trim();

    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error("❌ NPM API Error:", err.message);
    return api.sendMessage(
      "❌ Couldn't find that NPM package. Try another name.",
      threadID,
      messageID
    );
  }
};

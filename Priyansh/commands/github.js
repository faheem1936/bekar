const axios = require("axios");

module.exports.config = {
  name: "github",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Fetch GitHub user info",
  commandCategory: "tools",
  usages: "[username]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const username = args[0];
  const { threadID, messageID } = event;

  if (!username)
    return api.sendMessage(
      "❌ Please provide a GitHub username.\n\nExample:\n.github torvalds",
      threadID,
      messageID
    );

  const apiURL = `https://api.popcat.xyz/v2/github?username=${encodeURIComponent(
    username
  )}`;

  try {
    const res = await axios.get(apiURL);
    const data = res.data;

    const info = `
👤 Name: ${data.name || "N/A"}
🔗 Username: ${data.username}
📍 Location: ${data.location || "N/A"}
📅 Created At: ${data.created_at}
📌 Bio: ${data.bio || "N/A"}
📦 Public Repos: ${data.public_repos}
👥 Followers: ${data.followers}
🔁 Following: ${data.following}
🏢 Company: ${data.company || "N/A"}
🌐 Profile: ${data.url}
`;

    return api.sendMessage(
      {
        body: info.trim(),
        attachment: await global.utils.getStreamFromURL(data.avatar),
      },
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ GitHub API error:", err.message);
    return api.sendMessage(
      "⚠️ Couldn't find GitHub user or API failed.",
      threadID,
      messageID
    );
  }
};

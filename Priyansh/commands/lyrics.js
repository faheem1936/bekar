const axios = require("axios");

module.exports.config = {
  name: "lyrics",
  version: "1.0",
  hasPermssion: 0, // 0 = everyone can use
  credits: "FaheemDev",
  description: "Get song lyrics by artist and title",
  commandCategory: "music",
  usages: "lyrics [artist] - [song title]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const input = args.join(" ").split(" - ");
  
  if (input.length < 2) {
    return api.sendMessage(
      "❗ Usage: lyrics [artist] - [song title]\nExample: lyrics Taylor Swift - Love Story",
      event.threadID
    );
  }

  const [artist, title] = input.map(item => item.trim());

  try {
    const res = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const lyrics = res.data.lyrics;

    if (!lyrics) {
      return api.sendMessage("❌ No lyrics found for this song.", event.threadID);
    }

    const message = `🎤 *${artist} - ${title}*\n\n${lyrics.length > 3800 ? lyrics.slice(0, 3800) + "\n\n...(truncated)" : lyrics}`;
    
    return api.sendMessage(message, event.threadID, event.messageID);
  } catch (err) {
    console.error("Lyrics Command Error:", err.message);
    return api.sendMessage("❌ Failed to fetch lyrics. Try a different song.", event.threadID);
  }
};

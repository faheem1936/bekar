const ytSearch = require("yt-search");
const ytdl = require("ytdl-core");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const stream = require("stream");
const { promisify } = require("util");

const finished = promisify(stream.finished);
const tempData = new Map();

module.exports.config = {
  name: "video",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description: "Search YouTube videos and download one",
  commandCategory: "media",
  usages: "video [search term]",
  cooldowns: 5,
};

// 📥 Helper: Get image stream
async function getStreamFromURL(url) {
  const res = await axios.get(url, { responseType: "stream" });
  await finished(res.data);
  return res.data;
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const query = args.join(" ");

  if (!query)
    return api.sendMessage(
      "❗ Usage: video [search term]",
      threadID,
      messageID
    );

  try {
    const res = await ytSearch(query);
    const results = res.videos.slice(0, 5);

    if (results.length === 0)
      return api.sendMessage("⚠️ No results found.", threadID, messageID);

    let msg = "🎥 Reply with a number (1-5) to download:\n\n";
    for (let i = 0; i < results.length; i++) {
      msg += `${i + 1}. ${results[i].title} (${results[i].timestamp})\n\n`;
    }

    // Store results temporarily
    tempData.set(senderID, results);

    const thumbnails = await Promise.all(
      results.map((v) => getStreamFromURL(v.thumbnail))
    );

    return api.sendMessage(
      {
        body: msg.trim(),
        attachment: thumbnails,
      },
      threadID,
      (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
          });
        }
      },
      messageID
    );
  } catch (err) {
    console.error("❌ Search error:", err.message);
    return api.sendMessage("❌ Error searching YouTube.", threadID, messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { body, senderID, threadID, messageID } = event;

  if (senderID !== handleReply.author) return;

  const num = parseInt(body);
  if (isNaN(num) || num < 1 || num > 5)
    return api.sendMessage(
      "❗ Reply with a number from 1 to 5.",
      threadID,
      messageID
    );

  const videos = tempData.get(senderID);
  const chosen = videos[num - 1];
  const filePath = path.join(__dirname, "video.mp4");

  try {
    const stream = ytdl(chosen.url, {
      quality: "18", // 360p mp4
      filter: "audioandvideo",
    });

    const file = fs.createWriteStream(filePath);
    stream.pipe(file);

    stream.on("end", () => {
      api.sendMessage(
        {
          body: `🎬 ${chosen.title}`,
          attachment: fs.createReadStream(filePath),
        },
        threadID,
        () => {
          fs.unlinkSync(filePath);
          tempData.delete(senderID);
        },
        messageID
      );
    });

    stream.on("error", (e) => {
      console.error("❌ Download error:", e.message);
      return api.sendMessage(
        "❌ Failed to download video.",
        threadID,
        messageID
      );
    });
  } catch (err) {
    console.error("❌ General error:", err.message);
    return api.sendMessage("⚠️ Something went wrong.", threadID, messageID);
  }
};

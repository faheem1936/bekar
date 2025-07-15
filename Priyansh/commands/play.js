const ytSearch = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "song",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King + GPT",
  description: "Send YouTube song audio as MP3",
  commandCategory: "music",
  usages: "song [name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ");
  const { threadID, messageID, senderID } = event;

  if (!query)
    return api.sendMessage("❗ Usage: .song [song name]", threadID, messageID);

  try {
    const search = await ytSearch(query);
    const video = search.videos[0];

    if (!video)
      return api.sendMessage("❌ Song not found.", threadID, messageID);

    const filePath = path.join(__dirname, "cache", `song_${senderID}.mp3`);
    const stream = ytdl(video.url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);

    writeStream.on("finish", () => {
      api.sendMessage(
        {
          body: `🎵 ${video.title}\n🎙️ ${video.author.name}\n🔗 ${video.url}`,
          attachment: fs.createReadStream(filePath),
        },
        threadID,
        () => fs.unlinkSync(filePath),
        messageID
      );
    });

    writeStream.on("error", (err) => {
      console.error("❌ WriteStream error:", err);
      api.sendMessage("❌ Failed to save audio file.", threadID, messageID);
    });
  } catch (err) {
    console.error("❌ Song Error:", err.message || err);
    return api.sendMessage("❌ Failed to fetch song.", threadID, messageID);
  }
};

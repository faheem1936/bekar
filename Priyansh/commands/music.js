const { ytDownloader } = require("@derimalec/ytdl-to-mp3");
const ytSearch = require("yt-search");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "music",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Faheem",
    description: "Download YouTube song (audio) from keyword search",
    commandCategory: "Media",
    usages: "[songName]",
    cooldowns: 5,
    dependencies: {
      "@derimalec/ytdl-to-mp3": "",
      "yt-search": "",
      "fs-extra": "",
      "path": "",
    },
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    let songName = args.join(" ");
    if (!songName) {
      return api.sendMessage(
        "⚠️ Please provide a song name. Usage: .music [songName]",
        threadID,
        messageID
      );
    }

    const processing = await api.sendMessage(
      "⏳ Searching and converting song, please wait...",
      threadID,
      messageID
    );

    try {
      // YouTube search
      const searchResults = await ytSearch(songName);
      if (!searchResults.videos.length) {
        throw new Error("No results found for your search query.");
      }
      const top = searchResults.videos[0];
      const videoUrl = `https://www.youtube.com/watch?v=${top.videoId}`;

      // Prepare output path
      const safeTitle = top.title.replace(/[^a-zA-Z0-9 \-_]/g, "").substring(0, 50);
      const outputDir = path.join(__dirname, "cache");
      await fs.ensureDir(outputDir);
      const outputPath = path.join(outputDir, `${safeTitle}.mp3`);

      // Use ytdl-to-mp3 to download and convert
      const result = await ytDownloader.download(videoUrl, outputDir, {
        outputFormat: "audio",
        audioFormat: "mp3",
        audioBitrate: 192 // ya 320 agar chaho
      });

      // result.path mein file ka path hoga
      await api.sendMessage(
        {
          body: `🎵 Title: ${top.title}\nHere is your audio file:`,
          attachment: fs.createReadStream(result.path)
        },
        threadID,
        () => {
          fs.unlinkSync(result.path);
          api.unsendMessage(processing);
        },
        messageID
      );
    } catch (err) {
      console.error("Error:", err);
      api.sendMessage(
        `❌ Failed to download/convert: ${err.message}`,
        threadID,
        messageID
      );
      api.unsendMessage(processing);
    }
  },
};

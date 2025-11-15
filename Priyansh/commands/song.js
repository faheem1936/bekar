const ytdl = require("@distube/ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "song",
    version: "1.0.4", // Updated version
    hasPermssion: 0,
    credits: "Mian Amir",
    description: "Download and play YouTube song or video from keyword search",
    commandCategory: "Media",
    usages: "[songName] or [video songName]",
    cooldowns: 5,
    dependencies: {
      "@distube/ytdl-core": "",
      "yt-search": "",
      fs: "",
      path: "",
    },
  },

  run: async function ({ api, event, args }) {
    let songName, type;

    // Parse command: .song <song> or .song video <song>
    if (args.length > 1 && args[0].toLowerCase() === "video") {
      type = "video";
      songName = args.slice(1).join(" ");
    } else {
      type = "audio";
      songName = args.join(" ");
    }

    if (!songName) {
      return api.sendMessage(
        "⚠️ Please provide a song name. Usage: .song [songName] or .song video [songName]",
        event.threadID,
        event.messageID
      );
    }

    const processingMessage = await api.sendMessage(
      "⏳ Processing your request. Please wait...",
      event.threadID,
      event.messageID
    );

    try {
      // Search for the song on YouTube
      const searchResults = await ytSearch(songName);
      if (!searchResults || !searchResults.videos.length) {
        throw new Error("No results found for your search query.");
      }

      const topResult = searchResults.videos[0];
      const videoUrl = `https://www.youtube.com/watch?v=${topResult.videoId}`;

      // Safe filename
      const safeFileName = topResult.title.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 50);
      const filename = `${safeFileName}.${type === "audio" ? "mp3" : "mp4"}`;
      const downloadPath = path.join(__dirname, filename);

      // Download stream
      const stream = ytdl(videoUrl, {
        filter: type === "video" ? "videoandaudio" : "audioonly",
        quality: type === "video" ? "highestvideo" : "highestaudio",
        requestOptions: {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        },
      });

      const writeStream = fs.createWriteStream(downloadPath);
      stream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
        stream.on("error", reject);
      });

      // Send the file
      await api.sendMessage(
        {
          body: `🎵 Title: ${topResult.title}\nHere is your ${type === "audio" ? "audio" : "video"} file.`,
          attachment: fs.createReadStream(downloadPath),
        },
        event.threadID,
        () => {
          // Cleanup
          fs.unlinkSync(downloadPath);
          api.unsendMessage(processingMessage.messageID);
        },
        event.messageID
      );
    } catch (error) {
      console.error("Download error:", error.message);
      api.sendMessage(
        `❌ Failed to download song: ${error.message}`,
        event.threadID,
        event.messageID
      );
      api.unsendMessage(processingMessage.messageID);
    }
  },
};

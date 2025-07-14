const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "fbart",
  version: "2.0",
  hasPermission: 0,
  credits: "Faheem + ChatGPT",
  description: "Generate Facebook-style logo using textpro.me",
  commandCategory: "logo",
  usages: "#fbart Faheem",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ").trim() || "facebook";

  try {
    const url = "https://textpro.me/create-3d-facebook-logo-748.html";

    // Step 1: Load form to get token
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const token = html.match(/name="token" value="(.*?)"/)?.[1];
    if (!token) throw new Error("Token not found");

    // Step 2: Submit form with your text
    const formData = new URLSearchParams();
    formData.append("text[]", text);
    formData.append("submit", "Go");
    formData.append("token", token);

    const { data: result } = await axios.post(url, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Step 3: Get image URL
    const imgPath = result.match(
      /<div class="thumbnail">.*?<img src="(.*?)"/s
    )?.[1];
    if (!imgPath) throw new Error("Image not found");
    const imgURL = "https://textpro.me" + imgPath;

    // Step 4: Download image
    const imgData = (
      await axios.get(imgURL, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
        },
      })
    ).data;

    const filePath = path.join(
      __dirname,
      "cache",
      `fbart_${event.senderID}.jpg`
    );
    fs.writeFileSync(filePath, imgData);

    // Step 5: Send result
    api.sendMessage(
      {
        body: `✅ Facebook logo created for: ${text}`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (e) {
    console.error("❌ Logo error:", e.message || e);
    api.sendMessage(
      "❌ Failed to generate logo. Try again later.",
      event.threadID,
      event.messageID
    );
  }
};

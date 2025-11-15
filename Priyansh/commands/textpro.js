const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "textpro",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Create TextPro logos using API",
  commandCategory: "Logo Maker",
  usages: "<style> <text1> | <text2>",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID } = event;

    // If user types 'textpro list', show all available styles
    if (args[0] && args[0].toLowerCase() === "list") {
      const styles = [
        "layered","paper","pornhub","harrypotter","embossed","broken","blackpink",
        "carbon","gradient","glue","neon","blood","firework","dropwater","imglitch",
        "aglitch","glossy","bear","devil","christmas","magma","stone","light","berry",
        "transformer","fiction","videogame","greenhorror","captainamerica","metallic",
        "discovery","circuit","sketch","choror","spooky","skeleton"
      ];

      const message = "✨ Available TextPro Styles:\n" + styles.join(" | ");
      return api.sendMessage(message, threadID, messageID);
    }

    // No Args
    if (args.length === 0) {
      return api.sendMessage(
        "⚠️ Usage: textpro <style> <text1> | <text2>\nExample:\ntextpro harrypotter Faheem\ntextpro layered Faheem | Akhtar",
        threadID,
        messageID
      );
    }

    // Extract style
    const style = args[0].toLowerCase();

    // Join remaining text
    const fullText = args.slice(1).join(" ");

    // Split text1 | text2
    let text1 = fullText.split("|")[0]?.trim();
    let text2 = fullText.split("|")[1]?.trim();

    if (!text1 || text1 === "") {
      return api.sendMessage("⚠️ Please enter text.\nExample: textpro neon Faheem", threadID, messageID);
    }

    // API URL variable
    let apiUrl = "";
    let message = "";

    // ⭐ ALL TEXTPRO STYLES BELOW ⭐
    switch (style) {

      case "layered":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/layered?text=${text1}&text2=${text2}`;
        message = "✨ Layered Logo Ready!";
        break;

      case "paper":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/paper?text=${text1}`;
        message = "✨ Paper Logo Ready!";
        break;

      case "pornhub":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/pornhub?text=${text1}&text2=${text2}`;
        message = "🔥 Pornhub Logo Ready!";
        break;

      case "harrypotter":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/harrypotter?text=${text1}`;
        message = "✨ Harry Potter Logo Ready!";
        break;

      case "embossed":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/embossed?text=${text1}`;
        message = "✨ Embossed Logo Ready!";
        break;

      case "broken":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/broken?text=${text1}`;
        message = "✨ Broken Logo Ready!";
        break;

      case "blackpink":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/blackpink?text=${text1}`;
        message = "✨ Blackpink Logo Ready!";
        break;

      case "carbon":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/carbon?text=${text1}`;
        message = "✨ Carbon Logo Ready!";
        break;

      case "gradient":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/gradient?text=${text1}`;
        message = "✨ Gradient Logo Ready!";
        break;

      case "glue":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/glue?text=${text1}`;
        message = "✨ Glue Logo Ready!";
        break;

      case "neon":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/neon?text=${text1}`;
        message = "✨ Neon Logo Ready!";
        break;

      case "blood":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/blood?text=${text1}`;
        message = "✨ Blood Logo Ready!";
        break;

      case "firework":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/firework?text=${text1}`;
        message = "✨ Firework Logo Ready!";
        break;

      case "dropwater":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/dropwater?text=${text1}`;
        message = "✨ Dropwater Logo Ready!";
        break;

      case "imglitch":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/imglitch?text=${text1}`;
        message = "✨ Image Glitch Logo Ready!";
        break;

      case "aglitch":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/aglitch?text=${text1}&text2=${text2}`;
        message = "✨ Advance Glitch Logo Ready!";
        break;

      case "glossy":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/glossy?text=${text1}`;
        message = "✨ Glossy Logo Ready!";
        break;

      case "bear":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/bear?text=${text1}`;
        message = "✨ Bear Logo Ready!";
        break;

      case "devil":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/devil?text=${text1}`;
        message = "✨ Devil Logo Ready!";
        break;

      case "christmas":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/christmas?text=${text1}`;
        message = "✨ Christmas Logo Ready!";
        break;

      case "magma":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/magma?text=${text1}`;
        message = "✨ Magma Logo Ready!";
        break;

      case "stone":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/stone?text=${text1}`;
        message = "✨ Stone Logo Ready!";
        break;

      case "light":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/light?text=${text1}`;
        message = "✨ Light Logo Ready!";
        break;

      case "berry":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/berry?text=${text1}`;
        message = "✨ Berry Logo Ready!";
        break;

      case "transformer":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/transformer?text=${text1}`;
        message = "✨ Transformer Logo Ready!";
        break;

      case "fiction":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/fiction?text=${text1}`;
        message = "✨ Fiction Logo Ready!";
        break;

      case "videogame":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/videogame?text=${text1}`;
        message = "✨ Video Game Logo Ready!";
        break;

      case "greenhorror":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/greenhorror?text=${text1}`;
        message = "✨ Green Horror Logo Ready!";
        break;

      case "captainamerica":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/captainamerica?text=${text1}&text2=${text2}`;
        message = "✨ Captain America Logo Ready!";
        break;

      case "metallic":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/metallic?text=${text1}`;
        message = "✨ Metallic Logo Ready!";
        break;

      case "discovery":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/discovery?text=${text1}`;
        message = "✨ Discovery Logo Ready!";
        break;

      case "circuit":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/circuit?text=${text1}`;
        message = "✨ Circuit Logo Ready!";
        break;

      case "sketch":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/sketch?text=${text1}`;
        message = "✨ Sketch Logo Ready!";
        break;

      case "choror":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/choror?text=${text1}&text2=${text2}`;
        message = "✨ Choror Logo Ready!";
        break;

      case "spooky":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/spooky?text=${text1}&text2=${text2}`;
        message = "✨ Spooky Logo Ready!";
        break;

      case "skeleton":
        apiUrl = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/textpro/skeleton?text=${text1}`;
        message = "✨ Skeleton Logo Ready!";
        break;

      default:
        return api.sendMessage("❌ Invalid style! Try another.", threadID, messageID);
    }

    // ⚡ Fetch Image From API
    const imgBuffer = (await axios.get(apiUrl, { responseType: "arraybuffer" })).data;

    const filePath = path.join(__dirname, `/cache/${Date.now()}.png`);
    fs.writeFileSync(filePath, Buffer.from(imgBuffer, "binary"));

    // Send image
    api.sendMessage(
      {
        body: message,
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );

  } catch (err) {
    console.log(err);
    api.sendMessage("❌ Error generating Logo!", event.threadID, event.messageID);
  }
};

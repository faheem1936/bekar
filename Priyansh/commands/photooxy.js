const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "style",
  version: "2.3.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Generate offline PhotoOxy-style text effects (50+ styles)",
  commandCategory: "image",
  usages: "style <effect> <text>",
  cooldowns: 5,
};

const effects = {
  neon: { bg: "#000", shadow: "#0ff", fill: "#fff" },
  glowred: { bg: "#100", shadow: "#f00", fill: "#fff" },
  glowgreen: { bg: "#020", shadow: "#0f0", fill: "#fff" },
  fire: { bg: "#220000", shadow: "#ff6600", fill: "#fff" },
  ice: { bg: "#003344", shadow: "#00ffff", fill: "#fff" },
  steel: { bg: "#222", shadow: "#ccc", fill: "#ddd" },
  rainbow: { bg: "#000", fill: "rainbow" },
  horror: { bg: "#000", shadow: "#c00", fill: "#fff" },
  glitch: { bg: "#111", shadow: "#f0f", fill: "#0ff" },
  cyberpunk: { bg: "#0a001f", shadow: "#ff00ff", fill: "#00ffff" },
  deep: { bg: "#000", shadow: "#111", fill: "#fff" },
  pink: { bg: "#330022", shadow: "#ff99cc", fill: "#fff" },
  toxic: { bg: "#001100", shadow: "#00ff00", fill: "#ccffcc" },
  gold: { bg: "#1a1a00", fill: "#ffd700", shadow: "#fff" },
  silver: { bg: "#222", fill: "#ccc", shadow: "#eee" },
  thunder: { bg: "#000", shadow: "#ffff00", fill: "#fff" },
  space: { bg: "#000022", shadow: "#ccc", fill: "#fff" },
  retro: { bg: "#111", shadow: "#ff0", fill: "#0ff" },
  bubble: { bg: "#eee", shadow: "#999", fill: "#333" },
  ink: { bg: "#fefefe", fill: "#111", shadow: "#666" },
  magma: { bg: "#330000", shadow: "#ff3300", fill: "#fff" },
  candy: { bg: "#ffb6c1", fill: "#fff", shadow: "#f0f" },
  matrix: { bg: "#000", fill: "#00ff00", shadow: "#0f0" },
  winter: { bg: "#ccf2ff", fill: "#003366", shadow: "#66ccff" },
  lava: { bg: "#330000", fill: "lava" },
  hacker: { bg: "#000", fill: "#00ff00", shadow: "#00ff00" },
  royal: { bg: "#2e003e", fill: "#ffd700", shadow: "#fff" },
  bokeh: { bg: "#444", fill: "#fff", shadow: "#ccc" },
  steelblue: { bg: "#2f4f4f", fill: "#add8e6", shadow: "#fff" },
  woody: { bg: "#3b2f2f", fill: "#deb887", shadow: "#8b4513" },
  smoke: { bg: "#1c1c1c", fill: "#d3d3d3", shadow: "#999" },
  diamond: { bg: "#222", fill: "#b9f2ff", shadow: "#66ffff" },
  bloody: { bg: "#1a0000", fill: "#ff0000", shadow: "#8b0000" },
  chalk: { bg: "#333", fill: "#fff", shadow: "#ccc" },
  tech: { bg: "#001f3f", fill: "#39cccc", shadow: "#7fdbff" },
  amber: { bg: "#ffbf00", fill: "#fff", shadow: "#ff8000" },
  paper: { bg: "#f5f5dc", fill: "#222", shadow: "#999" },
  digital: { bg: "#000", fill: "#0f0", shadow: "#0f0" },
  cloud: { bg: "#d0f0ff", fill: "#0066cc", shadow: "#3399ff" },
  stone: { bg: "#666", fill: "#ccc", shadow: "#999" },
  sunrise: { bg: "#ffdead", fill: "sunset" },
  chalkboard: { bg: "#2e2e2e", fill: "#fff", shadow: "#555" },
  firelight: { bg: "#330000", fill: "lava", shadow: "#ff6600" },
  bluesteel: { bg: "#001f3f", fill: "#7fdbff", shadow: "#001f3f" },
  foggy: { bg: "#444", fill: "#bbb", shadow: "#222" },
  galaxy: { bg: "#000033", fill: "rainbow", shadow: "#ccc" },
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  if (args.length < 2) {
    return api.sendMessage(
      `📌 Usage: photooxy <effect> <text>\nAvailable: ${Object.keys(
        effects
      ).join(", ")}`,
      threadID,
      messageID
    );
  }

  const effect = args[0].toLowerCase();
  const text = args.slice(1).join(" ");

  if (!effects[effect])
    return api.sendMessage(`❌ Invalid effect: ${effect}`, threadID, messageID);

  const { bg, fill, shadow } = effects[effect];
  const width = 1000,
    height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const fontPath = path.join(__dirname, "fonts", "Orbitron-Bold.ttf");
  if (fs.existsSync(fontPath)) {
    registerFont(fontPath, { family: "Orbitron" });
    ctx.font = "bold 80px Orbitron";
  } else {
    ctx.font = "bold 80px Arial";
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowBlur = 30;
  ctx.shadowColor = shadow || "#000";

  if (fill === "rainbow") {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.2, "orange");
    gradient.addColorStop(0.4, "yellow");
    gradient.addColorStop(0.6, "green");
    gradient.addColorStop(0.8, "blue");
    gradient.addColorStop(1, "violet");
    ctx.fillStyle = gradient;
  } else if (fill === "sunset") {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#ff7e5f");
    gradient.addColorStop(1, "#feb47b");
    ctx.fillStyle = gradient;
  } else if (fill === "aqua") {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#00f2fe");
    gradient.addColorStop(1, "#4facfe");
    ctx.fillStyle = gradient;
  } else if (fill === "lava") {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(1, "#ffa500");
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = fill || "#fff";
  }

  ctx.fillText(text.toUpperCase(), width / 2, height / 2);

  const outPath = path.join(__dirname, `photooxy_${effect}_${Date.now()}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer());

  api.sendMessage(
    {
      body: `✨ PhotoOxy effect: ${effect}`,
      attachment: fs.createReadStream(outPath),
    },
    threadID,
    () => fs.unlinkSync(outPath),
    messageID
  );
};

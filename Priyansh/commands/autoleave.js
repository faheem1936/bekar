const fs = require("fs-extra");
const configPath = __dirname + "/autoleave-config.json";
const badwordsPath = __dirname + "/autoleave-badwords.json";

// Initialize config files if missing
if (!fs.existsSync(configPath)) fs.writeJsonSync(configPath, {});
if (!fs.existsSync(badwordsPath)) {
  fs.writeJsonSync(badwordsPath, [
    "chutiya",
    "madarchod",
    "bhosdike",
    "gandu",
    "randi",
    "lund",
    "bhenchod",
    "mc",
    "bc",
    "bsdk",
    "chod",
    "fuck",
    "asshole",
    "slut",
    "chodu",
    "lavda",
    "bkl",
    "rakhail",
    "jhant",
    "gaand",
    "chut",
    "gand",
    "loda",
    "lauda",
    "bhosri",
    "gaandfat",
    "kamina",
    "haraami",
    "nalli",
    "randi ka baccha",
    "tatti",
    "nalayak",
    "bakchod",
    "kutta",
    "kameena",
    "kutti",
    "pataka",
    "lullu",
    "behen ke lode",
    "maa ke lode",
    "maa chod",
    "behanchod",
    "lode",
    "kutte",
    "jhantu",
    "bhadwa",
    "haramzada",
    "tinde",
    "chikni",
    "randiya",
  ]);
}

module.exports.config = {
  name: "autoleavebadwords",
  version: "4.0.0",
  hasPermission: 1,
  credits: "Faheem King",
  description:
    "Auto-leave on bad words (toggle per thread/all + add/remove badwords)",
  commandCategory: "moderation",
  usages: ".autoleavebad on/off [all|tid] | add/remove/list <word>",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body || !event.isGroup) return;

  const config = fs.readJsonSync(configPath);
  const badwords = fs.readJsonSync(badwordsPath);
  if (!config[event.threadID]) return;

  const msg = event.body.toLowerCase();
  const hasBad = badwords.some((w) => msg.includes(w));
  if (!hasBad) return;

  try {
    await api.sendMessage(
      "❌ Bad word detected! Leaving group 👋",
      event.threadID
    );
    await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
  } catch (err) {
    console.error("Leave failed:", err.message);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const config = fs.readJsonSync(configPath);
  let badwords = fs.readJsonSync(badwordsPath);
  const action = args[0];
  const target = args[1];

  // 🔧 Add bad word
  if (action === "add" && target) {
    if (badwords.includes(target.toLowerCase()))
      return api.sendMessage(
        "⚠️ That word is already in the list.",
        event.threadID
      );

    badwords.push(target.toLowerCase());
    fs.writeJsonSync(badwordsPath, badwords, { spaces: 2 });
    return api.sendMessage(
      `✅ Word added to badwords: ${target}`,
      event.threadID
    );
  }

  // 🔧 Remove bad word
  if (action === "remove" && target) {
    if (!badwords.includes(target.toLowerCase()))
      return api.sendMessage(
        "⚠️ That word is not in the list.",
        event.threadID
      );

    badwords = badwords.filter((w) => w !== target.toLowerCase());
    fs.writeJsonSync(badwordsPath, badwords, { spaces: 2 });
    return api.sendMessage(`🗑️ Word removed: ${target}`, event.threadID);
  }

  // 📜 List all bad words
  if (action === "list") {
    const chunks = badwords.map((w, i) => `${i + 1}. ${w}`).join("\n");
    return api.sendMessage(`📛 Badwords List:\n\n${chunks}`, event.threadID);
  }

  // ✅ Enable auto-leave
  if (action === "on") {
    if (target === "all") {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      for (const thread of threads) config[thread.threadID] = true;
      fs.writeJsonSync(configPath, config, { spaces: 2 });
      return api.sendMessage(
        "✅ Auto-leave enabled for all threads.",
        event.threadID
      );
    }

    const tid = target || event.threadID;
    config[tid] = true;
    fs.writeJsonSync(configPath, config, { spaces: 2 });
    return api.sendMessage(
      `✅ Auto-leave enabled for thread: ${tid}`,
      event.threadID
    );
  }

  // ❌ Disable auto-leave
  if (action === "off") {
    if (target === "all") {
      Object.keys(config).forEach((tid) => (config[tid] = false));
      fs.writeJsonSync(configPath, config, { spaces: 2 });
      return api.sendMessage(
        "❌ Auto-leave disabled for all threads.",
        event.threadID
      );
    }

    const tid = target || event.threadID;
    config[tid] = false;
    fs.writeJsonSync(configPath, config, { spaces: 2 });
    return api.sendMessage(
      `❌ Auto-leave disabled for thread: ${tid}`,
      event.threadID
    );
  }

  // 🧾 Help
  return api.sendMessage(
    `🛠️ Usage:
.autoleavebad on [all|<tid>]
.autoleavebad off [all|<tid>]
.autoleavebad add <word>
.autoleavebad remove <word>
.autoleavebad list`,
    event.threadID
  );
};

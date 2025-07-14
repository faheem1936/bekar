const fs = require("fs-extra");
const path = require("path");

const LANG_FILE = path.join(__dirname, "language.json");

const AVAILABLE_LANGUAGES = [
  "english",
  "urdu",
  "hindi",
  "spanish",
  "french",
  "german",
  "arabic",
  "chinese",
  "japanese",
  "korean",
];

function loadLangData() {
  return fs.existsSync(LANG_FILE)
    ? JSON.parse(fs.readFileSync(LANG_FILE))
    : { system: "english", users: {}, groups: {} };
}

function saveLangData(data) {
  fs.writeFileSync(LANG_FILE, JSON.stringify(data, null, 2));
}

module.exports.config = {
  name: "languages",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Change or reset bot language",
  commandCategory: "system",
  usages: [
    "list [page number]",
    "set me [language]",
    "set group [language]",
    "set system [language]",
    "reset me",
    "reset group",
    "reset system",
  ],
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, senderID, messageID } = event;
  const data = loadLangData();

  const sub = args[0]?.toLowerCase();
  const scope = args[1]?.toLowerCase();
  const value = args[2]?.toLowerCase();

  if (!sub) {
    return api.sendMessage(
      `📘 Usage:\n• list [page]\n• set me/group/system [language]\n• reset me/group/system`,
      threadID,
      messageID
    );
  }

  // Show paginated language list
  if (sub === "list") {
    const page = Math.max(parseInt(args[1]) || 1, 1);
    const perPage = 5;
    const totalPages = Math.ceil(AVAILABLE_LANGUAGES.length / perPage);

    if (page > totalPages) {
      return api.sendMessage(
        `❌ Page ${page} does not exist. Max: ${totalPages}`,
        threadID,
        messageID
      );
    }

    const start = (page - 1) * perPage;
    const langs = AVAILABLE_LANGUAGES.slice(start, start + perPage)
      .map((lang, i) => `${start + i + 1}. ${lang}`)
      .join("\n");

    return api.sendMessage(
      `🌐 Available Languages (Page ${page}/${totalPages}):\n${langs}`,
      threadID,
      messageID
    );
  }

  // Set language
  if (sub === "set") {
    if (!["me", "group", "system"].includes(scope))
      return api.sendMessage(
        "❌ Scope must be: me, group, or system",
        threadID,
        messageID
      );

    if (!value || !AVAILABLE_LANGUAGES.includes(value))
      return api.sendMessage(
        `❌ Invalid language.\nUse: languages list`,
        threadID,
        messageID
      );

    if (scope === "me") data.users[senderID] = value;
    if (scope === "group") data.groups[threadID] = value;
    if (scope === "system") data.system = value;

    saveLangData(data);
    return api.sendMessage(
      `✅ Language set for ${scope} to: ${value}`,
      threadID,
      messageID
    );
  }

  // Reset language
  if (sub === "reset") {
    if (!["me", "group", "system"].includes(scope))
      return api.sendMessage(
        "❌ Scope must be: me, group, or system",
        threadID,
        messageID
      );

    if (scope === "me") delete data.users[senderID];
    if (scope === "group") delete data.groups[threadID];
    if (scope === "system") data.system = "english";

    saveLangData(data);
    return api.sendMessage(
      `♻️ Language reset for ${scope}.`,
      threadID,
      messageID
    );
  }

  // Invalid command fallback
  return api.sendMessage(
    `⚠️ Invalid usage.\nTry: languages list / set me urdu / reset group`,
    threadID,
    messageID
  );
};

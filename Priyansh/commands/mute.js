const fs = require("fs");
const muteListPath = __dirname + "/cache/muteList.json";
if (!fs.existsSync(muteListPath))
  fs.writeFileSync(muteListPath, JSON.stringify([]));

module.exports.config = {
  name: "mute",
  version: "1.0.2",
  hasPermission: 1,
  credits: "Faheem Akhtar",
  description: "Mute a user to auto-delete their messages",
  commandCategory: "moderation",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, mentions } = event;
  const muteList = JSON.parse(fs.readFileSync(muteListPath));

  if (!mentions || Object.keys(mentions).length === 0)
    return api.sendMessage("❌ Please mention a user to mute.", threadID);

  const targetID = Object.keys(mentions)[0];

  if (muteList.includes(targetID))
    return api.sendMessage("🔇 User is already muted.", threadID);

  muteList.push(targetID);
  fs.writeFileSync(muteListPath, JSON.stringify(muteList));
  const name = (await Users.getNameUser(targetID)) || "User";

  return api.sendMessage(
    `✅ ${name} has been muted. Their messages will be auto-deleted.`,
    threadID
  );
};

module.exports.handleEvent = async function ({ api, event }) {
  const muteList = JSON.parse(fs.readFileSync(muteListPath));
  const { senderID, messageID } = event;

  if (muteList.includes(senderID)) {
    return api.unsendMessage(messageID);
  }
};

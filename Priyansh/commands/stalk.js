const axios = require("axios");
const { Readable } = require("stream");

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

module.exports.config = {
  name: "stalk",
  version: "1.3.2",
  hasPermission: 0,
  credits: "Faheem King + ChatGPT",
  description:
    "Get info of a mentioned or replied Facebook user with profile picture",
  commandCategory: "info",
  usages: "stalk @user OR reply then type stalk",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID, mentions, messageReply } = event;

  let uid;
  if (Object.keys(mentions).length > 0) {
    uid = Object.keys(mentions)[0];
  } else if (messageReply) {
    uid = messageReply.senderID;
  } else {
    return api.sendMessage(
      "❌ Tag someone or reply to their message to stalk.",
      threadID,
      messageID
    );
  }

  try {
    const info = await api.getUserInfo(uid);
    const user = info[uid];

    if (!user)
      return api.sendMessage("❌ User not found!", threadID, messageID);

    const gender =
      user.gender === 1 ? "Female" : user.gender === 2 ? "Male" : "Unknown";

    let msg =
      `👁‍🗨 Facebook User Info:\n\n` +
      `📌 Name: ${user.name}\n` +
      `🆔 UID: ${uid}\n` +
      `🚻 Gender: ${gender}\n` +
      `🧠 Is Friend: ${user.isFriend ? "Yes" : "No"}\n` +
      `🎂 Birthday: ${user.birthday || "Unknown"}\n` +
      `🏠 Location: ${user.location ? user.location.name : "Unknown"}\n` +
      `👥 Friend Count: ${user.friendCount || "Unknown"}\n` +
      `🎉 Is Birthday Today: ${user.isBirthday ? "Yes" : "No"}\n` +
      `🔗 Profile: https://facebook.com/${uid}`;

    const profilePicUrl = `https://graph.facebook.com/${uid}/picture?type=large`;

    // Fetch image as buffer
    const response = await axios({
      method: "get",
      url: profilePicUrl,
      responseType: "arraybuffer",
    });

    // Convert buffer to readable stream
    const imageStream = bufferToStream(Buffer.from(response.data, "binary"));

    // Optional: Set a path property so some libs detect filename (if your API supports it)
    imageStream.path = "profile.jpg";

    return api.sendMessage(
      {
        body: msg,
        attachment: imageStream,
      },
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ Stalk Error:", err);
    return api.sendMessage(
      "⚠️ Couldn't fetch info. Try again later.",
      threadID,
      messageID
    );
  }
};

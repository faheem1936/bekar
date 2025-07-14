module.exports.config = {
  name: "fbdetails",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem King",
  description: "Get basic fake FB analytics of a user",
  commandCategory: "fun",
  usages: "[reply/tag]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, type, messageReply, mentions } = event;

  let targetID = null;
  let name = null;

  // Priority: reply > tag > self
  if (type === "message_reply" && messageReply.senderID) {
    targetID = messageReply.senderID;
    name = (await api.getUserInfo(targetID))[targetID]?.name || "User";
  } else if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    name = mentions[targetID];
  } else {
    targetID = senderID;
    name = (await api.getUserInfo(targetID))[targetID]?.name || "You";
  }

  const fakeStats = {
    posts: Math.floor(Math.random() * 500 + 100),
    comments: Math.floor(Math.random() * 2000 + 300),
    likes: Math.floor(Math.random() * 10000 + 500),
    shares: Math.floor(Math.random() * 500),
    friends: Math.floor(Math.random() * 4000 + 100),
    groups: Math.floor(Math.random() * 100 + 10),
  };

  const message = `📊 Facebook Analytics Report for ${name}:
  
  📝 Posts: ${fakeStats.posts}
  💬 Comments: ${fakeStats.comments}
  👍 Likes: ${fakeStats.likes}
  🔁 Shares: ${fakeStats.shares}
  👥 Friends: ${fakeStats.friends}
  👨‍👩‍👧‍👦 Groups Joined: ${fakeStats.groups}
  
  🧠 Data generated using ✨ *FB Analytics AI v1.0 (fake)*`;

  return api.sendMessage(message, threadID, messageID);
};

module.exports.config = {
    name: "block",
    version: "1.0.0",
    hasPermission: 2,
    credits: "Faheem Akhtar",
    description: "Block a user by UID"
  };
  
  module.exports.run = async ({ api, event, args }) => {
    if (!args[0]) return api.sendMessage("❌ Please provide a UID to block.", event.threadID);
    api.blockUser(args[0], (err) => {
      if (err) return api.sendMessage("❌ Failed to block user.", event.threadID);
      return api.sendMessage(`✅ Blocked user: ${args[0]}`, event.threadID);
    });
  };
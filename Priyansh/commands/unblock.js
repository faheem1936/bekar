module.exports.config = {
    name: "unblock",
    version: "1.0.0",
    hasPermission: 2,
    credits: "Faheem Akhtar",
    description: "Unblock a user by UID"
  };
  
  module.exports.run = async ({ api, event, args }) => {
    if (!args[0]) return api.sendMessage("❌ Please provide a UID to unblock.", event.threadID);
    api.unblockUser(args[0], (err) => {
      if (err) return api.sendMessage("❌ Failed to unblock user.", event.threadID);
      return api.sendMessage(`✅ Unblocked user: ${args[0]}`, event.threadID);
    });
  };
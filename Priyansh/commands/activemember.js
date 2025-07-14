module.exports.config = {
    name: "activemembers",
    version: "1.0.0",
    hasPermission: 1,
    credits: "Faheem Akhtar",
    description: "List top active users"
  };
  
  module.exports.run = async ({ api, event }) => {
    const stats = await api.getThreadInfo(event.threadID);
    const active = stats.userInfo
      .sort((a, b) => b.totalMessages - a.totalMessages)
      .slice(0, 10)
      .map(u => `👤 ${u.name}: ${u.totalMessages} msgs`);
    return api.sendMessage("🔥 Top Active Members:\n" + active.join("\n"), event.threadID);
  };
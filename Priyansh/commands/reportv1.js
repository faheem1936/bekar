module.exports.config = {
  name: "reportv1",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "credits",
  description: "RIP POSER/RP ACCOUNT",
  commandCategory: "report",
  usages: "reportv1 [uid]",
  cooldowns: 2,
};

const cook =
  "datr= j517ZPUQ8cMoOVVyVSgVQ11Z; fr= 0eHJeDKPfVlVBgeMz.AWXFc2WpEpRcqPUiXvjDxsWeZQ4.Bke52P.gx.AAA.0.0.Bke52P.AWXNGq2b5-Q; m_page_voice= 100090710767483; sb= j517ZOO0FfI7TJ8KQuOa1uog; xs= 17%3AOCoCViIR3P2PlQ%3A2%3A1685822864%3A-1%3A4303; c_user= 100090710767483";

const encodedCook = encodeURIComponent(cook).replace(
  /%(?![0-9a-fA-F]{2}|3[Bb])/g,
  "%25"
);

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  const response = args.join(" ");

  if (!args[0])
    return api.sendMessage("Prefix: reportv1 [uid]", threadID, messageID);

  try {
    api.sendMessage(
      `❤️‍🔥LET THEM BURN ❤️‍🔥 ID:https://www.facebook.com/profile.php?id=${response}\n 
  Module by: Shiki Machina`,
      threadID,
      messageID
    );
    const res = await axios.get(
      `https://sunog-api-mahiro.harryjill.repl.co/sunog?id=${encodedCook}&id=${response}`
    );
    console.log(res); // Log the entire res object
    const respond = res.data.message;
    api.sendMessage(respond, threadID, messageID);
    api.sendMessage("Report has been successfully sent!", threadID, messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage(
      "An error occurred while fetching the API response.",
      threadID,
      messageID
    );
  }
};

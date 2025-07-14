module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ayan Hun Yar",
  description: "Tag admin",
  commandCategory: "tag admin",
  usages: "mention",
  cooldowns: 1,
};
module.exports.handleEvent = async function ({ api, event }) {
  var idad = ["100029722602303", ""];
  for (const id of idad) {
    if (!id) return;
    if (!idad) return;
    if (!event.body) return;
    if (Object.keys(event.mentions) == id) {
      var msg = [
        "MERY OWNER FAHEEM AKHTAR KO MENTION NAW KAR AI SAMJH NAE TU WOH MUJY MARY GA PLZ OSY MENTION NAE KRO",
        "𝗢𝘄𝗻𝗘𝗿 𝗞𝗼 𝗽𝗛𝗲𝗿 𝗦𝘆 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 𝗸𝗥 𝗿𝗲𝗛𝘆😒🤬",
        "𝗠𝘂𝗷𝗛𝘆 𝗕𝗼𝗹 𝗸𝗬𝗮 𝗕𝗮𝘁 𝗛𝗮𝗶 𝗢𝘄𝗻𝗲𝗿 𝗞𝗼 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 𝗠𝘁𝘁𝘁 𝗞𝗿😠😣",
        "MERA OWNER FAHEEM AKHTAR BUSY HA YWR",
      ];
      return api.sendMessage(
        { body: msg[Math.floor(Math.random() * msg.length)] },
        event.threadID,
        event.messageID
      );
    } else return;
  }
};
module.exports.run = async function ({ api, event }) {
  api.sendMessage(
    {
      boydy: `=== 『 𝐓𝐀𝐆 𝐀𝐃𝐌𝐈𝐍 』 ====
  \n━━━━━━━━━━━━━━━━━━\n→ Tự động chửi thằng chó tag admin bot 🥳`,
      attachment: (
        await global.nodemodule["axios"]({
          url: (
            await global.nodemodule["axios"](
              "https://Api-video-anime.tricoool.repl.co/trai"
            )
          ).data.url,
          method: "GET",
          responseType: "stream",
        })
      ).data,
    },
    event.threadID,
    event.messageID
  );
};

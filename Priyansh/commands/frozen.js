const API = "https://5xp7m4-8080.csb.app/api/textpro?number=10&text=";
module.exports.config = {
  name: "frozen",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  usePrefix: true,
  description: "frozen logo",
  commandCategory: "text maker",
  usages: "frozen<text>",
  cooldowns: 10,
};
module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const qs = require("querystring");
  tukhoa = args.join(" ");
  event.type == "message_reply"
    ? (tukhoa = event.messageReply.attachments[0].url)
    : (tukhoa = args.join(" "));
  const pathsave = __dirname + `/cache/banner.png`;
  let imageBuffer;
  api.sendMessage(
    "🌸 please wait some seconds🌸",
    event.threadID,
    event.messageID
  );
  axios
    .get(`${API}${encodeURI(tukhoa)}`, { responseType: "arraybuffer" })
    .then((data) => {
      const imageBuffer = data.data;
      fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
      api.sendMessage(
        { body: `🌸YOUR'S LOGO🌸`, attachment: fs.createReadStream(pathsave) },
        event.threadID,
        () => fs.unlinkSync(pathsave),
        event.messageID
      );
    })
    .catch((error) => {
      let err;
      if (error.response) err = JSON.parse(error.response.data.toString());
      else err = error;
      return api.sendMessage(
        `Đã xảy ra lỗi ${err.error} ${err.message}`,
        event.threadID,
        event.messageID
      );
    });
};

module.exports.config = {
  name: "newyear2",
  version: "31.7.2",
  hasPermssion: 0,
  credits: "THE_FAHEEM",
  description: "New Year",
  commandCategory: "Ephoto",
  usages: "[text ]",
  cooldowns: 10,
};
module.exports.run = ({
  event: _0x516303,
  api: _0x52bc4a,
  args: _0x15c3ee,
}) => {
  const _0x36f138 = require("fs");
  const _0x465ce8 = global.nodemodule.request;
  const { join: _0x26821 } = global.nodemodule.path;
  let faheem = _0x15c3ee.join(" ");
  if (!faheem) {
    return _0x52bc4a.sendMessage(
      "Please add a text!!",
      _0x516303.threadID,
      _0x516303.messageID
    );
  }
  const { Maker: _0x15845c } = require("imagemaker.js");
  new _0x15845c()
    .Ephoto360(
      "https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html",
      ["" + faheem]
    )
    .then(async (_0x7eae6e) => {
      try {
        var _0x4053b9 = () =>
          _0x52bc4a.sendMessage(
            {
              body: "Your Avatar Here",
              attachment: _0x36f138.createReadStream(
                __dirname + "/cache/banner.png"
              ),
            },
            _0x516303.threadID,
            () => _0x36f138.unlinkSync(__dirname + "/cache/banner.png"),
            _0x516303.messageID
          );
        return _0x465ce8(encodeURI(_0x7eae6e.imageUrl))
          .pipe(_0x36f138.createWriteStream(__dirname + "/cache/banner.png"))
          .on("close", () => _0x4053b9());
      } catch (_0x94a4c8) {
        console.log(_0x94a4c8);
      }
    });
};

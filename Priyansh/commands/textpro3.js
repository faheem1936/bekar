module.exports.config = {
  name: "brokenglass",
  version: "31.7.2",
  hasPermssion: 0,
  credits: "John Lester",
  description: "broken glass text effect",
  commandCategory: "textmaker",
  usages: "[text]",
  cooldowns: 10,
};
module.exports.run = ({
  event: _0x40c382,
  api: _0x48b015,
  args: _0x5b2bd8,
}) => {
  const _0x1d2f32 = require("fs"),
    _0x132c73 = global.nodemodule.request,
    { join: _0x4d207e } = global.nodemodule.path,
    _0x288d87 = _0x5b2bd8.join(" ");
  if (!_0x288d87) {
    return _0x48b015.sendMessage(
      "Please add a text!!",
      _0x40c382.threadID,
      _0x40c382.messageID
    );
  }
  const _0x55b5dc = require("w5-textmaker");
  _0x55b5dc
    .textpro(
      "https://textpro.me/broken-glass-text-effect-free-online-1023.html",
      "" + _0x288d87
    )
    .then(async (_0x4c8b7f) => {
      try {
        var _0xb75e64 = () =>
          _0x48b015.sendMessage(
            {
              body: "",
              attachment: _0x1d2f32.createReadStream(
                __dirname +
                  ("/cache/" +
                    _0x40c382.threadID +
                    "-" +
                    _0x40c382.senderID +
                    ".png")
              ),
            },
            _0x40c382.threadID,
            () =>
              _0x1d2f32.unlinkSync(
                __dirname +
                  ("/cache/" +
                    _0x40c382.threadID +
                    "-" +
                    _0x40c382.senderID +
                    ".png")
              ),
            _0x40c382.messageID
          );
        return _0x132c73(encodeURI(_0x4c8b7f))
          .pipe(
            _0x1d2f32.createWriteStream(
              __dirname +
                ("/cache/" +
                  _0x40c382.threadID +
                  "-" +
                  _0x40c382.senderID +
                  ".png")
            )
          )
          .on("close", () => _0xb75e64());
      } catch (_0x4b0e5a) {
        console.log(_0x4b0e5a);
      }
    });
};

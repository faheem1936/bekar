module.exports.config = {
  name: 'sendnoti4',
  version: '1.0.2',
  hasPermssion: 2,
  credits:
    '\uD835\uDE4B\uD835\uDE67\uD835\uDE5E\uD835\uDE6E\uD835\uDE56\uD835\uDE63\uD835\uDE68\uD835\uDE5D \uD835\uDE4D\uD835\uDE56\uD835\uDE5F\uD835\uDE65\uD835\uDE6A\uD835\uDE69',
  description:
    'Send messages to groups (reply to photos/videos to be attached)!\nBetter version of sendnotiUwU',
  commandCategory: 'system',
  usages: '[Text]',
  cooldowns: 5,
}
module.exports.languages = {
  vi: {
    sendSuccess: 'Đã gửi tin nhắn đến %1 nhóm!',
    sendFail: '[!] Không thể gửi thông báo tới %1 nhóm',
  },
  en: {
    sendSuccess: 'Sent message to %1 thread!',
    sendFail: "[!] Can't send message to %1 thread",
  },
}
module.exports.run = async ({ api, event, args, getText }) => {
  if (event.type == 'message_reply') {
    const request = global.nodemodule.request
    const fs = require('fs')
    const axios = require('axios')
    var path = __dirname + `/cache/snoti.png`
    var path = __dirname + `/cache/snoti.mp3`
    var path = __dirname + `/cache/snoti.jpeg`
    var path = __dirname + `/cache/snoti.jpg`
    var abc = event.messageReply.attachments[0].url
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' }))
      .data
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
    var allThread = global.data.allThreadID || []
    var count = 1,
      cantSend = []
    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) {
        ;('')
      } else {
        api.sendMessage(
          {
            body:
              ' \xBB\u2726\uD835\uDDD4\uD835\uDDE1\uD835\uDDE1\uD835\uDDE2\uD835\uDDE8\uD835\uDDD6\uD835\uDDD8\uD835\uDDE0\uD835\uDDD8\uD835\uDDE1\uD835\uDDE7 \uD835\uDDD9\uD835\uDDE5\uD835\uDDE2\uD835\uDDE0 \uD835\uDDE2\uD835\uDDEA\uD835\uDDE1\uD835\uDDD8\uD835\uDDE5 \uD835\uDC0F\uD835\uDC11\uD835\uDC08\uD835\uDC18\uD835\uDC00\uD835\uDC0D\uD835\uDC12\uD835\uDC07\u2726\xAB\n\n' +
              args.join(` `),
            attachment: fs.createReadStream(path),
          },
          idThread,
          (error, info) => {
            if (error) {
              cantSend.push(idThread)
            }
          }
        )
        count++
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
    return api.sendMessage(
      getText('sendSuccess', count),
      event.threadID,
      () =>
        cantSend.length > 0
          ? api.sendMessage(
              getText('sendFail', cantSend.length),
              event.threadID,
              event.messageID
            )
          : '',
      event.messageID
    )
  } else {
    var allThread = global.data.allThreadID || []
    var count = 1,
      cantSend = []
    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) {
        ;('')
      } else {
        api.sendMessage(
          '\xBBAnnouncement from the Admin Faheem Akhtar!\xAB\n\n' + args.join(` `),
          idThread,
          (error, info) => {
            if (error) {
              cantSend.push(idThread)
            }
          }
        )
        count++
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
    return api.sendMessage(
      getText('sendSuccess', count),
      event.threadID,
      () =>
        cantSend.length > 0
          ? api.sendMessage(
              getText('sendFail', cantSend.length),
              event.threadID,
              event.messageID
            )
          : '',
      event.messageID
    )
  }
}

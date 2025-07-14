/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "lovevideo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  description: "Love VEDIO",
  commandCategory: "Random",
  usages: "lovevdo",
  cooldowns: 5,
  dependencies: {
    request: "",
    "fs-extra": "",
    axios: "",
  },
};

module.exports.run = async ({
  api,
  event,
  args,
  client,
  Users,
  Threads,
  __GLOBAL,
  Currencies,
}) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  var hi = ["🥀𝑉𝐼𝐷𝐸𝑂🥀𝑀𝐴𝐷𝐸 𝐵𝑌'\n\n:☞ FAHEEM ☜🥀-❤️"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
    "https://drive.google.com/uc?id=1Z-6qll7ACq8Ka1pKpnC3guGcXU0gNvoL",
    "https://drive.google.com/uc?id=1YHm_oC7xItLokbt_MCWu-VdMGavvx-G4",
    "https://drive.google.com/uc?id=1YvDanPpMZKK4s547h9Bsf0uL719AvVEG",
    "https://drive.google.com/uc?id=1YemK-RQH3gUX_I9ThgNJLC89yPF-VtEY",
    "https://drive.google.com/uc?id=1YN25UGQQCpZvN29Y5a84ZCYlL-rc_JL_",
    "https://drive.google.com/uc?id=1YXbox7CyKc6Gu-56WAtAPlxSTs51Yo9n",
    "https://drive.google.com/uc?id=1YNVe1cEM0JM3lj7sU49tuJn4-8ASYVd8",
    "https://drive.google.com/uc?id=1ZDjeuPfIyUkovgmJCRsE7vE67aOe0Sp2",
    "https://drive.google.com/uc?id=1YcJciCtidcUxRGihUyx2uDgDg3cBYUE5",
    "https://drive.google.com/uc?id=1ZIE6xPwXg6_oxG0K7xCWKS04MNyag3QL",
    "https://drive.google.com/uc?id=1ZF9cOD_fj26rpWDf6WOjUQNz8QuRJhkv",
    "https://drive.google.com/uc?id=1ZAXQwA5BsnN555FrWii2bb-kdLaoMxLP",
    "https://drive.google.com/uc?id=1YvWRk-wQ_I8kuJzOuw2Mx7Q-Rrgbw6CT",
    "https://drive.google.com/uc?id=1Z8vKgEBUkKbwgMPvv_6K_lvVsrBca_X8",
    "https://drive.google.com/uc?id=1ZG-BJq7pP4oh93U6tHIKuYvZ8XiidlCV",
    "https://drive.google.com/uc?id=14N7XK2w7gFwH8jVzMDXuYglGQADg5_LH",
    "https://drive.google.com/uc?id=14ULbJi01IOOo8J9AXeqEGb0BO2tcZPA4",
    "https://drive.google.com/uc?id=14TKwU_U0CjtoOopk5d7BXyIKkxQmlFCL",
    "https://drive.google.com/uc?id=14cLvx_ELlMfXvMiDLdEW7t5IQpKgRBwy",
    "https://drive.google.com/uc?id=14fQIdoJlcGBU1pOZ5EA7c4NvjDNl3Gor",
    "https://drive.google.com/uc?id=14fk6oUTVfyBOIzGUQiMWkoQwV6_QERU8",
    "https://drive.google.com/file/d/1-pxMFSNPvbZfsH-_tARECP4QH_ChUYrB/view?usp=drivesdk",
    "https://drive.google.com/file/d/1-O0C_p3Zmkn3gO7HqeZMt2PSZteqhpDb/view?usp=drivesdk",
  ];
  var callback = () =>
    api.sendMessage(
      {
        body: `「 ${know} 」`,
        attachment: fs.createReadStream(__dirname + "/cache/15.mp4"),
      },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/15.mp4")
    );
  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/15.mp4"))
    .on("close", () => callback());
};

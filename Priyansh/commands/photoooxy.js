const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const cheerio = require("cheerio");

module.exports.config = {
  name: "photooxy",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem Akhtar & GPT",
  description: "Generate logo using photooxy.com with custom text",
  commandCategory: "logo",
  usages: "photooxy [url] | [text1] | (optional text2)",
  cooldowns: 5,
};

async function generatePhotoOxy(url, texts = []) {
  const getForm = await axios.get(url);
  const $ = cheerio.load(getForm.data);

  const form = new FormData();
  const token = $('input[name="token"]').val();

  form.append("token", token);
  texts.forEach((t, i) => {
    form.append(`text[${i}]`, t.trim());
  });

  const action = $("form").attr("action");
  const fullURL = "https://photooxy.com" + action;

  const res = await axios.post(fullURL, form, {
    headers: form.getHeaders(),
  });

  const $$ = cheerio.load(res.data);
  const image = $$("div.thumbnail > img").attr("src");

  if (!image) throw new Error("❌ Image not found, maybe input is invalid.");

  return "https://photooxy.com" + image;
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  if (!args[0])
    return api.sendMessage(
      "❗ Usage: photooxy [url] | text1 | (text2)",
      threadID,
      messageID
    );

  try {
    const input = args
      .join(" ")
      .split("|")
      .map((i) => i.trim());
    const url = input[0];
    const texts = input.slice(1);

    api.sendMessage("⏳ Generating image, please wait...", threadID, messageID);

    const imageURL = await generatePhotoOxy(url, texts);
    const res = await axios.get(imageURL, { responseType: "stream" });

    const filePath = path.join(
      __dirname,
      "cache",
      `photooxy_${Date.now()}.jpg`
    );
    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: `✅ Here is your logo:\n${texts.join(" | ")}`,
          attachment: fs.createReadStream(filePath),
        },
        threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (err) {
    console.error("❌ Photooxy Error:", err);
    return api.sendMessage(
      "❌ Failed to generate image. Please check the URL and your text input format.",
      threadID,
      messageID
    );
  }
};

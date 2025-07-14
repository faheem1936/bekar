const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "photooxy",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem + ChatGPT",
  description: "Generate logo using PhotoOxy.com (Puppeteer-based)",
  commandCategory: "image",
  usages: "photooxy <effect> | <text>",
  cooldowns: 5,
};

const effectLinks = {
  smoke:
    "https://photooxy.com/logo-and-text-effects/realistic-smoke-effect-343.html",
  neon: "https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-text-effect-343.html",
  shadow:
    "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
  burn: "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html",
  gold: "https://photooxy.com/other-design/create-golden-text-effect-370.html",
};

module.exports.run = async function ({ api, event, args }) {
  const input = args
    .join(" ")
    .split("|")
    .map((i) => i.trim());
  const effect = input[0]?.toLowerCase();
  const text = input[1];

  if (!effect || !text)
    return api.sendMessage(
      "❌ Usage: photooxy <effect> | <text>",
      event.threadID,
      event.messageID
    );

  const url = effectLinks[effect];
  if (!url)
    return api.sendMessage(
      `❌ Invalid effect.\nAvailable: ${Object.keys(effectLinks).join(", ")}`,
      event.threadID,
      event.messageID
    );

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.type("input[name='text_1']", text);
    await Promise.all([
      page.click("button[type='submit']"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    const imageUrl = await page.$eval(".thumbnail > img", (img) => img.src);
    const viewSource = await page.goto(imageUrl);
    const filePath = path.join(__dirname, `photooxy_${Date.now()}.png`);
    fs.writeFileSync(filePath, await viewSource.buffer());

    await browser.close();

    return api.sendMessage(
      {
        body: `✨ PhotoOxy Logo: ${effect}`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (err) {
    await browser.close();
    console.error("❌ Puppeteer error:", err);
    return api.sendMessage(
      "⚠️ Failed to generate image. Try again later.",
      event.threadID,
      event.messageID
    );
  }
};

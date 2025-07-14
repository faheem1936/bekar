const axios = require("axios");

module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermission: 2,
  credits: "shiki",
  description: "Temporary Mail Command",
  commandCategory: "Mail",
  usages: "tempmail used callad to ask admin how to used it ",
  cooldowns: "5 minutes", // Example: specify the unit of time
};

module.exports.run = async function ({ api, event, args }) {
  const command = args[0];

  if (command === "genmail") {
    await genmail(event, api);
  } else if (command === "checkmail") {
    await checkmail(event, api);
  }
};

async function genmail({ body, threadID }, api) {
  const tag = body.split(" ")[1];
  const email = `d8h98.${tag}@inbox.testmail.app`;
  await api.sendMessage(`📧 Your unique email address is: ${email}`, threadID);
}

async function checkmail({ threadID }, api) {
  const APIKEY = "e2298007-6128-46be-a787-088262816000";
  const NAMESPACE = "d8h98";
  const apiUrl = `https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true`;

  try {
    const response = await axios.get(apiUrl);
    const emails = response.data.emails.filter(
      (email) => Date.now() - email.timestamp <= 2 * 60 * 60 * 1000
    );
    const count = emails.length;
    let message = `✉️ You have ${count} emails:`;

    emails.forEach((email) => {
      const subject = email.subject;
      const from = email.from;
      const date = new Date(email.timestamp).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
      });
      const text = email.text || email.html;
      const to = email.to;
      const id = email.id;
      const downloadUrl = email.downloadUrl;
      const attachments = email.attachments;
      let attachmentMsg = "";

      if (attachments && attachments.length > 0) {
        attachmentMsg += "\n📁 Attachment:";
        attachments.forEach((attachment) => {
          attachmentMsg += `\n📁 Filename: ${attachment.filename}\n📂 Type: ${attachment.contentType}\n🗂️ Filesize: ${attachment.size}\n⬇️ Download Url: ${attachment.downloadUrl}`;
        });
      }

      message += `\n📬 From: ${from}\n✉️ To: ${to}\n📅 Date: ${date}\n📧 Subject: ${subject}\n📜 Message:\n${text}${attachmentMsg}`;
    });

    await api.sendMessage(message, threadID);
  } catch (error) {
    console.error(error);
    throw new Error("❌ Failed to retrieve emails"); // Throw an error for better error handling
  }
}

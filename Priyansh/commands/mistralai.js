const axios = require("axios");

module.exports.config = {
  name: "mistral",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Faheem Akhtar",
  description: "AI powered by Mistral AI",
  commandCategory: "AI",
  usages: "mistral [question]",
  cooldowns: 5,
  dependencies: {
    axios: "",
  },
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const message = args.join(" ");

  if (message.length < 1) {
    return api.sendMessage(
      "⚠️ Invalid Use Of Command!\n💡 Usage: mistral [ask anything]",
      threadID,
      messageID
    );
  }

  try {
    // Using official Mistral API
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-medium", // Free tier model
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 2000000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${
            process.env.MISTRAL_API_KEY || "RQUwczwlRx5sTMkRwkGjyBlbxJ1NA7Dz"
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    let reply = "";
    if (response.data && response.data.choices && response.data.choices[0]) {
      reply = response.data.choices[0].message.content.trim();
    } else {
      reply = "Sorry, I couldn't generate a response. Please try again.";
    }

    // Clean up the response
    if (reply.length > 2000) {
      reply = reply.substring(0, 2000) + "...";
    }

    return api.sendMessage(`🤖 Mistral AI:\n\n${reply}`, threadID, messageID);
  } catch (error) {
    console.error("Mistral AI Error:", error);

    let errorMessage = "❌ An error occurred while processing your request.";

    if (error.response) {
      if (error.response.status === 401) {
        errorMessage =
          "❌ API key is required. Please set MISTRAL_API_KEY in secrets.";
      } else if (error.response.status === 429) {
        errorMessage = "❌ Rate limit exceeded. Please try again later.";
      } else if (error.response.status === 402) {
        errorMessage =
          "❌ Quota exceeded. Please check your Mistral AI billing.";
      } else {
        errorMessage = `❌ API Error: ${error.response.status}`;
      }
    } else if (error.message) {
      errorMessage = `❌ Error: ${error.message}`;
    }

    return api.sendMessage(errorMessage, threadID, messageID);
  }
};

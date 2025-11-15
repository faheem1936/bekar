const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ephoto",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "THE_FAHEEM",
  usePrefix: true,
  description: "Make your own logo using ephoto",
  commandCategory: "logo",
  usages: "ephoto list <page> | ephoto <logo> <text>",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  const { messageID, threadID } = event;

  // Handle list command
  if (args[0] && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]) || 1;
    const pages = {
      1: "1. television\n2. glass\n3. blackpink\n4. neonblacpink\n5. coverpubg\n6. greenbrush\n7. blueneon\n8. eraser\n9. dragonfire\n10. bulb\n11. typography\n12. leaves\n13. cloth\n14. graffiti\n15. star\n16. typography2\n17. nightstars\n18. cloud\n19. papercut\n20. horror\n21. sunlight\n22. pig\n23. Halloween\n24. leafgrafy\n25. water\n26. animate\n27. puppy\n28. foggy\n29. flag\n30. arrow",
      2: "31. arrow2\n32. hacker\n33. avatar\n34. moblegend\n35. warface\n36. foggy2\n37. gammergirl\n38. teamlogo\n39. beach\n40. neonstyle\n41. gaminglogo\n42. game\n43. vibrant\n44. blueneon\n45. steelmetal\n46. mascot\n47. luxurylogo\n48. star\n50. minimal\n51. galaxy\n52. goldavatar\n53. team2\n54. shield\n55. angel\n56. queen\n57. gaminglogo2\n58. zodiac\n59. steel2\n60. pubg2\n61. pubg3",
      3: "62. fbcover\n63. fbcover2\n64. fbcover3\n65. fbcover4\n66. fbcover5\n67. fbcover6\n68. fbcover7\n69. fbcover8\n70. tattoo\n71. moblegend2\n72. neonstyle2\n73. arena\n74. lovecard\n75. lovecard2\n76. lovecard3\n77. heartwing\n78. cake\n79. cake2\n80. cake3\n81. cake4\n82. cake5\n83. cake6\n84. cake7\n85. cup\n86. flaming\n87. blood\n88. blood2\n89. crossfire\n90. freefire\n91. overwatch\n92. lolavata\n93. dota\n94. exposure"
    };
    return api.sendMessage(`Logo list - Page ${page}:\n${pages[page] || "Invalid page!"}`, threadID, messageID);
  }

  // Handle logo creation
  if (args.length < 2) {
    return api.sendMessage("Usage: ephoto <logo> <text>", threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let text = args.slice(1).join(" ");
  let filePath = path.join(__dirname, `cache/${type}_${Date.now()}.png`);

  const logos = [
    "television","glass","blackpink","neonblacpink","coverpubg","greenbrush","blueneon",
    "eraser","dragonfire","bulb","typography","leaves","cloth","graffiti","star","typography2",
    "nightstars","cloud","papercut","horror","sunlight","pig","halloween","leafgrafy","water",
    "animate","puppy","foggy","flag","arrow","arrow2","hacker","avatar","moblegend","warface",
    "foggy2","gammergirl","teamlogo","beach","neonstyle","gaminglogo","game","vibrant","steelmetal",
    "mascot","luxurylogo","minimal","galaxy","goldavatar","team2","shield","angel","queen",
    "gaminglogo2","zodiac","steel2","pubg2","pubg3","fbcover","fbcover2","fbcover3","fbcover4",
    "fbcover5","fbcover6","fbcover7","fbcover8","tattoo","moblegend2","neonstyle2","arena","lovecard",
    "lovecard2","lovecard3","heartwing","cake","cake2","cake3","cake4","cake5","cake6","cake7","cup",
    "flaming","blood","blood2","crossfire","freefire","overwatch","lolavata","dota","exposure"
  ];

  if (!logos.includes(type)) {
    return api.sendMessage(`Invalid logo type! Use "ephoto list" to see available logos.`, threadID, messageID);
  }

  const url = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/ephoto/${type}?text=${encodeURIComponent(text)}`;

  try {
    const response = await axios({ url, responseType: "arraybuffer" });
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, response.data);

    await api.sendMessage(
      { body: `Here's your logo [${type.toUpperCase()}]:`, attachment: fs.createReadStream(filePath) },
      threadID,
      () => fs.removeSync(filePath),
      messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage("Failed to generate logo. Please try again later.", threadID, messageID);
  }
};

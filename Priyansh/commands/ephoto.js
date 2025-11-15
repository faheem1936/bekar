const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ephoto",
  version: "11.0.0",
  hasPermssion: 0,
  credits: "THE__FAHEEM",
  usePrefix: true,
  description: "Make your own logo using ephoto",
  commandCategory: "logo",
  usages: "ephoto list or ephoto (logo) (text)",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  const { messageID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `Logo list - Page 1:\n1. television\n2. glass\n3. blackpink\n4. neonblacpink\n5. coverpubg\n6. greenbrush\n7. blueneon\n8. eraser\n9. dragonfire\n10. bulb\n11. typography\n12. leaves\n13. cloth\n14. graffiti\n15. star\n16. typography2\n17. nightstars\n18. cloud\n19. papercut\n20. horror\n21. sunlight\n22. pig\n23. Halloween\n24. leafgrafy\n25. water\n26. animate\n27. puppy\n28. foggy\n29. flag\n30. arrow\n\nPage 1 of 3`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `Logo list - Page 2:\n31. arrow2\n32. hacker\n33. avatar\n34. moblegend\n35. warface\n36. foggy2\n37. gammergirl\n38. teamlogo\n39. beach\n40. neonstyle\n41. gaminglogo\n42. game\n43. vibrant\n44. blueneon\n45. steelmetal\n46. mascot\n47. luxurylogo\n48. star\n50. minimal\n51. galaxy\n52. goldavatar\n53. team2\n54. shield\n55. angel\n56. queen\n57. gaminglogo2\n58. zodiac\n59. steel2\n60. pubg2\n61. pubg3\n\nPage 2 of 3`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `Logo list - Page 3:\n62. fbcover\n63. fbcover2\n64. fbcover3\n65. fbcover4\n66. fbcover5\n67. fbcover6\n68. fbcover7\n69. fbcover8\n70. tattoo\n71. moblegend2\n72. neonstyle2\n73. arena\n74. lovecard\n75. lovecard2\n76. lovecard3\n77. heartwing\n78. cake\n79. cake2\n80. cake3\n81. cake4\n82. cake5\n83. cake6\n84. cake7\n85. cup\n86. flaming\n87. blood\n88. blood2\n89. crossfire\n90. freefire\n91. overwatch\n92. lolavata\n93. dota\n94. exposure\n\nPage 3 of 3`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(
          `Invalid page number! Please use "list 1", "list 2", or "list 3".`,
          threadID,
          messageID
        );
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `Invalid command format! Use: ephoto list or ephoto (logo) (text)`,
      threadID,
      messageID
    );
  }

  let type = args[0].toLowerCase();
  let text = args.slice(1).join(" ");
  let filePath = path.join(__dirname, `cache/${type}_${text}.png`);

  // Map of logos and their API endpoints
  const logos = {
    television: "television",
    glass: "glasses",
    blackpink: "blackpink",
    neonblacpink: "neonbp",
    coverpubg: "coverpubg",
    greenbrush: "greenbrush",
    blueneon: "neonblue",
    eraser: "eraser",
    dragonfire: "dragonfire",
    bulb: "incandescent",
    typography: "typography",
    leaves: "letters",
    cloth: "cloth",
    graffiti: "graffiti",
    star: "metals",
    typography2: "typography2",
    nightstars: "nightstars",
    cloud: "cloud",
    papercut: "caper",
    horror: "horror",
    sunlight: "sunlight",
    pig: "pig",
    halloween: "hallowen",
    leafgrafy: "leafgraphy",
    water: "water",
    animate: "crank",
    puppy: "puppy",
    foggy: "foggy",
    flag: "american",
    arrow: "arrow",
    arrow2: "arrow2",
    hacker: "anonymous",
    avatar: "aov",
    moblegend: "ml",
    warface: "warface",
    foggy2: "window",
    gammergirl: "gamergirl",
    teamlogo: "teamlogo",
    beach: "beach",
    neonstyle: "neonstyle",
    gaminglogo: "gaminglogo",
    game: "fpsgame",
    vibrant: "vibrant",
    steelmetal: "steelmetal",
    mascot: "circlemascot",
    luxurylogo: "luxuarylogo",
    minimal: "minimal",
    galaxy: "galaxy",
    goldavatar: "goldavatar",
    team2: "team2",
    shield: "sheild",
    angel: "angel2",
    queen: "queen",
    gaminglogo2: "gaminglogo2",
    zodiac: "zodiac",
    steel2: "steel2",
    pubg2: "pubg2",
    pubg3: "pubg3",
    fbcover: "facebookcover4",
    fbcover2: "facebookcover5",
    fbcover3: "facebookcover6",
    fbcover4: "facebookcover7",
    fbcover5: "facebookcover8",
    fbcover6: "facebookcover9",
    fbcover7: "facebookcover11",
    fbcover8: "facebookcover12",
    tattoo: "tatto",
    moblegend2: "ml2",
    neonstyle2: "neonstyle2",
    arena: "arena",
    lovecard: "lovecard",
    lovecard2: "lovecard2",
    lovecard3: "lovecard3",
    heartwing: "heartwing",
    cake: "cake",
    cake2: "cake2",
    cake3: "cake3",
    cake4: "cake4",
    cake5: "cake5",
    cake6: "cake6",
    cake7: "cake7",
    cup: "cup",
    flaming: "flaming",
    blood: "blood",
    blood2: "blood2",
    crossfire: "crossfire",
    freefire: "freefire",
    overwatch: "overwatch",
    lolavata: "lolavata",
    dota: "dota",
    exposure: "exposure"
  };

  if (!logos[type]) {
    return api.sendMessage(
      `Invalid logo type! Use "ephoto list" to see available logos.`,
      threadID,
      messageID
    );
  }

  const url = `https://new--faheem-logo-api--89q4vtp4hz4m.code.run/api/ephoto/${logos[type]}?text=${encodeURIComponent(text)}`;

  try {
    const response = await axios({
      url,
      responseType: "arraybuffer"
    });

    await fs.outputFile(filePath, response.data);
    await api.sendMessage(
      {
        body: `Here's your [${type.toUpperCase()}] logo:`,
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => fs.removeSync(filePath),
      messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(
      `Failed to generate logo. Please try again later.`,
      threadID,
      messageID
    );
  }
};

const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "textpro",
  version: "11.0.0",
  hasPermssion: 0,
  credits: `THE_FAHEEM`,
  usePrefix: true,
  description: "Make your own logo using textpro",
  commandCategory: "logo",
  usages: "textpro list or textpro list (page number) or textpro (logo) (text)",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `here's the logo list - Page 1:\n1. glowing\n2. giraffe\n3. glass\n4. business\n5. orange\n6. comic\n7. slime\n8. holloween2\n9. frozen\n10. thunder\n11. neonlight2\n12. neon3\n13. neon4\n14. heartneon\n15. transformer\n16. goldentext\n17. whitegold\n18. luxury\n19. glossy\n20. sky\n21. brokenglass\n22. wetglass\n23. luxurygold\n24. horrorgift\n25. wood2\n26. blood\n27. jokerlogo\n28. glue\n29. toxic\n30. dropwater\n\nPAGE 1 - 3`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `Logo list - Page 2:\n31. 3dstone\n32. rock\n33. glossycarbon\n34. decorate\n35. skeleton\n36. metaldark\n37. dulexsilver\n38. biscuit\n39. icecold\n40. wintercold\n41. snow\n42. snow2\n43. wicker\n44. decorativeglass\n45. febric\n46. blueglass\n47. ballon\n48. double\n50. beach\n51. artpaper\n52. captain\n53. captain2\n54. demin\n55. leaves\n56. fluidpaint\n57. demin\n58. steel\n59. 3dmetal\n60. 3dmetal2\n61. metalpurple\n\nPAGE 2 - 3`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `Logo list - Page 3:\n62. goldglitter\n63. thor\n64. metalic\n65. hotmetal\n66. glossymetal\n67. metalgold\n68. metalpaint\n69. hologram\n70. 3dcrystal\n71. grung\n72. multicolor\n73. pinksoft\n74. 3dliquid\n75. burger\n76. cage\n77. knitted\n78. 3dmetal2\n79. party\n80. 3dchristmas\n81. newyear\n82. purpleglass\n83. ballon2\n84. ballon3\n85. cobble\n86. greenhorror\n87. holloweenfire\n88. batman\n89. skeleton2\n90. 1917\n91. lion\n92. purple2\n93. videogame\n94. embossed\n95. spooky\n96. lava\n97. water\n98. artistic\n99. party2\n100. newyear2\n101. newyear3\n102. newyear4\n103. lightglow\n104. grafity2`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(
          `Invalid page number! Please use "list 1" or "list 2" or "list 3 in the total of list there are 100 textpro logo for now.".`,
          threadID,
          messageID
        );
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `Invalid command format! Use: textpro list or textpro list (page number) or textpro (logo) (text)`,
      threadID,
      messageID
    );
  }

  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
    case "glowing":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=2&text=${name}`;
      message = "here's the [GLOWING] Logo created:";
      break;
    case "giraffe":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=3&text=${name}`;
      message = "here's the [ GIRAFFE ] Logo created:";
      break;
    case "glass":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=4&text=${name}`;
      message = "here's the [ GLASS ] Logo created:";
      break;
    case "business":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=5&text=${name}`;
      message = "here's the [BUSINESS] Logo Created:";
      break;
    case "orange":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=6&text=${name}`;
      message = "here's the [ ORANGE ] - Logo Created:";
      break;
    case "comic":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=7&text=${name}`;
      message = "here's the [ COMIC ] Logo Created:";
      break;
    case "slime":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=8&text=${name}`;
      message = "here's the [ SLIME ] Logo created:";
      break;
    case "halloween2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=9&text=${name}`;
      message = "here's the [ HALLOWEEN ] Logo created:";
      break;
    case "frozen":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=10&text=${name}`;
      message = "here's the [ FROZEN ] Logo created:";
      break;
    case "thunder":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=11&text=${name}`;
      message = "here's the [ THUNDER ] Logo created:";
      break;
    case "neonlight2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=12&text=${name}`;
      message = "here's the [ NEONLIGHT 2 ] Logo created:";
      break;
    case "neon3":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=13&text=${name}`;
      message = "here's the [ NEON3 ] Logo created:";
      break;
    case "neon4":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=14&text=${name}`;
      message = "here's the [ NEON4 ] Logo created:";
      break;
    case "heartneon":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=15&text=${name}`;
      message = "here's the [ HEARTNEON ] Logo created:";
      break;
    case "transformer":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=16&text=${name}`;
      message = "here's the [ TRANSFORMER ] Logo created:";
      break;
    case "goldentext":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=17&text=${name}`;
      message = "here's the [ GOLDEN TEXT ] Logo created:";
      break;
    case "whitegold":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=18&text=${name}`;
      message = "here's the [ WHITE GOLD ] Logo created:";
      break;
    case "luxury":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=19&text=${name}`;
      message = "here's the [ LUXURY ] Logo created:";
      break;
    case "glossy":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=20&text=${name}`;
      message = "here's the [ GLOSSY ] Logo created:";
      break;
    case "sky":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=21&text=${name}`;
      message = "here's the [ SKY ] Logo created:";
      break;
    case "brokenglass":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=22&text=${name}`;
      message = "here's the [ BROKENGLASS ] Logo created:";
      break;
    case "luxurygold":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=24&text=${name}`;
      message = "here's the [ LUXURY GOLD ] Logo created:";
      break;
    case "horrorgift":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=25&text=${name}`;
      message = "here's the [ HORROR GIFT ] Logo created:";
      break;
    case "wood":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=26&text=${name}`;
      message = "here's the [ WOOD ] Logo created:";
      break;
    case "blood":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=27&text=${name}`;
      message = "here's the [ BLOOD ] Logo created:";
      break;
    case "jokerlogo":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=29&text=${name}`;
      message = "here's the [ JOKERLOGO ] Logo created:";
      break;
    case "glue":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=30&text=${name}`;
      message = "here's the [ GLUE ] Logo created:";
      break;
    case "toxic":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=31&text=${name}`;
      message = "here's the [ TOXIC ] Logo created:";
      break;
    case "dropwater":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=32&text=${name}`;
      message = "here's the [ DROPWATER ] Logo created:";
      break;
    case "stone":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=33&text=${name}`;
      message = "here's the [ STONE ] Logo created:";
      break;
    case "rock":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=34&text=${name}`;
      message = "here's the [ ROCK ] Logo created:";
      break;
    case "glossycarbon":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=35&text=${name}`;
      message = "here's the [ GLOSSY CARBON ] Logo created:";
      break;
    case "decorate":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=36&text=${name}`;
      message = "here's the [ DECORATE ] Logo created:";
      break;
    case "skeleton":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=38&text=${name}`;
      message = "here's the [ SKELETON ] Logo created:";
      break;
    case "metaldark":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=40&text=${name}`;
      message = "here's the [ METALDARK ] Logo created:";
      break;
    case "dulexsilver":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=39&text=${name}`;
      message = "here's the [ BLOOD ] Logo created:";
      break;
    case "biscuit":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=41&text=${name}`;
      message = "here's the [ BISCUIT ] Logo created:";
      break;
    case "icecold":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=44&text=${name}`;
      message = "here's the [ ICECOLD ] Logo created:";
      break;
    case "wintercold":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=45&text=${name}`;
      message = "here's the [ WINTER COLD ] Logo created:";
      break;
    case "snow":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=46&text=${name}`;
      message = "here's the [ SNOW ] Logo created:";
      break;
    case "snow2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=48&text=${name}`;
      message = "here's the [ SNOW2 ] Logo created:";
      break;
    case "wicker":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=49&text=${name}`;
      message = "here's the [ WICKER ] Logo created:";
      break;
    case "decorativeglass":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=50&text=${name}`;
      message = "here's the [ DECORATIVE GLASS ] Logo created:";
      break;
    case "febric":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=51&text=${name}`;
      message = "here's the [ FEBRIC ] Logo created:";
      break;
    case "blueglass":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=52&text=${name}`;
      message = "here's the [ BLUEGLASS ] Logo created:";
      break;
    case "ballon":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=53&text=${name}`;
      message = "here's the [ BALLON ] Logo created:";
      break;
    case "double":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=54&text=${name}`;
      message = "here's the [ DOUBLE ] Logo created:";
      break;
    case "beach":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=55&text=${name}`;
      message = "here's the [ BEACH ] Logo created:";
      break;
    case "artpaper":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=56&text=${name}`;
      message = "here's the [ ARTPAPER ] Logo created:";
      break;
    case "captain":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=57&text=${name}`;
      message = "here's the [ CAPTAIN ] Logo created:";
      break;
    case "captain2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=58&text=${name}`;
      message = "here's the [ CAPTAIN 2 ] Logo created:";
      break;
    case "demin":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=59&text=${name}`;
      message = "here's the [ DEMIN ] Logo created:";
      break;
    case "leaves":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=60&text=${name}`;
      message = "here's the [ LEAVES ] Logo created:";
      break;
    case "fluidpaint":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=61&text=${name}`;
      message = "here's the [ FLUIDPAINT ] Logo created:";
      break;
    case "steel":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=62&text=${name}`;
      message = "here's the [ STEEL ] Logo created:";
      break;
    case "3dmetal":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=63&text=${name}`;
      message = "here's the [ 3DMETAL ] Logo created:";
      break;
    case "metalpurple":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=64&text=${name}`;
      message = "here's the [ METALPURPLE ] Logo created:";
      break;
    case "goldglitter":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=65&text=${name}`;
      message = "here's the [ GOLDGLITTER ] Logo created:";
      break;
    case "thor":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=66&text=${name}`;
      message = "here's the [ THOR ] Logo created:";
      break;
    case "metalic":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=67&text=${name}`;
      message = "here's the [ METALIC ] Logo created:";
      break;
    case "hotmetal":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=68&text=${name}`;
      message = "here's the [ HOT METAL ] Logo created:";
      break;
    case "glossymetal":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=69&text=${name}`;
      message = "here's the [ GLOSSY METAL ] Logo created:";
      break;
    case "metalgold":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=70&text=${name}`;
      message = "here's the [ METALGOLD ] Logo created:";
      break;
    case "metalpaint":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=71&text=${name}`;
      message = "here's the [ METALPAINT ] Logo created:";
      break;
    case "hologram":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=72&text=${name}`;
      message = "here's the [ HOLOGRAM ] Logo created:";
      break;
    case "3dcrystal":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=73&text=${name}`;
      message = "here's the [ 3D CRYSTAL ] Logo created:";
      break;
    case "grung":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=74&text=${name}`;
      message = "here's the [ GRUNG ] Logo created:";
      break;
    case "multicolor":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=75&text=${name}`;
      message = "here's the [ MULTICOLOR ] Logo created:";
      break;
    case "pinksoft":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=76&text=${name}`;
      message = "here's the [ PINKSOFT ] Logo created:";
      break;
    case "3dliquid":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=77&text=${name}`;
      message = "here's the [ 3DLIQUID ] Logo created:";
      break;
    case "burger":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=78&text=${name}`;
      message = "here's the [ BURGER ] Logo created:";
      break;
    case "cage":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=79&text=${name}`;
      message = "here's the [ CAGE ] Logo created:";
      break;
    case "knitted":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=80&text=${name}`;
      message = "here's the [ KNITTED ] Logo created:";
      break;
    case "3dmetal2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=81&text=${name}`;
      message = "here's the [ METAL 2 ] Logo created:";
      break;
    case "party":
      apiUrl = `hhttps://5xp7m4-8080.csb.app/api/textpro?number=82&text=${name}`;
      message = "here's the [ PARTY ] Logo created:";
      break;
    case "3dchristmas":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=83&text=${name}`;
      message = "here's the [ 3DCRISTMAS ] Logo created:";
      break;
    case "newyear":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=84&text=${name}`;
      message = "here's the [ NEWYEAR ] Logo created:";
      break;
    case "purpleglass":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=85&text=${name}`;
      message = "here's the [ PURPLE GLASS ] Logo created:";
      break;
    case "ballon2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=86&text=${name}`;
      message = "here's the [ BALLON2 ] Logo created:";
      break;
    case "ballon3":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=87&text=${name}`;
      message = "here's the [ BALLON ] Logo created:";
      break;
    case "cobble":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=88&text=${name}`;
      message = "here's the [ COBBLE ] Logo created:";
      break;
    case "greenhorror":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=89&text=${name}`;
      message = "here's the [ GREEN HORROR ] Logo created:";
      break;
    case "holloweenfire":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=90&text=${name}`;
      message = "here's the [ HOLLOWEEN FIRE ] Logo created:";
      break;
    case "batman":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=91&text=${name}`;
      message = "here's the [ BATMAN ] Logo created:";
      break;
    case "skeleton2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=92&text=${name}`;
      message = "here's the [ SKELETON 2 ] Logo created:";
      break;
    case "1917":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=93&text=${name}`;
      message = "here's the [ 1917 ] Logo created:";
      break;
    case "lion":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=94&text=${name}`;
      message = "here's the [ LION ] Logo created:";
      break;
    case "purple2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=95&text=${name}`;
      message = "here's the [ PURPLE2  ] Logo created:";
      break;
    case "videogame":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=96&text=${name}`;
      message = "here's the [ VIDEO GAME ] Logo created:";
      break;
    case "embossed":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=97&text=${name}`;
      message = "here's the [ EMBOSSED ] Logo created:";
      break;
    case "spooky":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=98&text=${name}`;
      message = "here's the [ SPOOKY ] Logo created:";
      break;
    case "lava":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=99&text=${name}`;
      message = "here's the [ LAVA ] Logo created:";
      break;
    case "water":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=100&text=${name}`;
      message = "here's the [ WATER ] Logo created:";
      break;
    case "artistic":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=101&text=${name}`;
      message = "here's the [ ARTISTIC ] Logo created:";
      break;
    case "party2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=102&text=${name}`;
      message = "here's the [ PARTY 2 ] Logo created:";
      break;
    case "newyear2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=103&text=${name}`;
      message = "here's the [ NEWYEAR2 ] Logo created:";
      break;
    case "newyear3":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=104&text=${name}`;
      message = "here's the [ NEWYEAR3 ] Logo created:";
      break;
    case "newyear4":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=105&text=${name}`;
      message = "here's the [ NEWYEAR4 ] Logo created:";
      break;
    case "lightglow":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=106&text=${name}`;
      message = "here's the [ LIGHT GLOW ] Logo created:";
      break;
    case "grafity2":
      apiUrl = `https://5xp7m4-8080.csb.app/api/textpro?number=107&text=${name}`;
      message = "here's the [ GRAFITY 2 ] Logo created:";
      break;
    default:
      return api.sendMessage(
        `Invalid logo type! Use .textpro list 1 to see the list of textpro logos.`,
        threadID,
        messageID
      );
  }

  api.sendMessage("please wait...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};

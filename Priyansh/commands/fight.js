const fs = require("fs");
const path = __dirname;
const pathToggle = path + "/fightToggle.json";

if (!fs.existsSync(pathToggle)) fs.writeFileSync(pathToggle, "{}");

let fightToggle = JSON.parse(fs.readFileSync(pathToggle));

// Store active fight loops (for canceling)
const activeFights = {};

const galiReplies = [
  "Abe {target}, tere jaise to main roz galiyon mein peet deta hoon!",
  "Oye {target}, tu ladne aya hai ya pitne?",
  "{target} tere mooh pe 4 jute padne chahiye!",
  "{target} bhag jaa, warna hospital seedha!",
  "{target} tu fight karega? Tere se to billi bhi jeet jaaye!",
  "{target} tu to chappal ke laayak bhi nahi!",
  "{target} tere ko dekh ke kutte bhi hans rahe hain!",
  "{target} zyada bhaunka to joota padega!",
  "{target} jaa jaa pehle poty saaf kar!",
  "{target} ladai ka nahi, sirf bhonkne ka kaam reh gaya hai tera!",
  "{target} tere se fight karna to insult hai mere haath ki!",
  "{target} chal bhaag, tu sirf status mein attitude dikhata hai!",
  "{target} ladne aya hai? Pampers pehne ke baad aana!",
  "{target} tere jaise 10 aaye roz pitke jaate!",
  "{target} tu fight karega? tu to status mein hi Sher hai!",
  "{target} tujhe dekh ke punch bhi apne aap gir jaaye!",
  "{target} tu nahi sudhrega, chappal se pyar se samjhaun?",
  "{target} itna mat bhaunk, hawa bhar jaayegi tere mooh mein!",
  "{target} tu fight nahi, fuse hai be!",
  "{target} tere muh pe jhaadoo maaru kya?",
  "{target} chal nikal, fight fight karta hai, cartoon!",
  "{target} tujhe dekhke billi bhi daud jaye!",
  "{target} teri aukaat nahi muqabla karne ki!",
  "{target} pehle bharti ho army mein, fir ladai ki baat kar!",
  "{target} tere jaise pitne ke liye bhi line nahi lagti!",
  "{target} tere mooh pe sticker laga doon 'bewakoof' ka?",
  "{target} fight karega? Tu to slap se bhi royega!",
  "{target} tu fight nahi, joke hai mera!",
  "{target} teri maa ne tujhe ladne ke liye nahi, pitne ke liye paida kiya hai!",
  "{target} tu zyada bhaunkta hai, kaam kuch nahi karta!",
  "{target} tu ladne ka naatak bandh kar, jaa mooh dho le!",
  "{target} jaise ladke to road pe chappal khaate dikhte hain!",
  "{target} tujhme dum nahi, sirf drama hai!",
  "{target} tu fight karega ya acting kar raha?",
  "{target} chupp baith, tujhe dekh ke chappal bhi pighal jaye!",
  "{target} tu toh Sirf keyboard pe fight karta hai!",
  "{target} tu to default loser hai!",
  "{target} tere jaise ko gaali dena bhi beizzati hai gaali ki!",
  "{target} tere mooh se fight ka word nikalna bhi mazaak hai!",
  "{target} tu fight nahi, chutiyapa karta hai!",
  "{target} tu bheek maang, ladai mat kar!",
  "{target} tere mooh pe likha hai: Ghar wapas bhejo!",
  "{target} tu ladke nahi, lapait ke ghar jaayega!",
  "{target} tujhe chappal maar maar ke educate karna padega!",
  "{target} tu fight karega? Tu to meme material hai!",
  "{target} fight nahi, tujhe toh dant saaf karni chahiye!",
  "{target} ladai tere liye nahi, hospital booking ka kaam hai!",
  "{target} tujhe dekh ke mohalla hans pada!",
  "{target} tu zyada bhaunka toh gali ki kutti bhi pategi tujhe!",
  "{target} fight ki baat karta hai, pehle seedha chalna seekh!",
  "{target} ladai mein tujhe ghar wale bhi support nahi karenge!",
  "{target} pehle apna diaper change kar, fir ladai karna!",
  "{target} tere jaise ko toh training bhi nahi bachaa sakti!",
  "{target} tu pit ke ayega fir bhi attitude nahi jaayega!",
  "{target} tere jaisi aukaat ho toh chappal ka use badhta hai!",
  "{target} tu toh road ke jokers ka king hai!",
  "{target} tu ladai nahi, circus ka clowner hai!",
  "{target} dekh bhai, tu fight karega toh dard mujhe nahi hoga!",
  "{target} fight kiya toh seedha gaon jaake bhains charayega!",
  "{target} tu toh mooh dikhane layak nahi fight ke baad!",
  "{target} tujhe ladai ke badle sympathy milni chahiye!",
  "{target} tere jaise fight karne aaye, toh hospital full ho jaaye!",
  "{target} bhag saale, tu chappal se bhi haar gaya tha!",
  "{target} tujhe dekh ke bagal waale bhi dukhi ho gaye!",
  "{target} tu toh ladai se pehle hi mood kharaab kar deta hai!",
  "{target} tu toh punch se pehle hee moot deta hai!",
  "{target} tu toh fight mein sirf background noise hai!",
  "{target} mooh utha ke bol, zameen pe gira dunga!",
  "{target} tere jaisi aukaat mein sirf ignore aata hai!",
  "{target} ladai toh door, tu toh reply bhi nahi deserve karta!",
  "{target} fight toh sirf izzat walo ke saath hoti hai!",
  "{target} tu sirf status update kar, ladai chhod de!",
  "{target} tujhe ladne nahi, jhaadu dene bhejna chahiye!",
  "{target} tu fight karega? Tere se toh emojis zyada strong hain!",
  "{target} ladai karna chhod, jaa toothpaste khareed!",
  "{target} tere jaisi fight se better hai online chess khelun!",
  "{target} tu toh ladai mein bhi background character hai!",
  "{target} tujhe fight ki nahi, treatment ki zarurat hai!",
  "{target} tu aaye ladai mein toh pitne ki guarantee hai!",
  "{target} tu mention kare ya mat kare, phir bhi pitayega!",
  "{target} tujhe fight karne se better hai saand se kushti kar loon!",
  "{target} tujhe toh school ke kids bhi hara denge!",
  "{target} fight karne se pehle apna insurance karwa le!",
  "{target} tu toh pit pit ke meme ban jaayega!",
  "{target} tujhe dekhke punching bag bhi pighal jaye!",
  "{target} fight karega? Tu toh hi5 se bhi gir jaata hai!",
  "{target} hospital ka bed reserve kar le, pitne wala hai!",
  "{target} tere jaise ladne se acha selfie le lun!",
  "{target} tu toh sirf galiyon ka joker hai, fighter nahi!",
  "{target} ladne se pehle ro lega tu!",
  "{target} mooh utha, mukka gira dunga!",
  "{target} fight nahi karni, maar maar ke bhool jaunga tujhe!",
  "{target} tu toh reply dene layak bhi nahi!",
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports.config = {
  name: "fight",
  version: "11.0.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Send all galis to a user, auto one-by-one, with stop/on/off",
  commandCategory: "fun",
  usages: "[on/off/stop/mention/reply]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;
  const arg = args[0]?.toLowerCase();

  // Toggle ON
  if (arg === "on") {
    fightToggle[threadID] = true;
    fs.writeFileSync(pathToggle, JSON.stringify(fightToggle, null, 2));
    return api.sendMessage("✅ Fight mode is ON.", threadID, messageID);
  }

  // Toggle OFF
  if (arg === "off") {
    fightToggle[threadID] = false;
    fs.writeFileSync(pathToggle, JSON.stringify(fightToggle, null, 2));
    // Stop any active fight loop too
    if (activeFights[threadID]) {
      activeFights[threadID].stop = true;
      delete activeFights[threadID];
    }
    return api.sendMessage("❌ Fight mode is OFF.", threadID, messageID);
  }

  // STOP running fight loop (without disabling mode)
  if (arg === "stop") {
    if (activeFights[threadID]) {
      activeFights[threadID].stop = true;
      delete activeFights[threadID];
      return api.sendMessage("🛑 Fight stopped.", threadID, messageID);
    } else {
      return api.sendMessage(
        "⚠️ No fight in progress to stop.",
        threadID,
        messageID
      );
    }
  }

  // If not enabled, block
  if (!fightToggle[threadID]) {
    return api.sendMessage(
      "⚠️ Fight mode is OFF. Use `.fight on` to enable.",
      threadID,
      messageID
    );
  }

  // Get target
  const mentionID = Object.keys(event.mentions)[0];
  const replyID = event.messageReply?.senderID;
  const targetID = mentionID || replyID;

  if (!targetID) {
    return api.sendMessage(
      "❌ Mention or reply to someone to fight.",
      threadID,
      messageID
    );
  }

  try {
    const userInfo = await api.getUserInfo(targetID);
    const targetName = userInfo[targetID]?.name || "Target";

    // Track session
    activeFights[threadID] = { stop: false };

    for (let i = 0; i < galiReplies.length; i++) {
      if (activeFights[threadID].stop) break;
      const gali = galiReplies[i].replace("{target}", targetName);
      await api.sendMessage(gali, threadID);
      await delay(2000); // 2s delay
    }

    delete activeFights[threadID];
  } catch (err) {
    console.error("❌ Fight error:", err);
    return api.sendMessage(
      "❌ Error while executing fight.",
      threadID,
      messageID
    );
  }
};

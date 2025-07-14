// commands/kill.js

module.exports.config = {
  name: "kill",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Fake kills a user with desi-style random lines",
  commandCategory: "fun",
  usages: "@mention or reply",
  cooldowns: 2,
};

const killLines = [
  "{name}, tu toh chappal ke bhi laayak nahi!",
  "{name}, zyada bhaunka toh mooh tor dunga!",
  "{name}, fight karega? Tu toh cartoon hai!",
  "{name}, mooh band kar, warna joota padega!",
  "{name}, tu circus ka joker hai!",
  "{name}, tujhe fight nahi, treatment chahiye!",
  "{name}, hospital ka bed reserve kar le!",
  "{name}, tujhe dekh ke billi bhi hans rahi hai!",
  "{name}, punch se pehle hi tu moot deta hai!",
  "{name}, keyboard ka fighter hai tu, asli zameen pe zero!",
  "{name}, tu toh jhaadu se bhi maara jaa sakta hai!",
  "{name}, tu itna weak hai, hawa bhi uda le jaaye!",
  "{name}, fight karne aaya ya meme banwane?",
  "{name}, tujhe maar ke toh emoji bhi roya!",
  "{name}, RIP beta, aur zyada smart banna mehenga pada!",
  "{name}, tu pit gaya, ab rest in meme ban!",
  "{name}, maar ke tujhe group ne party ki!",
  "{name}, tere upar toh sarcasm bhi waste hai!",
  "{name}, fight kya karega, tu toh ek chutiya bhi nahi!",
  "{name}, tujhe maar ke vibe set ho gayi!",
  "{name}, RIP, tu toh pehle se hi dead tha dimaag se!",
  "{name}, maar diya, fir bhi attitude nahi gaya tera!",
  "{name}, tujhe maarne ka toh maza hi alag tha!",
  "{name}, tu toh Google pe bhi search worthy nahi!",
  "{name}, chappal ne tujhe reject kar diya!",
  "{name}, maar ke tujhe recycle bin me daal diya!",
  "{name}, tu pit pit ke viral ho gaya!",
  "{name}, maar diya... ab thoda shaanti hai duniya me!",
  "{name}, fight se pehle hi tera system hang ho gaya!",
  "{name}, tu toh punch se pehle hi surrender kar gaya!",
  "{name}, RIP: next life me better ban!",
  "{name}, tu toh ek line ka bhi worth nahi tha!",
  "{name}, maar diya aur report bhi kiya!",
  "{name}, fight toh reason bhi nahi deta!",
  "{name}, tu toh default loser hai!",
  "{name}, maar ke tujhe mute kar diya mentally!",
  "{name}, RIP legend, meme ke naam pe dhabba!",
  "{name}, fight ka shauk tha? Lo maar diya!",
  "{name}, tere jaise fight kare toh chappal thak jaaye!",
  "{name}, maar ke tujhe history se hata diya!",
  "{name}, tu toh fighting game ka background character hai!",
  "{name}, RIP, ab ghanta baj gaya tera!",
  "{name}, maar ke tujhe ignore list me daal diya!",
  "{name}, tu toh content warning bhi nahi deserve karta!",
  "{name}, tere liye toh insult bhi bekar jaye!",
  "{name}, tu toh fight se pehle hi block list me tha!",
  "{name}, maar diya aur delete bhi!",
  "{name}, tu toh ek missed call tha is duniya ka!",
  "{name}, RIP, ab se tujhe yaad nahi kiya jaayega!",
  "{name}, maar ke tujhe status banaya — 'gone wrong'!",
  "{name}, tu toh video buffering me hi mar gaya!",
  "{name}, tu toh fight ki spelling bhi nahi janta!",
  "{name}, RIP tera ego — maar diya gaya!",
  "{name}, maar ke tujhe emoji tribute diya gaya!",
  "{name}, fight toh dur ki baat, tu toh warning bhi nahi!",
  "{name}, tujhe maarna kaafi satisfying tha!",
  "{name}, tu toh sirf backspace ka kaam hai!",
  "{name}, RIP... group cleaner triggered!",
  "{name}, tujhe maar diya, ab group me sukoon hai!",
  "{name}, maar ke tujhe story highlight bana diya!",
  "{name}, tu toh booting screen pe hi pit gaya!",
  "{name}, fight se zyada comedy thi teri entry!",
  "{name}, RIP... chappal express se uda diya gaya!",
  "{name}, maar ke tujhe bhoolna easy tha!",
  "{name}, tu toh system update se pehle ka bug tha!",
  "{name}, fight karega? Tere level pe toh bacche bhi jeet jaayein!",
  "{name}, maar diya, next!",
  "{name}, tu toh joke bhi nahi, sirf silence hai!",
  "{name}, RIP: chappal ne kaam kar diya!",
  "{name}, maar ke teri entry undo kar di!",
  "{name}, fight? Tujhme toh lag bhi nahi raha!",
  "{name}, maar diya aur block bhi kar diya!",
  "{name}, tu toh attention bhi nahi deserve karta!",
  "{name}, RIP, zyada bolna mehenga pada!",
  "{name}, maar ke tujhe exit kar diya group se!",
  "{name}, tu toh first strike me hi zero ho gaya!",
  "{name}, maar diya, emoji bhi bechain ho gaya!",
  "{name}, fight ka sapna dekhna band kar!",
  "{name}, RIP… chappal certified!",
  "{name}, tu toh insult worthy bhi nahi!",
  "{name}, maar ke tujhe pin kar diya wall pe!",
  "{name}, fight kiya aur fail ho gaya full!",
  "{name}, RIP, ab tu sirf history hai!",
  "{name}, maar ke tujhe logon ne yaad bhi nahi kiya!",
  "{name}, tu toh lagta hi delete button ka shikaar hai!",
  "{name}, fight se pehle hi teri battery dead ho gayi!",
  "{name}, maar diya, Google bhi na mil paya tujhe!",
  "{name}, RIP beta, agle janam sudhar jaana!",
  "{name}, tu toh sirf group filler tha!",
  "{name}, maar diya aur silence activate ho gaya!",
  "{name}, tu toh insult ka version beta tha!",
  "{name}, maar ke tujhe friendzone bhi kar diya group ne!",
  "{name}, tu toh fight me nahi, funeral me fit hai!",
  "{name}, RIP, chappal happy ho gayi tujhe uda ke!",
  "{name}, tu toh self roast ho gaya!",
  "{name}, maar diya, ab screenshot leke yaad rakhna!",
  "{name}, tu toh game over screen ka bhi part nahi!",
  "{name}, RIP: maar ke delete bhi kar diya backup se!",
  "{name}, fight karna chhodd, jhaadu utha!",
  "{name}, tu toh last seen ka bhi dhabba hai!",
];

module.exports.run = async function ({ api, event }) {
  const mentionID = Object.keys(event.mentions)[0];
  const replyID = event.messageReply?.senderID;
  const targetID = mentionID || replyID;

  if (!targetID) {
    return api.sendMessage(
      "❌ Kisi ko tag ya reply karo kill karne ke liye.",
      event.threadID
    );
  }

  try {
    const info = await api.getUserInfo(targetID);
    const targetName = info[targetID]?.name || "User";

    const line = killLines[
      Math.floor(Math.random() * killLines.length)
    ].replace("{name}", `@${targetName}`);

    return api.sendMessage(
      {
        body: line,
        mentions: [{ tag: `@${targetName}`, id: targetID }],
      },
      event.threadID
    );
  } catch (err) {
    console.error("❌ Kill Error:", err);
    return api.sendMessage(
      "❌ Error while running kill command.",
      event.threadID
    );
  }
};

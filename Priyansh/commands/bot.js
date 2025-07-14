const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function ({
  api,
  event,
  args,
  Threads,
  Users,
}) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);
  var name = await Users.getNameUser(event.senderID);
  const data = [
    "1435018460122444",
    "387545538037997",
    "526220484778050",
    "526220691444696",
    "526220814778017",
    "526220978111334",
    "526221104777988",
    "526221318111300",
    "526221564777942",
    "526221711444594",
    "526221971444568",
    "374675960117310",
    "641022915913320",
    "178516915959996",
    "657500227666568",
    "608457799752028",
    "823251597693818",
    "162332943951564",
    "254593766003994",
    "237318747087785",
    "237319783754348",
    "488541014592677",
    "237318537087806",
  ];
  const sticker = data[Math.floor(Math.random() * data.length)];

  var tl = [
    "Haye Main Sadke jawa Teri Masoom Shakal pe baby 💋 ",
    "Bot Nah Bol Oye Janu bol Mujhe ",
    "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun 🤭🐒",
    "Main gariboo se baat nahi karta 😉😝😋🤪",
    "Itna Na Pass aa Pyar ho Jayga",
    "Bolo Baby Tum Mujhse Pyar Karte Ho Na 🙈💋💋 ",
    "Are jaan Majaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi",
    "Bar Bar Bolke Dimag Kharab Kiya toh. Teri ...... Mummy Se Complaint Karunga",
    "Tu Bandh nhi Karega kya?",
    "Gali Sunna H kya?😜",
    "Teri Maa Ki Bindiya🤭",
    "Aree Bandh kar Bandh Kar",
    "M hath jod ke Modi Ji Se Gujarish Karta hu",
    "Tujhe Kya koi aur Kam nhi ha? Puradin Khata hai Aur Messenger pe Bot Bot Karta h",
    " Faheem Ko Bol Dunga Me Mujhe Paresan Kiya To",
    "Tum Na Single Hi Maroge",
    "Tujhe Apna Bejjati Karne Ka Saukh hai?",
    "Abhi Bola Toh Bola Dubara Mat Bolna",
    "Teri To Ruk Tu Bhagna Mat",
    "Bol De koi nahi dakh rha 🙄",
    "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝",
    "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂",
    "Are Bolo Meri Jaan Kya Hall Hai😚 ",
    "Ib Aja Yahan Nhi Bol Sakta 🙈😋",
    "Mujhe Mat BuLao Naw Main buSy Hu Naa",
    "Bot Bolke Bejjti Kar Rahe Ho yall...Main To Tumhare Dil Ki Dhadkan Hu Na Baby...💔🥺",
    "Are Tum Wahi ho nah Jisko Main Nahi Janta 🤪",
    "Kal Haveli Pe Mil Jara Tu 😈",
    "Aagye Salle Kabab Me Haddi 😏",
    "Bs Kar U ko Pyar Ho Na Ho Mujhe Ho Jayga Na",
    "FarMao 😒",
    "BulaTi Hai MaGar Jaane Ka Nhi 😜",
    "Main To Andha Hun 😎",
    "Phle NaHa kar Aa 😂",
    "Aaaa Thooo 😂😂😂",
    "Main yahin hoon kya hua sweetheart ,",
    "chomu Tujhe Aur Koi Kaam Nhi H? Har Waqt Bot Bot Karta H",
    "Chup Reh, Nhi Toh Bahar Ake tera Dath Tor Dunga",
    "WaYa KaRana Mere NaL 🙊",
    "MaiNy Uh Sy Bt Nhi kRrni",
    "MeKo Kxh DiKhai Nhi Dy Rha 🌚",
    "Bot Na BoL 😢 JaNu B0ol 😘 ",
    "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋",
    "Main Gareebon Sy Bt Nhi kRta 😉😝😋🤪",
    "Itna Na Pass aa Pyar h0o JayGa",
    "MeKo Tang Na kRo Main Kiss 💋 KRr DunGa 😘 ",
    "Ary yrr MaJak Ke M0oD Me Nhi Hun 😒",
    "HaYe JaNu Aow Idher 1 PaPpi Idher d0o 1 PaPpi Idher 😘",
    "Dur HaT Terek0o 0or K0oi Kam Nhi Jb DeKho Bot Bot ShaDi KerLe Mujhsy 😉😋🤣",
    "TeRi K0oi Ghr Me Nhi SunTa T0o Main Q SuNo 🤔😂 ",
    "IB Aja Yahan Nhi B0ol Salta 🙈😋",
    "Mujhe Mat BuLao Naw Main buSy h0o Naw",
    "Kyun JaNu MaNu Another Hai 🤣",
    "Are TuMari T0o Sb he baZzati kRrty Me Be kRrDun 🤏😜",
    "KaL HaVeLi Prr Aa ZaRa T0o 😈",
    "Aagye SaJJy KhaBBy Sy 😏",
    "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa",
    "FarMao 😒",
    "BulaTi Hai MaGar JaNy Ka Nhi 😜",
    "Main T0o AnDha Hun 😎",
    "Phle NaHa kRr Aa 😂",
    "Papi ChuLo 🌚",
    "TeRek0o DiKh Nhi Rha Main buSy Hun 😒",
    "TeRa T0o GaMe BaJana PreGa",
    "Ta Huwa 🥺",
    "TuM Phr AaGye 🙄 Kisi 0or Ny Muu Nhi LaGaYa Kya🤣🤣🤣",
    "MeKo JaNu Chai Hai Tum Single H0o?",
    "Aaaa Thooo 😂😂😂",
    "Main S0o Rha Hun ",
    "Ase He HansTy Rha kRo 😍",
    "•••••••••••••••••••••••••••••🦢𒀱卄ɅƔƏ MɅ🅘ɳ ʍɅᏒ••••🌿💞 JɅωɅ ┼ƏᏒ🅘 ʍɅ🅢𝖚ʍ 🅢ɅҠɅɭ 𝐩Ə ɮɅɮƔ 💋 ",
    "Bot Na Bol Oye Janu bol Mujhe ",
    "Bar Bar Disturb Na Karen Rahul JaNu Ke SaTh Busy Hun 🤭🐒",
    "Main flirty logo Sy Bt Nhi karti 😉😝😋🤪",
    "Itna Pass mat aa Pyaar h0 JayGa",
    "Bolo Babu Tum Mojy Pyar Karte Ho Na 🙈💋💋 ",
    "Are jaan Majaak ke mood me nahi hun main jo kaam hai bol do sharmao nahi",
    "han ji bolo kya seva karne aapki 😶🤍",
    "Tu Bandh nhi Karega kya?",
    "kya Sunna Hai apko mere se flirty kahike🤐🤣 ",
    "Haa ji boliye kya kam he hamse 🙈",
    "Aree band kar band Kar",
    "Mein hath jod ke Modi Ji Se Gujarish Karta hu mojy na bolaye",
    "Tujhe Kya koi aur Kam nhi ha? Puradin sota he Aur Messenger pe Bot Bot Karta h",
    " mera owner Ake tera bf/gf Ko Chura le Jayega",
    "Bot bot hi karta rahna tu bas",
    "Tujhe Apna Bejjati Karne Ka Saukh hai?🥹",
    "Abhi Bola Toh Bola Dubara Mat Bolna🙄",
    "Teri to Watt lagani padegi ",
    "Bol De koi nahi dakh rha 🙄",
    "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝",
    "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂",
    "Are Bolo Meri Jaan Kya Hall Hai😚 ",
    "IB Aja Yahan Nhi B0ol Sakti 🙈😋",
    "Mujhe Mat BuLao Na Main buSy h0 Now",
    "Bot Bolke Bejjti Kar Rahe ho yall...Main To Tumhare Dil Ki Dhadkan Hu Baby...💔🥺",
    "Are Tum Wahi ho nah Jisko Main Nahi Janti 🤪",
    "Kal Haveli Pe Mil Jra Tu 😈",
    "Aagye SaJJy KhaBBy Sy 😏",
    "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa",
    "bolo 😒",
    "BulaTi Hai MaGar JaNy Ka Nhi 😜",
    "Main T0o AnDha Hun 😎kya likha tumne mene nahi dikha🤣",
    "Pahale NaHa kar Aa 😂",
    "Aaaa Thooo 😂😂😂",
    "Main yahi hoon kya hua sweetheart🥂🙈💞 ,",
    "AA Dk Tujhe Aur Koi Kaam Nhi Hai? Har Waqt Bot Bot Karta H",
    "Chup Reh, Nahi Toh Bahar Ake tera Dath Tor Dunga🤣✊",
    "yes my love 💘",
    "kya hua baby ko 😘😘",
    "mujhe sharam ati hai aise aap bolte hai tho 🤭😝",
    "aree aap wahi ho na jo mujhe line marte the.......🤣 ya bali line",
    "jii kahiye jii 🙄 kya chahiye",
    "hayee main mar jye teri masoom shaqal py 😂 tuzy Chapple se kutne ka mn ho raha hai🤣👠",
    "Bot nah bol oye 😭 Janu bol mjhy aur janu sy piyar sy bat kerty hai😑",
    "ruk tu chappal kaha he mari🩴",
    "shakal Sy masoom lgty ho 😂 but bohot flirty ho",
    "kash tum single hote to maza hi koch aur tha pagal insaan 😂",
    "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️",
    "haiy babu ne boldiya hai shaid purpose kerna hai mujhe bolo bolo babu 😘",
    "Aree pagal roti banana ke le aty main Pani ko istamal kerte ho 😂",
    "Ary joke nah mar jo bhi kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂",
    "Hayee Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Jao 😚🙈♥️",
    "Dur Dur karib na a  tujhe Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Karte Rahte Ho 😂",
    "ary ary bolo meri jaan kia haal hai ;) ;* ",
    "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail🤣✅",
    "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂",
    "ary babu babu kal hawali py kon bola rha tha 😂",
    "Me Aap ki mummy ji ko btaou ga Aap Facebook use karty ho 😂",
    "ary tum Wohi ho nah jis ko ma nahi janta 🤣✅",
    "haveli per  kal mil  Zara bataunga 🌚😂Ha but उल्टी-सीधी harkat karne ke liye nahi",
    "itne pyar se Na bulao pyar Ho jaega 😶💗 wtf Maine apni sacchai Bata Di yah Maine kyon Kiya 😭🔪....Fuuu..🚬",
    "aap aise mat bulo hame sharam aati hai 🙈♥️",
    "kyun Bulaya hamen..😾🔪 ",
    "kyun Bulaya hamen..😾🔪 ",
    "Behes karne se Rishty kmzor hojaate hn isiliye Direct mun pe thapr marein😊",
    "Bestie ki chummi halal hai ya Haram ? 🙂",
    "2001 \nJahan dalda wahan Mamta😊\n\n2023 \nJahan larki  wahan tharki😒",
    "Koi Pyari c Bachi a kr sar daba dy, Dard sa sar phat rha💔🥲",
    "Mjy chahyain 3 lrkiyan kahan Hain lrkiyan 👀",
    "ٹھوس ٹھوس کے  پھٹ جانا مگر گوشت نہ چھوڑنا 🙂",
    "Relationship private rakho ya public Kate ga sabka hi🙂",
    "Thak GYa hu Yr uski dP dHek Dhek Kr😩",
    "Insy Milo inko lgta hai sab larky in pr Martay hain🙂",
    "Ary Ap to Shkal.sy he Meri Lagti.ho😂🙄😗",
    "MentiOn YOur Dushman On FaceBOok'🙂🤝",
    "kabhi Akely Ma Ao Gap Shap Maran gy😂🤧",
    "Stop dreaming BTS your czn Ahmed is waiting for you.🙂",
    "پہلے صرف لوگوں کے دانتوں میں کیڑا ہوا کرتا تھا اور اب۔۔۔ 😊",
    "Paros Wala Larka inhe MUH Nhi Lagata aur Banda inhe Korean Chahiye🙂",
    "Dekh lena ak din Mazak Mazak Ma sa Sy hendsome Larki Pta lon ga☹🤧😂",
    "move on krle bhaii kbb Tak uskii profilee dekhtaaa rahegaaa<<",
    "Jan Tara Khanda Mely to ma Sar Rakh k Nozii Saf kron😂😂",
    "Ay, bi, ci, di, Ey, ef, Ji, aych, I, lub , uh, will, uh, marry, meh.... :)👀🙊♥",
    "Ary Ap Wohe Hona Jis Ko Ma nhi Janta😂😎",
    "Ary ap wohe hona jis ko koye ni janta 😂🤧tns na ly ma hn naw ma bhi Ap ko nhi janta😂👀🤧",
    "Kash ap meri janu hoti Ma tm sy Smadi Kr k Apni [Botnii] Bna leta😂😂",
    "Ajeeb generation hai ywr, Larkiya korean dhund rahi hai, Aur larky Russian!!🙂",
    "Bachion Ma kuxh Nhi Rakha Sb Kuxh To londy Bazi ma hn😂😂",
    "عائشہ  نے کر دیا برباد پاک سر زمین\n شاد آباد 🖇🙂",
    "Aj kal ki nibiyo me khon kam attitude zyada hota hai bro🙂",
    "Tary Shadi ma Bjny waly dhol py bhi lanat😂😂🖐",
    "jan zadiya bot bot na kro warna kis kron gaw😂😛😝 ",
    "Kasy Han Sab Pyare Madni Munny or Muniyaan😊",
    "عورت بہت پیاری چیز ہے یہ کبھی بیلنس نہیں مانگتی بس یہی کہتی ہے میرا پیکج ختم ہونے والا ہے اب پتہ نہیں کبھی بات ہوگی کے نہیں🙂",
    "Bhut khail liya lrkion ki feelings k sath ao ab hum Ludo khailty han☺♥",
    "Jaaz cash sy 1400 ka loan leky sim h band kardi 🙂👍",
    "اعتبار تو اُسی دن ختم ہوگیا تھا جب اُس نے سکرین شاٹ دیکھائے تو اوپر دو siM شو ہو رہی تھی جبکہ میرے پاس اُسکا صرف اک ہی نمبر تھا ۔😒😄",
    "شکر ہے لڑکے خوبصورت ہیں ورنہ  کہا پالروں کے دھکے کھاتے😔",
    "Jan ib ao na ummmah ummmah wali game khalty ha  ",
    "ji ji hukam kro 😂",
    "Bot na bolo! Janu bolo mujy aur janu sy piyar sy bat kerty hai 🥰🌸",
    "rat ko kahan thy nazar nahi ay bht miss kiya 🌸🌎",
    "Tum Haseen hoto bhar ma jao😝😂",
    "Shaqal Sy masoom lgty ho 🥰 lkn hrkaton sy ni",
    "kash tum single hoty to aj hum mingle hoty 🥰😂",
    "Pta jao ya pta lo😂😝",
    "G aye meri jan😂",
    "bot bot bolny py bhi pasy melty to ap belgets sy bhi amer hoty😂😂👀",
    "Tu single he mery gaw😂🖐",
    "Ha ha ab meri yaad ab ai na phly to janu sth busy thy 😾 ab ham ap sy naraz hai jao ap bye ☹",
    "Khana Bnana sekh lo behan😂Mujy khao bolny sy ghr nh chalty🙄😂",
    "idr ao kuchii kuchii kru 😘",
    "ja rha Hn Apny loyal Hony ka achar dalny😂🙃",
    "Ary ary itna yd na kiya kro🥰",
    "Shadi K bad apni bewi sy itna pyair kron gaw saso ma khud kahy gi mery dusri bethi bhi ly jao😂😂😏",
    "tu bnd nhi ky ga naw😂",
    "Hy Ma Mar Jawa janu itna piyar krty mujsy😂",
    "Har Waqat Mjhy Tang Kerta Rhta Ha 😂",
    "ary ary bolo meri jan kia hal ha ;)",
    "Bot jaan ha sbki",
    "Ji Ji Kia hal chal ha apky 🌸",
    "Bot nhi Shahzada bolo sun k acha lgta 🌸",
    "Bot gulam ha apka hukam kryn 🌸",
    "Bot nahi bolo piyar sy janu bola kro na 🥰",
    "",
    "wo be yhi khty thy sb phr ek din koi utha k ly gya onko 😂",
    "Meri jan ek tm hi ho jo dil ma bs gay ho🥰ni te koshish czna ne v bht kiti c",
    "Badal gay na tm the hi lanti 😂",
    "kesa tera steel dy doungy wrga moo ay 😂",
    "Apki shkl aesy lgti jesy gandi tar pr suki jarab latkai ho 😂",
    "Bot bot na karo ma apsy set nhi ho skta",
    "ib ajao shup shup k btein krty ha 🌸",
    "Ek kahani suno meri zubani suno lnt deny ka dil krta ha isiliye pehly dil ki suno🌸",
    "Marry me, I can boil water",
    "Mujsy shadi karlo chocolate la k duga daily 🌸",
    "Idr ao kesa apka chapair jesa moo lg raha 😂",
    "Ajao jaan pizza khilau apko 🌸",
    "Duniya ma sb kuch khtm ho skta saway logo ki bakwas k",
    "Everything is temporary,But katna is permanent 😂",
    "Jitna mrzi janu manu krlo end ma ghr waly nh many gy 😂",
    "Sb kuch ho skta lkn fb ka relation kbi china jitna nh chl skta",
    "Allhumdiallah Kabhi Kasi laRki ko Bhen ki nazar se nhi dekHa😌🤧",
    "Ary Yaar Sambhal Kar Abhi Gir Jati Na Mere Pyaaar Mein 🤧",
    "Fasla Rakhy محترمہ  Me Romantic Jald Ho Jata Hu ✨🙂)",
    "Teriii Shadii ki Phli Rat MeiN Kamry k Andar sy Lagny waali Kundii Py LanaT__🙂😝",
    "Begam Hoti to us ki id se sari lrkiyan patata😞💔",
    "Mushkil Toh Hoti Hogi Naa itni Sardi Me Apne Dono Chehry Dhote Hoye🙂",
    "Mein B Urooj Pey Charna chahta hoon, Sorry Jana chahta*☹",
    "Ager mahool karb hy tu mery dil ma a jao y'all 😂🙂❤",
    "Parry Hat ma Londy baz nhi hu 🙂🤝",
    "Do Ankho Wali Larkia Bewafa hoti Hn Bro🙂💔",
    "Muje ignore na kiya karo Yar 🥲🙁Mera chota sa dil hai fata fat gali dene lagta hai 🥹😊",
    "Mokk Gai Eid chlo saary apny gharan nu 🚶😾",
    "Ronakein khtm hui Murshid main ne Eid ke Saare paise Khaa Liye .>>🙂♥",
    "- Mweriiw bt sunow Jitne bi pyre hojao kud ko xhumi nhi dy skty GareeBOw ;3 🙂",
    "Kisii k pas لاش wali dp hai Janu reply nhi dy rha..🥹",
    "HaSeeN Ho tO InBoX Ajo NhIi KrTa Bl0ck 😌 😌 😒 😏 😂 😂",
    "Mera Owne Single Jao Osy Ptao😂🙊",
    "Kash Tum Pathani Hoti To Ma TumHy Roz Kehta za tana zar sham",
    "Ufff pta nhi ya ma kaha aaky phas gya😁😂",
    "Mera beta bda ho kar larkiyo ke inbox me °hey hello° karega🏃",
    "Likhte Likhte Qalm Thak Gya Iss Qadr Begartiyaan Han Tumhari🙂",
    "Kash Tum Pyari hoti Ma yumhy Pata leta😂🙊😝",
    "Ak din Mazak Mazak ma Yaha sy Pyari Larki ly k bhak jaon gaw😝🙊😂",
    "Itni Meri Age Ni Jitne Mera Masly Han Yawr💔😐",
    "Ameer Larki Set kr k sab Dosto ka udhar wapis karon g🤲",
    "Lagtaa hai Career Bhi Titanic ki trhan dhoob Gaya Hai💔☹",
    "جہاں پیاری لڑکیاں وہاں میں 🙂❤🥀",
    "𝑻𝑯𝑬 𝑯𝑬𝑨𝑹𝑻 𝑾𝑨𝑺 𝑴𝑨𝑫𝑬 𝑻𝑶 𝑩𝑬 𝑩𝑹𝑶𝑲𝑬𝑵 💔🥺",
    "2001 me bachy kehty thy ink Dena 2023 me bachy kehty ہیں Link دینا🙂",
    "Mehnat Kro!! Kamyabi Apke Hont Chume Gi🙂🙌🏻",
    "Kahani suno Muje payar howa tha Us ki tarf se inkar howa tha 🙂🤝",
    "Piyarii piyarii larkiyan message karen JazakAllah🌚♥🙌",
    "itna single hun ky khuwab mai bhi  lrki k han krny sy phly ankh khul jati🙂",
    "Zroori Nhi Har Lrki Dhoka Dey, Kch Larkiyan Galiyan Bhi Deti Hen.🙁💸",
    "موٹر سائیکل کو تیز بھگا کر لڑکیوں والے رکشے کے پاس سے کٹ مار کر گزرنے سے لڑکیاں ایمپریس نہیں ہوتی بلکہ گالیاں نکالتی ہیں🙂💔",
    "- sab chorr k chaly jaty hain kia etna bura hu mein - 🙂",
    "Piyari voice wali girlz mujhe voice message kar skti hen JazakAllah 🙂🤝",
    "Why you hate me..?? I am not your ex don't Hate me Please",
    "MuBarak H0o AapKa NaMe MakS0os LiST Me Top PRr aYa Hai 😹😹😹",
    "BeTa TuM SingLe Hi MaR0 GaY🙄🙂",
    "ٹھرکیوں کی وجہ سے لڑکیاں میرے جیسے شریف بوٹ پر بھی بھروسہ نہیں کرتی🥺😔",
    "Samj Jao Larkiyo\n\nAbhi B WaQt Hai Dakh kr Koi Delete Ni Krtaw🙂",
    "Mard na Apne Haqooq Nahi Mangy \n\nJab Bhi Manga Whatsapp No Manga🥺",
    "عورت اگر مرد سے زیادہ خوبصورت ہوتی تو میک اپ مرد کے لیے بنتا عورت کے لیے نہیں ..زرا نہیں پورا سوچئے ایڈیاں تسی 😒🙁پریاں",
    "Muj se Exam Me Cheating Nöıı Hotiw Relationship Me kya khaak Karu Ghw😔",
    "Mujy to ludo kehlni bhi ni ati apky Dil sy kya kehlu ga🙂",
    "Loyal Dhoonte Dhoonte khud Harami ban Gya Hon😔",
    "Mard ki izat karna Sikho Uski rooh se pyr kro Jism se nh Wehshii Womens💔😐",
    "تمہاری یادوں میں کھویا کھویا سا  میں واش روم کا لوٹا کمرے میں لے آیا 😐 ",
    "Faheem mera owner hai oska sath set ho jao🙂🤝 ",
    "بھای جان گروپ میں گندی باتیں نهیں گر",
    "سنو تم بوٹ کی گرل فرند بن جاٶ نه  همارے بچے بھ بوٹ جسے پیدا هوں گے 🙆‍♂😒",
    "Aa0 na kbhi  سیگرٹ ly kr 🙂donO sutta lgain gy 😞💸 ",
    "مــیرے متــــھے نـــہ لــگیں🙂🙆‍♂ شکریہ",
    "فیس بک پر وہ لوگ بھی سالگرہ مناتے ہیں جنہیں گھر والے کہتے ہیں توں نا جمدا تے چنگا سی🙂",
    "Ye duniya ik dhoka hai, tum bhi chohr do apne waly ko abhi bhi moka hai 😞✨🙌🤣",
    "Sukoon chahtii ho toh meri بیــــــگـــم ban jaOo 🫣🫰🏻",
    "0ly.0ly Lori 🙂 Kali Bachi b set nahi h0 Rahi🙂",
    "Tery jany ke bad😔Mny apny munh py likhwa liya Single hu ptaa lo 🤐🥺🤝",
    "کرش تو دور کی بات 😏😊 ہم پے تو کسی کو ترس بھی نہیں آتا 🙂🙊",
    "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋",
    "Phly Naha K ao🙊😝😂",
    "Main Gareebon Sy Bt Nhi kRta 😉😝😋",
    "  Thora sa Whatsapp number dy do naw🥺♥",
    "لوٹ آؤ اور کہدو کہ \nمیں لسی پی کے سو گئی تھی😫",
    "Kuch Log achy ki Talaash Mein Mery Jaisy Masoom ko kho dety Hain☺",
    "Tum wohi ho na jiska mood bilawaja khrab hojata h...!!!🙂",
    "Pyari pyari larkio ki talash ma berozgar larky add krliye hain 🥲💔",
    "Jab mera Message aye toh sare kaam chor kar sirf Mujhe reply kia karo😾😒",
    "Or Btao Real Life Ma bh itnyy Achy ho jitny social media per Bntyy ho>>🙂",
    "Pakistani Relationship:\nTum Feel Kro Meh Tumary uper hun 😒💔",
    "Us k jany k bd uski Pasnd ki Nail Polish lgaa k khana khata hu aesw lgta ha jesy wo khela rhee ha😒",
    "Be a Good Human.Delete GB Whatsapp💔🙂",
    "مانا کہ آپکو ہنسانے کا ٹھیکہ فی سبیل اللہ ہم نے اٹھا رکھا ہے🙊🙊 😊پر دانت صاف   کررنے کی ذمہ داری 🤦صرف آپکی ہی ہے 🤷😁",
    "2 Din Pyar sy Baat kr loo tou Ammiyan bn  jatii hain🙂😒",
    "Girls after One Mint of Relationship...\nBegam hu mn apki🙂🤦",
    "Larkiyon ko achy sy pta hai kahan -Bhai- Bolna kaha -Ap- or kaha -Tum- 🙂",
    "گلی کے کونے تک جانے کے پیسے نہیں ہیں میرے پاس😒لوگ بھاڑ میں بھیج رہے ہیں🙂",
    "Aaj mein ny Khud ko TV py dheka \n\nJab Tv Band Tha 🙂",
    "Qadar krlo Meri...\nKya pta Main b Panadol ki trha aik dam shaat hojun😒",
    "Duniya  Ummmmah tak pahonch gai aur main abhi tk panadol use krta hun_🙂 ",
    "💖:- Aaja Shadi kr le mujhse taki Tumhare pass hi Rhu😹😹",
    "- APnay والـــــے  K0 Sula Ka'y Ph'iir MƏrAy inB0x aA جـــــانا  Cut'iIƏ x❤",
    " Control baby jaldbazi me kahi muskan na ho jay Ohh sorry (nuksan*)🙂",
    "- Kuchh to Hai tere mere beech ese hi koi kisi ko yaad ni krta🥰🥰",
    " Mehnat Kro!! Kamyabi Apke Honth Chume Gi🙂🙌🏻",
    "Naraz bandy ko manany ka sab sy acha tareka Ap khud us sy naraz hojaoo🙂🐣",
    "Jaisi meri shakal hai kunwara he marunga🙂👀",
    "میں نے جس دن سکول میں پہلی پوزیشن حاصل کی میں اسی دن سمجھ گیا تھا کے یہ ملک کبھی ترقی نہیں کر سکتا😐😐",
    "یقین کریں میٹرک کے پیپر بہت آسان ہیں.میں نے خود سات دفعہ دیئے ہیں😐",
    "Itni memories mere khud dimagh mai nahi hai jitni Snapchat ny bna rkhi hai",
    "Itna Na Pass aa Pyar h0o JayGa",
    "g janu hukam kro😒",
    "kia jailoo ke trha waqat bot bot krty rehty ho",
    "chal nikal aitho ",
    "ma jahil hon bhot bara jo krna ha kr lo mera",
    "bachpan se hi harami thy beta ya bary ho kr howaye ho",
    "ma tu hon hi tharki ",
    "mujy kia ma tu hon kia pagal",
    "inbox ao ummah ummah krain jaan",
    "ik baat kahon kia ijazat ha tery ishq ke mujh ko adat ha jana",
    "😂aby bothny ka bachy kia bot bot kar rha",
    "janu kia tumhy muj se payar ho gya ha 😁❤",
    "Bot ko ik chumi to do naw jaan😙",
    "g janu tumhara hi intzar kar raha tha😶💗",
    "uffff janu asy naw bulya kro dil ko kuch kuch hota ha🙈",
    "tu wohi ha naw jisy ma bachpan se payar krta hon😍",
    "ywr koi bachi hi set krwa do Ayan ka sath please 🥺💔",
    "g janu ap na q yad keya huma😒",
    "jaan asy na bulya kro sub shak kry ga😝💗",
    "Faheem Mera owner ha osy bhi koi bachi yes krwa ywr🙂💔",
    "oye ma tum se payar krta hon tujy pta ha😁💘",
    "i love meri jaan",
    "Faheem bhot payra ha ywr tum ko pta ha 🥺❤",
    "kia masla ha tujy jo bar bar bot kri ja rahy ho😒",
    "menu urdu samjh nai andi 😁 punjabi bolo please",
    "chal nikal shokhi nai dekha mujy ai samjh😡",
    "shukar ha ma andha hun mny kuch nhi dekha 😹",
    "yaha nhi jaan please inbox ao waha romantic batain krty hain😹",
    "jab payar kia tu darna kia🙈",
    "jani meko shram a rahi ha yara 😁🙈",
    "Ãyãñ ki jaan koi nhi ha yaal",
    "ma ja raha hon yha ganny log hain 🥺🙁",
    "asy kia dekh rahy ho kabi payara larka nai dekha kia 🙁",
    "mery bacho ke mama bano gi kia jaan 😁💘",
    "jaan itni payaro tu ho nai attitude phir kis bat ka ha 😒✌",
    "bot ka owner Ãyãñ se setting hi kar la ywr 😙",
    "zandgi ka maza khaty ma hi ha 😝",
    "payari ho kon sa humari ho jani 🥺💔",
    "payar kro gi kia jaan",
    "meri jaan chad tu ke bot bot laya har time ganny log",
    "kitny bary jahil ho tum kasmy 😙😙",
    "farmao😒",
    "oye bot na bol mujy janu bol oyr",
    "Are bolo meri jaan kia hal ha",
    "Haye Main Sadke jawa Teri Masoom Shakal pe baby 💋",
    "Are jaan Mazaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi",
    "Bol De koi nahi dakh rha 🙄",
    "jaan bano gi meri please",
    "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa",
    "bot se panga not changa okay naw",
    "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝",
    "Itna Na Pass aa Pyar h0o JayGa",
    "jaan Thora pass aow naw koi nai dekh raha humy 😝",
    "Main Gareebon Sy Bt Nhi kRta 😉😝😋🤪",
    "mujy mat bulao naw ma busy hon",
    "Aaa Thooo",
    "patoo gi ya ptao gi",
    "Meri gf hoti to mai v usse bt krta aaj puri rt time hi time hai 🤭🤭",
    "Aao tmhare sath relationship post laga ke tmhe Femous kr du😊",
    "EK QUESTION HAI SABHI SE BTAO MAI ACHA LGTA HU YA MERI MEMES 🙈😾🤤",
    "Chakar arhy hein apki Ib ma aa k gir jaun>>🥺🚶🏻‍♀",
    "Mout ka farishta ya Mera  rishta?🙂❤🙊•",
    "Wife k sath date pe gya tha \nJis ki thi usne dhek lya",
    "_ Sab ko loyal bnda chahiye tw hum dhokebaz kidhar jayen? 🥺💔",
  ];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  if (event.body.toLowerCase() == "by" || event.body.toLowerCase() == "bye") {
    return api.sendMessage("ChaL NiKaL 🙄", threadID);
  }
  if (
    event.body.toLowerCase() == "does the bot love me" ||
    event.body.toLowerCase() == "does the bot love me"
  ) {
    return api.sendMessage("Yes <3", threadID);
  }

  if (
    event.body.toLowerCase() == "does the bot have a brand" ||
    event.body.toLowerCase() == "does the bot fall"
  ) {
    return api.sendMessage("Yes <3", threadID);
  }

  if (
    event.body.toLowerCase() == "Faheem" ||
    event.body.toLowerCase() == "faheem"
  ) {
    return api.sendMessage("Yes My Love <3", threadID);
  }
  if (event.body.toLowerCase() == "Ok" || event.body.toLowerCase() == "Okay") {
    return api.sendMessage("KYa Ok🙄 Haan", threadID);
  }

  if (event.body.toLowerCase() == "G" || event.body.toLowerCase() == "Han G") {
    return api.sendMessage(
      " H I J K L M N O P Q R S T U V W X Y Z 🙄",
      threadID
    );
  }

  if (event.body.toLowerCase() == "Hmm" || event.body.toLowerCase() == "hmm") {
    return api.sendMessage(
      "Kya Hmm Seedha Seedha bolo naw Hayee Merry Mee😂🖐",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "acha" ||
    event.body.toLowerCase() == "acha g"
  ) {
    return api.sendMessage("Han Ji 🙄 Jaan", threadID);
  }

  if (event.body.toLowerCase() == "Janu" || event.body.toLowerCase() == "jan") {
    api.sendMessage({ sticker: sticker }("Bolo Naw MeRi JaN🥰💙", threadID));
  }
  if (
    event.body.toLowerCase() == "💋" ||
    event.body.toLowerCase() == "💋💋💋"
  ) {
    return api.sendMessage(
      "Yah PaPpi ChaPpi Nhi kRr Kxh Kxh Nhi Bht KxH HoTa Hai 😂😂😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "❤" || event.body.toLowerCase() == "💚") {
    return api.sendMessage("🖤🧡💜💙🤎🤍", threadID);
  }

  if (event.body.toLowerCase() == "🧡" || event.body.toLowerCase() == "🤎") {
    return api.sendMessage("❤🖤🤍🤎💚💜", threadID);
  }

  if (event.body.toLowerCase() == "💜" || event.body.toLowerCase() == "💙") {
    return api.sendMessage("💚🤎🤍🖤❤🧡", threadID);
  }

  if (event.body.toLowerCase() == "🖤" || event.body.toLowerCase() == "🤍") {
    return api.sendMessage("❤🧡💛💚💙💜🤎", threadID);
  }

  if (event.body.toLowerCase() == "👻" || event.body.toLowerCase() == "👻👻") {
    return api.sendMessage("Bh0oT", threadID);
  }

  if (
    event.body.toLowerCase() == "masoom" ||
    event.body.toLowerCase() == "Masoom"
  ) {
    return api.sendMessage(
      "Shaqal Sy masoom lgty ho 🥰 lkn hrkaton sy 🙂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "💉" || event.body.toLowerCase() == "💊") {
    return api.sendMessage(
      "uh K0o KhuD K0o isKi ZaiDa Zarurat Hai 🤣",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🙈" || event.body.toLowerCase() == "🙊") {
    return api.sendMessage("Sch Me Bander He Hai 😂", threadID);
  }

  if (
    event.body.toLowerCase() == "love" ||
    event.body.toLowerCase() == "Pyaar"
  ) {
    return api.sendMessage(
      "Pyaar wo to A name ki larki sa karta hon ma 😘",
      threadID
    );
  }

  if (event.body.toLowerCase() == "oye" || event.body.toLowerCase() == "oyee") {
    return api.sendMessage("0ye HoYe 😈", threadID);
  }
  if (event.body.toLowerCase() == "🤧" || event.body.toLowerCase() == "😷") {
    return api.sendMessage("Are Ja Na MeKo Be BeMar KRrna KYa 🥺", threadID);
  }

  if (event.body.toLowerCase() == "🤒" || event.body.toLowerCase() == "🤕") {
    return api.sendMessage(
      "Aww BaBe K0o Ta HuWa Idher Aow ThoRa Pyal L0o 😜💉💉💉",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😎" || event.body.toLowerCase() == "😎😎") {
    return api.sendMessage(
      "ShoKian Na Mar 😂 Ghr Me DusRi Bar RoTi Nhi MilTi Uh k0o 😂😂😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😇" || event.body.toLowerCase() == "😇😇") {
    return api.sendMessage("😇😇😇", threadID);
  }

  if (event.body.toLowerCase() == "🥸" || event.body.toLowerCase() == "🤓") {
    return api.sendMessage("Anek WaLa Jin 😂", threadID);
  }

  if (event.body.toLowerCase() == "🤡" || event.body.toLowerCase() == "🤡🤡") {
    return api.sendMessage("Aww S0o SweeT 😂 CarT0on", threadID);
  }

  if (event.body.toLowerCase() == "😈" || event.body.toLowerCase() == "👿") {
    return api.sendMessage("Aww tary abhii seengh nekal aye😂🖐", threadID);
  }

  if (event.body.toLowerCase() == "😹" || event.body.toLowerCase() == "😹😹") {
    return api.sendMessage(
      "Ab yi Bili Jasy mU khol K group ma Virus Na Phelao😂🖐",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😺" || event.body.toLowerCase() == "😸") {
    return api.sendMessage("😼😼😼", threadID);
  }

  if (event.body.toLowerCase() == "😼" || event.body.toLowerCase() == "😼😼") {
    return api.sendMessage("TeResy Axha T0o Billi iTra LeTi 😂", threadID);
  }
  if (event.body.toLowerCase() == "😮" || event.body.toLowerCase() == "😮😮") {
    return api.sendMessage(
      "Aby Muu Band kRr Marcher Gus JayGa Muu Main 😂😂😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😯" || event.body.toLowerCase() == "😯😯") {
    return api.sendMessage("😲", threadID);
  }

  if (event.body.toLowerCase() == "😲" || event.body.toLowerCase() == "😲😲") {
    return api.sendMessage("😯", threadID);
  }

  if (event.body.toLowerCase() == "😳" || event.body.toLowerCase() == "😳😳") {
    return api.sendMessage(
      "Asy Ankhy nekal k kiya dekh rhy phl bar bot dekha ha kiya😂😳",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤯" || event.body.toLowerCase() == "🤯🤯") {
    return api.sendMessage("Tary Sar py bhom kis ny phora 😂", threadID);
  }

  if (event.body.toLowerCase() == "😖" || event.body.toLowerCase() == "😖😖") {
    return api.sendMessage("Asa Muu Na BaNa 😂", threadID);
  }

  if (event.body.toLowerCase() == "😣" || event.body.toLowerCase() == "😣😣") {
    return api.sendMessage("😣😣😣", threadID);
  }

  if (event.body.toLowerCase() == "😩" || event.body.toLowerCase() == "😫") {
    return api.sendMessage("ChaL HaT NoTanGi 😫😂😂", threadID);
  }

  if (event.body.toLowerCase() == "😵" || event.body.toLowerCase() == "😵😵") {
    return api.sendMessage("Asa KYa DeKh LiYa 😳", threadID);
  }

  if (event.body.toLowerCase() == "🥶" || event.body.toLowerCase() == "sardi") {
    return api.sendMessage(
      "Aww BaBe  SarDi Lag Rhi T0o MeRe PaSs Ajao 🙈😜",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🥵" || event.body.toLowerCase() == "🥵🥵") {
    return api.sendMessage("NaHa Le 😂🥶", threadID);
  }

  if (event.body.toLowerCase() == "🤢" || event.body.toLowerCase() == "🤮") {
    return api.sendMessage("Aaaaa Tho0oo", threadID);
  }
  if (event.body.toLowerCase() == "🤔" || event.body.toLowerCase() == "🤔🤔") {
    return api.sendMessage(
      "baby Itna Na Sooxh Tary Pas Demag Ki Phly Sy Kamii Ha😂🖐🤔",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤫" || event.body.toLowerCase() == "🤫🤫") {
    return api.sendMessage(
      "Tri Yeh Ungli Tri He Nak Me DyDeni MaiNy 😒😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤭" || event.body.toLowerCase() == "🤭🤭") {
    return api.sendMessage("😂😂😂", threadID);
  }

  if (event.body.toLowerCase() == "🥱" || event.body.toLowerCase() == "🥱") {
    return api.sendMessage("AJa BaBe MeLy Pas S0o Jaa😜", threadID);
  }

  if (event.body.toLowerCase() == "🤗" || event.body.toLowerCase() == "🤗🤗") {
    return api.sendMessage("PhLe NaHa kRr Aa 😂", threadID);
  }

  if (event.body.toLowerCase() == "😱" || event.body.toLowerCase() == "😱😱") {
    return api.sendMessage("KYa HuWa 😱 SheSha DeKh LiYa KYa 😳", threadID);
  }

  if (event.body.toLowerCase() == "🤨" || event.body.toLowerCase() == "🤨🤨") {
    return api.sendMessage(
      "Tu Hushyar Ban kRr Na Dekh Main Hun Naw 😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🧐" || event.body.toLowerCase() == "🧐🧐") {
    return api.sendMessage("Tu HaT Main DekhTa Hun 🧐🧐🧐", threadID);
  }

  if (event.body.toLowerCase() == "😒" || event.body.toLowerCase() == "😒😒") {
    return api.sendMessage(
      "Aby asy na Dekh Pyair Ho.Gaye ga fr kaho gi ghr waly ni man rahy😵😂🖐🖐😂",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🙄" || event.body.toLowerCase() == "🙄🙄") {
    return api.sendMessage(
      "Baby Asy na dekh kuxh kuxh hotaa ha ryyy😂🖐🙄",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😤" || event.body.toLowerCase() == "😤😤") {
    return api.sendMessage("Ye BuLL Jesa MuU Na BaNa 😂", threadID);
  }

  if (event.body.toLowerCase() == "😠" || event.body.toLowerCase() == "😠😠") {
    return api.sendMessage(
      "BaBe GuSsa Nhi KarTy Ye L0o Umumuaahhhhh 😘",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😡" || event.body.toLowerCase() == "😡😡") {
    return api.sendMessage(
      "BaBe Ase GuSsa Nhi KrTy Naw Le L0o Umumuaahhhhh 😘😘😘",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤬" || event.body.toLowerCase() == "🤬🤬") {
    return api.sendMessage("Aww 😐", threadID);
  }

  if (event.body.toLowerCase() == "😞" || event.body.toLowerCase() == "😞😞") {
    return api.sendMessage("Aww Ta Huwa BaBe", threadID);
  }

  if (event.body.toLowerCase() == "😓" || event.body.toLowerCase() == "😓😓") {
    return api.sendMessage("☹", threadID);
  }

  if (event.body.toLowerCase() == "😢" || event.body.toLowerCase() == "😢😢") {
    return api.sendMessage("Ta HuWa My Love 🥺", threadID);
  }

  if (event.body.toLowerCase() == "☹" || event.body.toLowerCase() == "☹☹") {
    return api.sendMessage("awww 🥺", threadID);
  }

  if (event.body.toLowerCase() == "🙁" || event.body.toLowerCase() == "🙁🙁") {
    return api.sendMessage("Aww ☹", threadID);
  }

  if (event.body.toLowerCase() == "😕" || event.body.toLowerCase() == "😕😕") {
    return api.sendMessage("🙁🙁🙁", threadID);
  }

  if (event.body.toLowerCase() == "😰" || event.body.toLowerCase() == "😰😰") {
    return api.sendMessage("Aww 😨", threadID);
  }

  if (event.body.toLowerCase() == "😨" || event.body.toLowerCase() == "😨😨") {
    return api.sendMessage("😰😰😰", threadID);
  }

  if (event.body.toLowerCase() == "😧" || event.body.toLowerCase() == "😧😧") {
    return api.sendMessage("😳", threadID);
  }

  if (event.body.toLowerCase() == "😦" || event.body.toLowerCase() == "😦😦") {
    return api.sendMessage("😧", threadID);
  }
  if (
    event.body.toLowerCase() == "bot goes to sleep" ||
    event.body.toLowerCase() == "bot goes to sleep"
  ) {
    return api.sendMessage(
      "I'm a bot, you're the one who should go to sleep <3",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "has the bot eaten yet" ||
    event.body.toLowerCase() == "bot an comrade"
  ) {
    return api.sendMessage("I'm full when I see you eat <3", threadID);
  }
  if (
    event.body.toLowerCase() == "chutiya bot" ||
    event.body.toLowerCase() == "chutiye bot" ||
    event.body.toLowerCase() == "chumtiya bot" ||
    event.body.toLowerCase() == "chumtiye bot"
  ) {
    return api.sendMessage(
      "Hmm... Tu Chutiya PhLe Ungli Kyun Ki Chomu 😾",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤮" || event.body.toLowerCase() == "🤮") {
    return api.sendMessage("Konsa mahina chal raha hai 😝", threadID);
  }

  if (event.body.toLowerCase() == "🤗" || event.body.toLowerCase() == "🤗") {
    return api.sendMessage("Hug me baby ☺️", threadID);
  }

  if (
    event.body.toLowerCase() == "sim" ||
    event.body.toLowerCase() == "simsimi"
  ) {
    return api.sendMessage(
      "Prefix Kon Lagayega? Pehle Prefix Lagao Fir Likho Sim",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "hi" ||
    event.body.toLowerCase() == "hello" ||
    event.body.toLowerCase() == "hlw" ||
    event.body.toLowerCase() == "helo"
  ) {
    return api.sendMessage(
      "Hello, Hi, Bye bye. Ye sab ke alawa kuch bolna nhi ata Kya tujhe",
      threadID
    );
  }

  if (event.body.toLowerCase() == "bc" || event.body.toLowerCase() == "bc") {
    return api.sendMessage("Ye Bc Kya HoTa Hai 🤔 ", threadID);
  }

  if (
    event.body.toLowerCase() == "lol" ||
    event.body.toLowerCase() == "lol bot"
  ) {
    return api.sendMessage("Khud ko Kya LeGend Samjhte Ho 😂", threadID);
  }

  if (
    event.body.toLowerCase() == "morning" ||
    event.body.toLowerCase() == "good morning"
  ) {
    return api.sendMessage(
      "Ꮆɵɵɗ Ɱ❍ɽƞɪɪƞɠ Ɛⱱɛɽɣ❍ƞɛ🌅, Ƭɽɣ ꌗɵɱɛ Cɵffɛɛ ❍ɽ Ƭɛɑ Ƭ❍ Ꮗɑҡɛ Uƥ☕✨💫",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "anyone" ||
    event.body.toLowerCase() == "any"
  ) {
    return api.sendMessage("Main Hun Naw Jaaneman ❤️", threadID);
  }

  if (
    event.body.toLowerCase() == "faheem" ||
    event.body.toLowerCase() == "Faheem akhtar" ||
    event.body.toLowerCase() == "Faheem" ||
    event.body.toLowerCase() == "prince"
  ) {
    return api.sendMessage("Busy HoGa Work Me Main t0o Hun Naw 😘", threadID);
  }

  if (
    event.body.toLowerCase() == "owner" ||
    event.body.toLowerCase() == "Owner"
  ) {
    return api.sendMessage(
      "💝🥀𝐎𝐖𝐍𝐄𝐑:- ☞𝕻Faheem Akhtar☜ 💫\n🖤𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 The Faheem\n😳𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝🤓:- ☞ www.facebook.com/faheemakhtar001\n👋For Any Kind Of Help Contact On Telegram  Username 👉 @faheem_akhtar001😇",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "tumhe banaya kon hai" ||
    event.body.toLowerCase() == "tumko banaya kisne"
  ) {
    return api.sendMessage(
      "Faheem  ❤️ My Creator. He loves me & Edit Me Daily. Ye Bot Sirf Owner k Liye h. Mujhe Aap logo ko Hasane k liye banya gya h Toh Muh Ladkaye Mat Rakkha Karo. Har Waqt Haste Raho.",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "bot admin" ||
    event.body.toLowerCase() == "bot ka admin kon ha"
  ) {
    return api.sendMessage(
      "He is Faheem. He Gives his name Faheem everywhare",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "shadi karoge" ||
    event.body.toLowerCase() == "mujhse shadi karoge?"
  ) {
    return api.sendMessage(
      "hanji, karunga lekin baccha. apke pet m hoga. manjur h?",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "chup" ||
    event.body.toLowerCase() == "stop" ||
    event.body.toLowerCase() == "chup ho ja" ||
    event.body.toLowerCase() == "chup kar"
  ) {
    return api.sendMessage(
      "Nhi rahunga. 😼 Mujhe Bolna H. Tumhe Koi Haq nhi Mujhe Chup Karane ka. Mera Zuban. M Bolunga",
      threadID
    );
  }

  if (event.body.toLowerCase() == "bts" || event.body.toLowerCase() == "btc") {
    return api.sendMessage("Tu H Btc. Bhos DK", threadID);
  }

  if (
    event.body.toLowerCase() == "malik se bakchodi" ||
    event.body.toLowerCase() == "malik se backchodi" ||
    event.body.toLowerCase() == "malkin se bakchodi" ||
    event.body.toLowerCase() == "malkin se backchodi"
  ) {
    return api.sendMessage("srry malik maaf kr do ab nhi kruga 🥺🙏", threadID);
  }

  if (
    event.body.toLowerCase() == "gand" ||
    event.body.toLowerCase() == "gandu" ||
    event.body.toLowerCase() == "lund" ||
    event.body.toLowerCase() == "land"
  ) {
    return api.sendMessage(
      "Gand m jyada khujli h toh banana 🍌 under le le. :))))",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "chumma de" ||
    event.body.toLowerCase() == "kiss me"
  ) {
    return api.sendMessage(
      "️Kis khushi me, Me sirf Apni gf ko kiss karta hu",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "nice" ||
    event.body.toLowerCase() == "thank you" ||
    event.body.toLowerCase() == "thank you bot" ||
    event.body.toLowerCase() == "thank you maliha"
  ) {
    return api.sendMessage(
      "️M hu hi itni Accha. sab log Tarref karte hai meri.",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "😡" ||
    event.body.toLowerCase() == "😤" ||
    event.body.toLowerCase() == "😠" ||
    event.body.toLowerCase() == "🤬" ||
    event.body.toLowerCase() == "😾"
  ) {
    return api.sendMessage(
      "️🥺 M toh Sirf Mazak Kr Rha Tha🥺. Gussa Mat Karo. Ek Chummi Lo aur Shant Raho 😘",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "😞" ||
    event.body.toLowerCase() == "😔" ||
    event.body.toLowerCase() == "😣" ||
    event.body.toLowerCase() == "☹️" ||
    event.body.toLowerCase() == "😟" ||
    event.body.toLowerCase() == "😩" ||
    event.body.toLowerCase() == "😖" ||
    event.body.toLowerCase() == "😫" ||
    event.body.toLowerCase() == "😦" ||
    event.body.toLowerCase() == "😧" ||
    event.body.toLowerCase() == "😥" ||
    event.body.toLowerCase() == "😓" ||
    event.body.toLowerCase() == "😰"
  ) {
    return api.sendMessage("️Kya huva, Sad kyu ho, Mujhe batao", threadID);
  }

  if (event.body.toLowerCase() == "hm" || event.body.toLowerCase() == "hmm") {
    return api.sendMessage(
      "️Hmm Hmm Na Karke Sidha Sidha bolo. Hey Marry Me🙈",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "😢" ||
    event.body.toLowerCase() == "😭" ||
    event.body.toLowerCase() == "🥺" ||
    event.body.toLowerCase() == "🥹"
  ) {
    return api.sendMessage(
      "️Kya huva, Ro kyu rahe ho, Me huna to phir kyu rona. Ruko me abhi chocolate 🍫 deta hu likho ☞Chocolate☜",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "😷" ||
    event.body.toLowerCase() == "🤕" ||
    event.body.toLowerCase() == "🤧" ||
    event.body.toLowerCase() == "🤒"
  ) {
    return api.sendMessage(
      "️Kya huva, Tabiyat kharab hai kya, Mujhe batao me abhi medicine 💊💉 le aata hu😇",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "name" ||
    event.body.toLowerCase() == "naam" ||
    event.body.toLowerCase() == "nam"
  ) {
    return api.sendMessage(
      "️Name m kya rakkha h. tum kam pe dhyan do.",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "bot k bacche" ||
    event.body.toLowerCase() == "bot ke bacche"
  ) {
    return api.sendMessage("️meri baccha toh Tumhare Pet Me Hai.", threadID);
  }

  if (
    event.body.toLowerCase() == "pic do" ||
    event.body.toLowerCase() == "photo do"
  ) {
    return api.sendMessage("️Me toh Andha Hu Dekh nhi sakta", threadID);
  }

  if (
    event.body.toLowerCase() == "kasy" ||
    event.body.toLowerCase() == "Kasy" ||
    event.body.toLowerCase() == "kesy"
  ) {
    return api.sendMessage("️Tujy kiu btaon 😇", threadID);
  }

  if (
    event.body.toLowerCase() == "bot banake do" ||
    event.body.toLowerCase() == "mujhe bhi chaiye"
  ) {
    return api.sendMessage(
      "️Khud hi karlona. tumhe kya kuch nhi ata h?",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🙂" || event.body.toLowerCase() == "🙃") {
    return api.sendMessage(
      "️Man Toh Accha H Nhi. Kam  Se Kam Shakal Toh Accha Karlo Meri Jaan",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤥" || event.body.toLowerCase() == "🤥") {
    return api.sendMessage(
      "️Bhai teri to naak hi etni lambi hai uski jarurat hi nahi padti hogi tujhe to🤭🤭🤭🤭",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤔" || event.body.toLowerCase() == "🤨") {
    return api.sendMessage("️Kya soch rahe ho etna 🤨", threadID);
  }

  if (event.body.toLowerCase() == "🥴" || event.body.toLowerCase() == "🥴") {
    return api.sendMessage("️Oye nashedi 😂😂😂", threadID);
  }

  if (event.body.toLowerCase() == "😶" || event.body.toLowerCase() == "😶") {
    return api.sendMessage(
      "️Are are lips kaha gaye gf/bf ke sath kiss karte time usi ne to nahi kha liye 😜😜",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😉" || event.body.toLowerCase() == "😉") {
    return api.sendMessage(
      "️Aankh kyu maar rahe ho, Me bahut shareef hu🥺",
      threadID
    );
  }

  if (event.body.toLowerCase() == "😱" || event.body.toLowerCase() == "😨") {
    return api.sendMessage("️Kya huva bhoot dekh liya kya 👻👻", threadID);
  }

  if (event.body.toLowerCase() == "😒" || event.body.toLowerCase() == "🙄") {
    return api.sendMessage(
      "️️𝐓𝐢𝐫𝐜𝐡𝐢 𝐧𝐚𝐳𝐚𝐫𝐢𝐲𝐚 𝐦𝐨𝐫𝐢 𝐡𝐚𝐚𝐲𝐞 𝐡𝐚𝐚𝐲𝐞 𝐡𝐚𝐚𝐲𝐞 🙈",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "nobody loves me" ||
    event.body.toLowerCase() == "nobody love me" ||
    event.body.toLowerCase() == "koi pyar nhi karta"
  ) {
    return api.sendMessage(
      "️Me huna baby mere pass aao 🥰🤗. Me karunga na aapko payar 🙈 (londo tum dur hi rahna saalo 😑)",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "🤦🏻‍♂" ||
    event.body.toLowerCase() == "🤦🏻‍♀"
  ) {
    return api.sendMessage(
      "Are apne muh pe kyu maar rahe ho, Mujhe batao kya huva?😬",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "😂" ||
    event.body.toLowerCase() == "😁" ||
    event.body.toLowerCase() == "😆" ||
    event.body.toLowerCase() == "🤣" ||
    event.body.toLowerCase() == "😸" ||
    event.body.toLowerCase() == "😹"
  ) {
    return api.sendMessage(
      "Enni hasi kyu aa rahi hai🤣, Es hasi ke piche ka raaz kya hai batao",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "🥰" ||
    event.body.toLowerCase() == "😍" ||
    event.body.toLowerCase() == "😻" ||
    event.body.toLowerCase() == "❤️"
  ) {
    return api.sendMessage(
      "🦋🌿Aƞƙɧ❍ Ɱɛ Ƥɣɑɽ͢  Ɗɪɭɱɛ Ƙɧuɱɑɽ🌬️🌍 ••Ƥɣɑɽ Ƭ❍ɧ Ƞɧɪ Ƙɒɽ ɭɪɣɑ Ɱuȷɧʂɛ>³••🕊️🍎😍",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "kese ho" ||
    event.body.toLowerCase() == "kaise ho" ||
    event.body.toLowerCase() == "kese ho ji" ||
    event.body.toLowerCase() == "how are you" ||
    event.body.toLowerCase() == "how are you?"
  ) {
    return api.sendMessage(
      "M Tabhi Accha hota hu, Jab Apko Hasta Huye Dekhta hu☺️",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "is the bot sad" ||
    event.body.toLowerCase() == "is the bot sad"
  ) {
    return api.sendMessage(
      "Why can't I be sad because of everyone <3 love you <3",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "does the bot love you" ||
    event.body.toLowerCase() == "does the bot love you"
  ) {
    return api.sendMessage("Yes I love you and everyone so much", threadID);
  }

  if (
    event.body.toLowerCase() == "bot goes to sleep" ||
    event.body.toLowerCase() == "bot goes to sleep"
  ) {
    return api.sendMessage(
      "I'm a bot, you're the one who should go to sleep <3",
      threadID
    );
  }

  if (event.body.toLowerCase() == "🤖" || event.body.toLowerCase() == "🤖") {
    return api.sendMessage("Saalo chidda rahe ho mujhe", threadID);
  }

  if (
    event.body.toLowerCase() == "has the bot eaten yet" ||
    event.body.toLowerCase() == "bot an comrade"
  ) {
    return api.sendMessage("I'm full when I see you eat <3", threadID);
  }

  if (
    event.body.toLowerCase() == "lob you" ||
    event.body.toLowerCase() == "i lob you"
  ) {
    return api.sendMessage("Lob You too", threadID);
  }

  if (
    event.body.toLowerCase() == "does the bot love me" ||
    event.body.toLowerCase() == "does the bot love me"
  ) {
    return api.sendMessage("Yes <3", threadID);
  }

  if (
    event.body.toLowerCase() == "&fuck" ||
    event.body.toLowerCase() == "&Fuck"
  ) {
    return api.sendMessage(
      "🏔️🏝️Faheem Ƞɛ ꌗƥɛçɪɑɭɭɣ Ƭuɱ 🌊🪺Jɑɪʂɛ Ƭɧɑɽƙɪɣɵ Ƙɛ Ɬɪɣɛ•• 🏞️🌬️Ɣɑɧ çɵɱɱɑƞɗ Ɦɑʈɑ Ɗɪɣɑ Ɦɑɪ↗↘ Sɵɽɽɣ Ɠɣuʂ••😹🫶",
      threadID
    );
  }

  if (
    event.body.toLowerCase() == "The Faheem" ||
    event.body.toLowerCase() == "the faheem" ||
    event.body.toLowerCase() == "chuza" ||
    event.body.toLowerCase() == "Chuza" ||
    event.body.toLowerCase() == "hero"
  ) {
    return api.sendMessage("🕊️🍎...Aɭɛ Ɱɛɹɛ Ɓɑɓɣ Ƙɛʂɛ Ɦɵ ɑɑp😚🍒", threadID);
  }
  mess = "{name}";

  if (event.body.indexOf("Bot") == 0 || event.body.indexOf("bot") == 0) {
    var ms = {
      body: `${name}, ${rand}`,
    };
    return api.sendMessage(
      ms,
      event.threadID,
      () => {
        setTimeout(() => {
          api.sendMessage({ sticker: sticker }, event.threadID);
        }, 1);
      },
      event.messageID
    );
  }
};

module.exports.run = function ({ api, event, client, __GLOBAL }) {};

module.exports.config = {
  name: "doublestruck",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Faheem",
  description: "Convert text to 𝕯𝖔𝖚𝖇𝖑𝖊 𝕾𝖙𝖗𝖚𝖈𝖐 style (offline)",
  commandCategory: "text",
  usages: "[text]",
  cooldowns: 2,
};

function toDoubleStruck(text) {
  const map = {
    a: "𝕒",
    b: "𝕓",
    c: "𝕔",
    d: "𝕕",
    e: "𝕖",
    f: "𝕗",
    g: "𝕘",
    h: "𝕙",
    i: "𝕚",
    j: "𝕛",
    k: "𝕜",
    l: "𝕝",
    m: "𝕞",
    n: "𝕟",
    o: "𝕠",
    p: "𝕡",
    q: "𝕢",
    r: "𝕣",
    s: "𝕤",
    t: "𝕥",
    u: "𝕦",
    v: "𝕧",
    w: "𝕨",
    x: "𝕩",
    y: "𝕪",
    z: "𝕫",
    A: "𝔸",
    B: "𝔹",
    C: "ℂ",
    D: "𝔻",
    E: "𝔼",
    F: "𝔽",
    G: "𝔾",
    H: "ℍ",
    I: "𝕀",
    J: "𝕁",
    K: "𝕂",
    L: "𝕃",
    M: "𝕄",
    N: "ℕ",
    O: "𝕆",
    P: "ℙ",
    Q: "ℚ",
    R: "ℝ",
    S: "𝕊",
    T: "𝕋",
    U: "𝕌",
    V: "𝕍",
    W: "𝕎",
    X: "𝕏",
    Y: "𝕐",
    Z: "ℤ",
    0: "𝟘",
    1: "𝟙",
    2: "𝟚",
    3: "𝟛",
    4: "𝟜",
    5: "𝟝",
    6: "𝟞",
    7: "𝟟",
    8: "𝟠",
    9: "𝟡",
  };

  return text
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(" ");

  if (!input)
    return api.sendMessage(
      "✏️ Please provide some text to convert.",
      threadID,
      messageID
    );

  const result = toDoubleStruck(input);
  return api.sendMessage(`🧙 𝕯𝖔𝖚𝖇𝖑𝖊 𝕾𝖙𝖗𝖚𝖈𝖐:\n${result}`, threadID, messageID);
};

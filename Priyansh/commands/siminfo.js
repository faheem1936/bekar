const axios = require("axios");

module.exports.config = {
  name: "siminfo",
  version: "1.1.1",
  hasPermission: 0,
  credits: "Faheem Akhtar",
  description: "Search SIM data using phone number or CNIC",
  commandCategory: "tools",
  usages: "[phone number or CNIC]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const query = args[0];

  if (!query || (!/^03\d{9}$/.test(query) && !/^\d{13}$/.test(query))) {
    return api.sendMessage(
      "📱 Please enter a valid phone number or CNIC:\n\nExample:\n.siminfo 03001234567\n.siminfo 3740543628909",
      event.threadID,
      event.messageID
    );
  }

  const isCNIC = /^\d{13}$/.test(query); // check if input is a CNIC
  const url = `https://pakdatabase.site/api/search.php?username=Kami&password=123456&search_term=${encodeURIComponent(query)}`;

  try {
    const res = await axios.get(url);
    const data = res.data;

    if (!data || typeof data !== 'object') {
      return api.sendMessage("❌ No data found for this query.", event.threadID, event.messageID);
    }

    let found = 0;
    const numbers = new Set();
    let msg = `🔍 SIM Information:\n━━━━━━━━━━━━━━━\n`;

    for (const network in data) {
      const records = data[network];
      if (Array.isArray(records)) {
        for (const entry of records) {
          const mobile = entry.Mobile || entry.SUB_NO || '';
          if (!mobile || numbers.has(mobile)) continue;

          numbers.add(mobile);
          found++;

          const name = entry.Name || entry.NAME || 'Unknown';
          const cnic = entry.CNIC || entry.NIC || 'Unknown';
          const address = entry.Address || entry.ADDRESS || 'Unknown';
          const status = entry.Status || entry.STATUS || 'Unknown';
          const networkName = network || 'Unknown';

          msg += `📞 Number: ${mobile}\n`;
          msg += `👤 Name: ${name}\n`;
          msg += `🆔 CNIC: ${cnic}\n`;
          msg += `🏠 Address: ${address.trim()}\n`;
          msg += `📡 Network: ${networkName}\n`;
          msg += `📶 Status: ${status}\n`;
          msg += `━━━━━━━━━━━━━━━\n`;

          if (isCNIC && found >= 5) break; // limit to 5 records if CNIC search
        }
      }
      if (isCNIC && found >= 5) break;
    }

    if (found === 0) {
      return api.sendMessage("❌ No records found for this query.", event.threadID, event.messageID);
    }

    return api.sendMessage(msg.trim(), event.threadID, event.messageID);
  } catch (error) {
    console.error("siminfo error:", error.message || error);
    return api.sendMessage("⚠️ Failed to fetch data from the server.", event.threadID, event.messageID);
  }
};

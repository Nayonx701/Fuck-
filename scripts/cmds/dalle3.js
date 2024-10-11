const axios = require('axios');
const { getStreamFromURL } = global.utils;
function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports = {
  config: {
    name: "bing",
    aliases: ["dalle"],
    version: "2.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    description: {
      en: "𝗟𝗮𝘁𝗲𝘀𝘁 𝗗𝗔𝗟𝗟·𝗘 3 𝗶𝗺𝗮𝗴𝗲 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗼𝗿",
    },
    guide: {
      en: "{pn}" + formatFont(" [prompt]"),
    },
    category: "𝗕𝗜𝗡𝗚",
  }, 
  onStart: async function ({ message, event, api, args }) {
    const q = args.join(" ");
        const permission = global.GoatBot.config.vipUser;
    if (!permission.includes(event.senderID)) {
      api.sendMessage(q, event.threadID, event.messageID);
      return;
    }
    try {
      if (args.length === 0) {
        await message.reply(formatFont("⚠ | Please provide a prompt."));
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = [
"1mZViZfZlrNkqpw17oeYMcWw6b_06OQveTQrZC14XjnJLda3MusRqK2jzI__bPdY25MTdxxMEa8Z_-De1TU6NbGjZ8N8Od9wvdBzYxFgM7_YdnQmkdI0p4rToKGFtCOVzmGzIPHFpI6OpkkPhxKBPwZCTMFzqOfbms3bw9r1Ypq8JRiGkvoaIxh2ELTQ0KUTHWEz9-yefb79hRcS4x1d55g"
]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `${global.api.rubish}/dalle?prompt=${encodedPrompt}&cookie=${randomCookie}&apiKey=${apiKey}`;

      const startTime = Date.now();
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
      const processingMessage = await message.reply(formatFont(`
⏳ | Processing your imagination

❏ Prompt: ${prompt}

❏ Please wait a few seconds...`));

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply(formatFont("⚠ | Invalid API key. Please check your API key and try again."));
        } else {
          api.setMessageReaction("💔", event.messageID, (err) => {}, true);
          await message.reply(formatFont(`
⭕ | No images found for the 

❏ prompt: ${prompt}. 

❏ Please try again.`));
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      await message.reply({
        body: formatFont(`
✅ | Here are the images for..

❏ Prompt: "${prompt}" 

❏ Processing Time: ${processingTimeInSeconds}s`),
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply(formatFont("⚠ | Unauthorized your API key \n\nContact with Rubish for a new apikey"));
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply(formatFont("⚠ | This prompt has been blocked by Bing. Please try again with another prompt."));
        } else if (typeof responseData === 'object') {
          const errorMessages = formatFont(Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n'));
          await message.reply(formatFont(`⚠ | Server error details:\n\n${errorMessages}`));
        } else if (error.response.status === 404) {
          await message.reply(formatFont("⚠ | The DALL·E 3 API endpoint was not found. Please check the API URL."));
        } else {
          await message.reply(formatFont(`⚠ | Rubish dalle -3 server busy now\n\nPlease try again later`));
        }
      } else {
        await message.reply(formatFont("⚠ | An unexpected error occurred. Please try again later."));
      }
    }
  }
};

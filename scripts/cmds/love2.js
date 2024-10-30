module.exports = {
  config: {
    name: "love2",
    version: "1.1",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    description: {
      en: "Only for my love"
    },
    category: "𝗟𝗢𝗩𝗘",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, args, api }) {
        const fuck = args.join(' ') || "I LOVE YOU 2_☠🕊";

    const permission = global.GoatBot.config.orgDEV;

    if(!permission.includes(event.senderID)) {
      api.sendMessage(fuck, event.threadID, event.messageID);
      return;
    }else if(permission.includes(event.senderID)) {

    const x = await message.reply("🥺🫶");

    async function editWithDelay(uid, text, delay) {
      await new Promise(resolve => setTimeout(resolve, delay * 700));
      await api.editMessage(uid, text);
    }

    await editWithDelay(x.messageID, "I", 1);
    await editWithDelay(x.messageID, "Love", 1.5);
    await editWithDelay(x.messageID, "You", 1.9);
    await message.unsend(x.messageID);

    const y = await message.reply("✨Ｉ <😙🫶");

    await editWithDelay(y.messageID, "👈🏻", 1);
    await editWithDelay(y.messageID, "👉🏻", 1.4);
    await editWithDelay(y.messageID, "👇🏻", 1.9);

    await new Promise(resolve => setTimeout(resolve, 1200));
    await message.unsend(y.messageID);

    const a = await message.reply("👻 𝙻𝙾𝚅𝙴 <🤗🫶");

    await editWithDelay(a.messageID, "👈🏻", 1);
    await editWithDelay(a.messageID, "👉🏻", 1.4);
    await editWithDelay(a.messageID, "👇🏻", 1.9);

    await new Promise(resolve => setTimeout(resolve, 1300));
    await message.unsend(a.messageID);

    const z = await message.reply("🖤˜”°•✩•°”˜ 𝚈𝙾𝚄 ˜”°•✩•°”˜🤍");
    await editWithDelay(z.messageID, "👉", 1);
    await editWithDelay(z.messageID, "👈", 1.4);
    await editWithDelay(z.messageID, "☝", 1.9);

    await new Promise(resolve => setTimeout(resolve, 1800));
    await message.unsend(z.messageID);

    const l = await message.reply("✨🖤 ✧˚·̩̩̥͙˚̩̥̩̥·̩̩̥͙✧·̩̩̥͙˚̩̥̩̥˚·̩̩̥͙✧  𝑨𝑺𝑰𝑭  ✧˚·̩̩̥͙˚̩̥̩̥·̩̩̥͙✧·̩̩̥͙˚̩̥̩̥˚·̩̩̥͙✧ 🤍✨");

    await editWithDelay(l.messageID, "👉", 1);
    await editWithDelay(l.messageID, "👈", 1.4);
    await editWithDelay(l.messageID, "☝", 1.9);

    await new Promise(resolve => setTimeout(resolve, 2300));
    await message.unsend(l.messageID);

    const m = await message.reply("_🌸🌸 𝒲𝒾𝓁𝓁  🌸🌸_");

    await editWithDelay(m.messageID, "👉", 1);
    await editWithDelay(m.messageID, "👈", 1.4);
    await editWithDelay(m.messageID, "☝", 1.9);

    await new Promise(resolve => setTimeout(resolve, 2200));
    await message.unsend(m.messageID);

    const n = await message.reply("😙˜”°•✩•°”˜ 𝓨𝓞𝓤 ˜”°•✩•°”˜😗");

    await editWithDelay(n.messageID, "👉", 1);
    await editWithDelay(n.messageID, "👈", 1.4);
    await editWithDelay(n.messageID, "☝", 1.9);

    await new Promise(resolve => setTimeout(resolve, 2300));
    await message.unsend(n.messageID);

    const o = await message.reply("🌸🌸⚞𝙼⚟⚞𝙰⚟⚞𝚁⚟⚞𝚁⚟⚞𝚈⚟🌸🌸");

    await editWithDelay(o.messageID, "👉", 1);
    await editWithDelay(o.messageID, "👈", 1.4);
    await editWithDelay(o.messageID, "☝", 1.9);

    await new Promise(resolve => setTimeout(resolve, 2300));
    await message.unsend(o.messageID);

    await message.reply("🥺🥺✧･ﾟ: ✧･ﾟ: ╰┈► ❝𝐌𝐄❞ ◄┈╯:･ﾟ✧:･ﾟ✧🥺🥺");

    } else {
     console.log("⚠ | Fuck You I Got Error")
    }
  }
};

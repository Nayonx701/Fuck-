const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
    config: {
        name: "wish2",
        aliases: ["bwish2"],
        version: "1.0",
        author: "RUBISH",
        countDown: 5,
        role: 0,
        shortDescription: "Wish your friend ",
        longDescription: "",
        category: "Entertainment",
        guide: {
            vi: "{pn} [@tag someone]",
            en: "{pn} [@tag someone]"
        }
    },

    onStart: async function ({ message, args, api, event }) {
        const mention = event.mentions;
        if (!mention) return message.reply("⚠️ | please mention someone");

        const mentionedUserId = Object.keys(mention)[0] || event.messageReply.senderID;

        try {
            const mentionedUser = await api.getUserInfo(mentionedUserId);

            if (mentionedUser && mentionedUser[mentionedUserId]) {
                const userName = mentionedUser[mentionedUserId].name;
                const currentDate = moment().tz("Asia/Dhaka").format("DD-MM-YYYY");
                const currentTime = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
              const ae = [`💚 Happy birthday ❤`,`💛 Happy download day 💜`];
                bal(mentionedUserId).then(ptth => {
                    message.reply({
                         body: `${ae[Math.floor(Math.random() * ae.length)]}\n${userName}`, mentions: [{
            tag: `${userName}`,
            id: mentionedUserId
        }], 
       attachment: fs.createReadStream(ptth)
                    });
                });
            } else {
                message.reply("⚠️ | please mention someone");
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
            message.reply("Error fetching user information.");
        }
    }
};

async function bal(mentionedUserId) {
    let avMentionedUser = await jimp.read(`https://graph.facebook.com/${mentionedUserId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
    avMentionedUser.circle();
    let pth = `${__dirname}/tmp/wish2.jpg`;
    let img = await jimp.read("https://i.imgur.com/jcaedO6.jpg");
    img.resize(1280,1200).composite(avMentionedUser.resize(675, 640), 655, 4);

    await img.writeAsync(pth);
    return pth;
}

const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "NTKhang",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const authorName = " 𝐍𝐀𝐘𝐎𝐍 ";
		const ownAge = "『 𝟏𝟔 』";
		const authorFB = "𝒉𝒕𝒕𝒑𝒔://𝒘𝒘𝒘.𝒇𝒂𝒄𝒆𝒃𝒐𝒐𝒌.𝒄𝒐𝒎/𝑵𝒂𝒚𝒐𝒏𝒙234 ";
		const authorNumber = "_0623272414";
		const Status = "𝐒𝐈𝐍𝐆𝐋𝐄";
		const urls = [
"https://i.imgur.com/h7UapF5.jpeg",
"https://i.imgur.com/J49Gc1J.jpeg",
];
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `《  𝐁𝐨𝐭 𝐀𝐧𝐝 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧  》
\→𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : ${global.GoatBot.config.nickNameBot}
\→𝘽𝙊𝙏 𝙎𝙔𝙎𝙏𝙀𝙈 𝙋𝙍𝙀𝙁𝙄𝙓 : ${global.GoatBot.config.prefix}
\→𝙊𝙒𝙉𝙀𝙍 𝙉𝘼𝙈𝙀 : ${authorName}
\→𝘼𝙂𝙀 : ${ownAge}
\→𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉𝙎𝙃𝙄𝙋 : ${Status}
\→𝙒𝙋 : ${authorNumber}
\→𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 𝙇𝙄𝙉𝙆 : ${authorFB}
\→𝘿𝘼𝙏𝙀 : ${date}
\→𝙉𝙊𝙒 𝙏𝙄𝙈𝙀 : ${time}
\→𝘽𝙊𝙏 𝙄𝙎 𝙍𝙐𝙉𝙉𝙄𝙉𝙂 𝙁𝙊𝙍 : ${uptimeString}
    𝙄𝙉𝙎𝙏𝘼: 𝒉𝒕𝒕𝒑𝒔://𝒘𝒘𝒘.𝒊𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎.𝒄𝒐𝒎/_𝒏𝒂𝒚𝒐𝒏_00_/𝒑𝒓𝒐𝒇𝒊𝒍𝒆𝒄𝒂𝒓𝒅/?𝒊𝒈𝒔𝒉=𝒂𝑾𝑹𝒉𝒃𝒏𝒍5𝒁𝑿𝑱𝒘𝑵2𝑽𝒗 
\===============`,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};

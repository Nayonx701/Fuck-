const axios = require("axios");
const apiUrl = 'https://4s1f-api.replit.app';

module.exports = {
  config: {
    name: "mail",
    aliases: ["tempmail", "tmail", "1secmail"],
    version: "1.0",
    author: "ASIF",
    countDown: 5,
    role: 0,
    description: {
      en: "Retrieve emails, inbox messages, read messages, delete messages, get List domains",
    },
    category: "TOOLS",
    guide: {
      en: "{pn} gen (count) (domain/blank)" 
      + "\n{pn} inbox (email)"
      + "\n{pn} read (id) (email)" 
      + "\n{pn} delete (id) (email)"
      + "\n{pn} list (domain/blank)"
    }
  },

  onStart: async function ({ api, message, args, event }) {
    const [command] = args;
    let domain = args[2] || '1secmail.com';
    let email = args[1];
    if (command === "gen") {
      try {
        const response = await axios.get(`${apiUrl}/generate-random-mailbox?count=${args[1]}&domain=${domain}`);
        const resMail = response.data;
         const filteredData = resMail.filter(entry => entry.data && entry.data.includes('@') && entry.data.split('@')[1] !== "ezztt.com");

        // Map index and email
        const mappedData = filteredData.map((entry, index) => `${index + 1}. ${entry.data}`);
        await message.reply(`Generated email: ${mappedData}`);
      } catch (error) {
        console.error(error);
        return message.reply("Failed to generate email.");
      }
    } else if (command === "inbox") {
      if (!email) {
        return message.reply("Please provide an email address for the inbox.");
      }

   try {
        const inboxResponse = await axios.get(`${apiUrl}/get-messages/${email}&domain=${domain}`);
        const inboxMessages = inboxResponse.data.message;

        const formattedMessages = inboxMessages.map((message) => {
          return `${message.date} - From: ${message.sender}\n${message.message}`;
        });

        return message.reply(`Inbox messages for ${email}:\n\n${formattedMessages.join("\n\n")}`);

      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to retrieve inbox messages.", event.threadID);
      }
    } else if (command === "read") {
      if(!id && !email){
        return message.reply("Email & Message ID both are required");
      }
       try {
        const readResponse = await axios.get(`${apiUrl}/read-message/${email}/${id}&domain=${domain}`);
        const msg = readResponse.data.data;
        return message.reply(msg);
      } catch (error) {
        console.error(error);
        return message.reply("Failed to read email's message.");
      }
    }
    else if (command === "delete"){
      if(!id && !email){
        return message.reply("Email & Message ID both are required");
      }
       try {
        const delResponse = await axios.get(`${apiUrl}/delete-message/${email}/${id}&domain=${domain}`);
        const delMsg = delResponse.data.data;
        return message.reply(delMsg);
      } catch (error) {
        console.error(error);
        return message.reply("Failed to delete email's message.");
      }
    }
    else if (command === "attachment"){
      if(!id && !email){
        return message.reply("Email & Message ID both are required");
      }
       try {
        const attachmentResponse = await axios.get(`${apiUrl}/get-attachments/${email}/${id}&domain=${domain}`);
        const attachment = attachmentResponse.data.data;
        return message.reply({ 
          body: `Here's email's Message Attachment:
          ${attachment}
        `});
      } catch (error) {
        console.error(error);
        return message.reply("Failed to delete email's message.");
      }
    }
    else if (command == "list"){
       try {
        const domains = await axios.get(`${apiUrl}/get-domain-list?domain=${domain}`);
         const domainList = domains.data.domainList;
         const allowedDomains = domainList.filter(dom => !["ezztt.com"].includes(dom));

         // Format the allowed domains
         const formattedDomains = allowedDomains.map((dom, index) => `${index + 1}. ${dom}`);

         // Join the formatted domains with newline character
         const formattedString = formattedDomains.join('\n');
        await message.reply(formattedString);
      } catch (error) {
        console.error(error);
        return message.reply("Failed to get domain list.");
      }
    }
  }
};

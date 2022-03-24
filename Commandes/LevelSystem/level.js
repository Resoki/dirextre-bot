const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json');
const db = require('quick.db');


module.exports = {
  name: 'level',
  description: 'level',
  usage: '!level',
  run: async (bot, message, args) => {
    try {
        const xpTotal = db.get(`${message.author.id}_XpTotal`);
        const level = db.get(`${message.author.id}_level`);
        const xpCurrentLevel = db.get(`${message.author.id}_xpCurrentLevel`);
        const xpNeedToRankUp = db.get(`${message.author.id}_xpNeedToRankUp`);
        if(!xpTotal) return message.reply('pas de level trouvé');
        const embed = new MessageEmbed().setTitle(`${message.author.username}`).setDescription(`Level **${level}**`).setColor('BLUE')
        .addFields({name: 'XP', value: `${xpCurrentLevel}/${xpNeedToRankUp}`});
        return message.channel.send({embeds: [embed]});
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
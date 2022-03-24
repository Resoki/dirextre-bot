const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json');
const db = require('quick.db');
const vinted = require('vinted-api');

module.exports = {
  name: 'abonnement',
  description: 'abonnement',
  usage: '!abonnement',
  run: async (bot, message, args) => {
    try {
        if(!args[0]) return message.reply('ecrivez une recherche à sabonner')
        if(!db.get(`vinted_abonnements`)){
            db.set(`vinted_abonnements`, 'exemple')
        }

        db.push(`vinted_abonnements`, ` ${args[0]}`)
        message.channel.send('Tu est maintenant abonné à ', `${args[0]}`)
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
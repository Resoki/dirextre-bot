const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json');
const db = require('quick.db');
const vinted = require('vinted-api');

module.exports = {
  name: 'abonne',
  description: 'abonnement',
  usage: '!abonne',
  run: async (bot, message, args) => {
    try {
        if(!db.get(`vinted_abonnements`)) return message.reply('pas dabonnement')

        const abonnement = db.get(`vinted_abonnements`)
        message.channel.send('Tes abonnements:', abonnement.toString())
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
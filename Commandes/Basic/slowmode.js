const { Client, Message, MessageEmbed,Permissions } = require('discord.js');

module.exports = {
  name: 'slowmode',
  description: 'Slowmode a channel. Where the command is executed',
  userperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
  botperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const permission = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)  
    if (!permission) return message.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`);
      
    const amount = parseInt(args[0]);
    if (isNaN(amount)) return message.reply({ content: ":x:Ce n'est pas une valeur correct" });
    
    if (args[0] === amount + 's') {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        return message.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' secondes',});
      } else {
        return message.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' seconde'});
      }
    }
    if (args[0] === amount + 'm') {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
       return message.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' minutes',});
      } else {
        return message.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' minute',});
      }
    }
    if (args[0] === amount + 'h') {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        return turnmessage.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' heures',});
      } else {
       return message.channel.send({content: 'Le slowmode est maintenant de ' + amount + ' heure',});
      }
    } else {
      message.channel.send({content: 'Tu peux seulement utilisé des secondes(s) / minutes(m) / heures.(h)',});
    }
  },
};
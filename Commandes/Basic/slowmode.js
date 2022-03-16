const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'slowmode',
  description: 'Slowmode a channel. Where the command is executed',
  aliases: ['set-slowmode'],
  emoji: '⏳',
  userperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
  botperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const amount = parseInt(args[0]);
    if (isNaN(amount))
      return message.reply({ content: ":x:Ce n'est pas une valeur correct" });
    if (args[0] === amount + 's') {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send({
          content: 'Le slowmode est maintenant de ' + amount + ' secondes',
        });
        return;
      } else {
        message.channel.send({
          content: 'Le slowmode est maintenant de' + amount + ' seconde',
        });
        return;
      }
    }
    if (args[0] === amount + 'min') {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send({
          content: 'Le slowmode est maintenant de' + amount + ' minutes',
        });
        return;
      } else {
        message.channel.send({
          content: 'Le slowmode est maintenant de' + amount + ' minute',
        });

        return;
      }
    }
    if (args[0] === amount + 'h') {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send({
          content: 'Le slowmode est maintenant de' + amount + ' heures',
        });
        return;
      } else {
        message.channel.send({
          content: 'Le slowmode est maintenant de ' + amount + ' heure',
        });
        return;
      }
    } else {
      message.channel.send({
        content: 'Tu peux seulement utilisé des secondes / minutes / heures.',
      });
    }
  },
};
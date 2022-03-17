const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mute a user from the server',
  run: async (client, message, args) => {
    let member = args[0]
    if(!member) return message.reply('Precisez un membre à mute')
    if(!args[1]) return message.reply('Precisez une raison')
    const reason = args[1]

    const mutedRole = message.guild.roles.cache.get('855063362974384138');


    member.roles.add(mutedRole)
  },
};
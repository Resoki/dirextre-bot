const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'membercount',
  description: 'Ban a user from the server',
  aliases: ['bonk'],
  emoji: '🔨',
  userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
  botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],

  run: async (client, message, args) => {
 
    const guild = client.guilds.cache.get("782788186141229076");
    var memberCount = guild.memberCount
    console.log(memberCount)

    const embed = new MessageEmbed()
      .setTitle(`MemberCount`)
      .setDescription(`Il y a ${memberCount} membres sur le serveur !`).setColor('RANDOM')
    

    message.channel.send({ embeds: [embed] });
  },
};
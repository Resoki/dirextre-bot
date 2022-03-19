const { Client, Message, MessageEmbed, Permission } = require('discord.js');
const global = require('../../Config/global.json');
const moment = require('moment');


module.exports = {
  name: 'profil',
  description: 'Show Profil',

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member

    const flags = member.user.flags.toArray();

    const status = {
        online: '<:online:875144454695182346>',
        idle: '<:idle:875143042024210502>',
        dnd: '<:dnd:875144453726285834>',
        offline: '<:offline:875144454321868851>'
    }


    const embed = new MessageEmbed()
        .setColor('PURPLE')
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: true
        }))
        .setTitle(`Profil de ${member.user.username}`, member.user.displayAvatarURL())
        .setDescription(`
        
        • Username \`${member.user.username}#${member.user.discriminator}\`
        • User id \`${member.id}\`
        
        • Status ${status[member.presence.status]}
        • Role ${member.roles.cache.map(role => role.toString())}
        
        • Compte crée le \`${moment.utc(member.user.createdAt).format('LLLL')}\`
        • Rejoin le \`${moment.utc(member.joinedAt).format('LLLL')}\`
          
        `)
        .setTimestamp()
        .setFooter(`Profil`)

    message.channel.send({
        embeds: [embed]
    });

 
  },
};
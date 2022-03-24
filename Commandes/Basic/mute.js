const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'mute',
  description: 'Mute a user from the server',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    const permission = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    if (!permission) return message.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`)
      
    const member = message.mentions.members.first();
    if (!member) return message.reply({ content: 'Merci de mentionner un membre à mute' });
    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply({content:"Tu ne peux pas bannir ce membre car il a le même rôle, ou un rôle superieur",});

    if(!args[1]) return message.reply('Precisez une raison')
    const reason = args[1]
    const memberPfp = client.users.cache
    .get(member.id)
    .displayAvatarURL({ size: 512, dynamic: true });

    const mutedRole = message.guild.roles.cache.get(global.roleMute);

    member.roles.add(mutedRole)
    const embed = new MessageEmbed() .setTitle(`Le membre ${member.user.username} a été mute du serveur !`)
    .setThumbnail(memberPfp)
    .addField('Membre mute', `${member}`)
    .addField('Moderateur', `<@${message.author.id}>`)
    .addField('Raison', `${reason}`)
    .setColor('RED')
    .setTimestamp();

    message.channel.send({embeds:[embed]})
    let channelLog = message.guild.channels.cache.get(global.channelLog)
    channelLog.send({embeds: [embed]})
  },
};
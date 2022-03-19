const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  aliases: ['bonk'],
  emoji: '🔨',
  userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
  botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const permission = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
      
    if (!permission)
      return message.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`)
      
    const member = message.mentions.members.first();
    if (!member)
      return message.reply({ content: 'Merci de mentionner un membre à bannir' });

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply({
        content:
          "Tu ne peux pas bannir ce membre car il a le même rôle, ou un rôle superieur",
      });

    const reason = args.slice(1).join(' ') || 'Pas de raison evoqué !';
    const memberPfp = client.users.cache
      .get(member.id)
      .displayAvatarURL({ size: 512, dynamic: true });
    const embed = new MessageEmbed()
      .setTitle(`Le membre ${member.user.username} a été banni du serveur !`)
      .setThumbnail(memberPfp)
      .addField('Membre banni', `${member}`)
      .addField('Moderateur', `<@${message.author.id}>`)
      .addField('Raison', `${reason}`)
      .setColor('RED')
      .setTimestamp();

      
    let channelLog = message.guild.channels.cache.get(global.channelLog)
      channelLog.send({embeds: [embed]})

    await member.ban({ reason }).catch((err) =>
      message.channel.send({
        content: `Une erreur a eu lieu en tentant le ban !\nMessage d'erreur :\n\`\`\`yml\n${err}\n\`\`\``,
      })
    );
    message.channel.send({ embeds: [embed] });
  },
};
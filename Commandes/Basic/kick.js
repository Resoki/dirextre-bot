const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  aliases: [],
  emoji: '⛏️',
  userperm: ['KICK_MEMBERS', 'SEND_MESSAGES'],
  botperm: ['KICK_MEMBERS', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const permission = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
      
    if (!permission)
      return message.reply({ 
          contents: "❌ | Tu n'as pas la permission d'utiliser cette commande !"
      });
      
    const member = message.mentions.members.first();
    if (!member)
    return message.reply({ content: 'Merci de mentionner un membre à kick' });

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply({
        content:
          "Tu ne peux pas kick ce membre car il a le même rôle, ou un rôle superieur",
      });

    const reason = args.slice(1).join(' ') || 'Pas de raison evoqué !';
    const memberPfp = client.users.cache
      .get(member.id)
      .displayAvatarURL({ size: 512, dynamic: true });
    const embed = new MessageEmbed()
      .setTitle(`Le membre ${member.user.username} a été kick du serveur !`)
      .setThumbnail(memberPfp)
      .addField('Membre kické', `${member}`)
      .addField('Moderateur', `<@${message.author.id}>`)
      .addField('Raison', `${reason}`)
      .setColor('RED')
      .setTimestamp();

    await member.kick({ reason }).catch((err) =>
      message.channel.send({
        content: `Une erreur a eu lieu en tentant le kick !\nMessage d'erreur :\n\`\`\`yml\n${err}\n\`\`\``,
      })
    );
    message.channel.send({ embeds: [embed] });
  },
};
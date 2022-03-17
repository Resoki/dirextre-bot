const { Client, Message, MessageEmbed } = require('discord.js');

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
      
    if (!permission)
      return message.reply({ 
          contents: "❌ | Tu n'as pas la permission d'utiliser cette commande !"
      });

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply({
        content:
          "Tu ne peux pas bannir ce membre car il a le même rôle, ou un rôle superieur",
      });

    let member = message.mentions.members.first();
    if(!member) return message.reply('Precisez un membre à mute')
    if(!args[1]) return message.reply('Precisez une raison')
    const reason = args[1]

    const mutedRole = message.guild.roles.cache.get('855063362974384138');


    member.roles.add(mutedRole)
    const embed = new MessageEmbed().setDescription(`${member} a été mute par ${message.author.username}\nRaison: ${reason}`)
    message.channel.send({embeds:[embed]})
    console.log('mute ok')
  },
};
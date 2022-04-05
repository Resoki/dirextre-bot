const { MessageEmbed } = require("discord.js")
const global = require('../Config/global.json');
const db = require('quick.db')

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(member, bot) {
        try {
  
            const messageInvit = db.get('InvitedBy')
            const channel = member.guild.channels.cache.find(channel => channel.id === global.channelJoin);
            const guild = bot.guilds.cache.get(global.guild_id);
            const userCount = guild.memberCount;
            let welcomeEmbed = new MessageEmbed().setTitle(`Ho ! Un nouveau membre  !`)
            .setDescription(`✨ Bienvenue **${member.user.username}** ✨\n sur **Voltera !**\n ${!messageInvit ? '' : messageInvit}`).setColor('RANDOM')
            .setThumbnail('https://cdn.discordapp.com/attachments/956919351653589043/960626580391071785/ICONVOLTERA.png')
            .setTimestamp()
            return channel.send({embeds: [welcomeEmbed]})
        } 
        catch(err) {
            return console.log('Une erreur a eu lieu: ', err);
        }
	},
}
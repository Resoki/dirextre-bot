const { MessageEmbed } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(member) {
    try {
        var memberCount = member.guild.memberCount
        console.log(member.user.username)
        const channel = member.guild.channels.cache.find(channel => channel.id === global.channelJoin);
        let welcomeEmbed = new MessageEmbed().setTitle(`Nouveau membre`).setDescription(`${member.user.username} vient de rejoindre le serveur !\nTotal membre: ${memberCount} `).setColor('RANDOM')
        channel.send({embeds: [welcomeEmbed]})
        
    } 
    catch(err) {
        channel.send('Une erreur a eu lieu: ', err);
    }
	},
}
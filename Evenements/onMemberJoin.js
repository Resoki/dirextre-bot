const { MessageEmbed } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(client, member) {
    try {
        const channel = client.guild.channels.cache.find(channel => channel.id === global.channelJoin);
        let welcomeEmbed = new MessageEmbed().setTitle(`Info`).setDescription(global.messageJoin).setColor('RANDOM')
        channel.send({embeds: [welcomeEmbed]});
    } 
    catch(err) {
        channel.send('Une erreur a eu lieu: ', err);
    }
	},
}
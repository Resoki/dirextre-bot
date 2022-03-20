const { MessageEmbed, Channel } = require("discord.js")
const global = require('../Config/global.json');
const db = require('quick.db');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(client, member) {
    try {
        const channel = client.guild.channels.cache.find(channel => channel.id === global.channelJoin);
        let welcomeEmbed = new MessageEmbed().setTitle(`Info`).setDescription(global.messageJoin).setColor('RANDOM')
        channel.send({embeds: [welcomeEmbed]})
    } 
    catch(err) {
        channel.send('Une erreur a eu lieu: ', err)
    }
	},
}
const { MessageEmbed, Channel } = require("discord.js")
const global = require('../Config/global.json');
const db = require('quick.db');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(client, member) {
    const channel = client.guild.channels.cache.find(channel => channel.id === global.channelJoin);
    let welcomeEmbed = new MessageEmbed().setTitle(`${member.user.tag}`).setDescription(global.messageJoin).setColor('RANDOM')
    console.log(member.user.tag)


    try {
     
        
    } 
    catch(err) {
        message.reply('Une erreur a eu lieu: ', err)
    }
	},
}
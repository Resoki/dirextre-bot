const { MessageEmbed } = require('discord.js')
const global = require('../Config/global.json');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
        if(global.antiInvites === true) {
            const inviteForbiden = new MessageEmbed().setTitle('Anti-Invites').setDescription(`Il est interdit de mettre des liens d'invitations !`)
            if(message.content.includes('https://discord.gg')) {
                message.delete();
                return message.channel.send({embeds: [inviteForbiden]})
            } 
        }
       if(global.antiLinks === true) {
        const linkForbiden = new MessageEmbed().setTitle('Anti-Links').setDescription(`Il est interdit de mettre des liens !`)
        if(message.content.includes('https')) {
            message.channel.send({embeds: [linkForbiden]})
            return message.delete()
        } 
        if(message.content.includes('http')) {
            message.delete()
            return message.channel.send({embeds: [linkForbiden]})
        } 
       }
	},
}
const { MessageEmbed, Channel, Message } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'guildMemberBoost',
	once: false,
	execute(client, member) {
        try {
            const channel = client.guild.channels.cache.get(global.channelBoost)
            let boostEmbed = new MessageEmbed().setTitle(`Info`).setDescription(`Un membre vient de boost le serveur ! Merci à lui !`).setColor('RANDOM')
            channel.send({embeds: [boostEmbed]})
        } 
        catch(err){
            console.error(err)
        }

	},
}
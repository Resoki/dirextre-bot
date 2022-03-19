const { MessageEmbed, Channel } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'guildMemberBoost',
	once: false,
	execute(client, member) {
    const channel = client.guild.channels.cache.get(global.channelBoost)

    let boostEmbed = new MessageEmbed().setTitle(`${member.user.tag}`).setDescription(`Un membre vient de boost le serveur !`).setColor('RANDOM')
    console.log(member.user.tag)

    channel.send({embeds: [boostEmbed]})
	},
}
const { MessageEmbed, Channel } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(bot, member) {
    let channel =  bot.channels.cache.get(global.channelJoin)

    let welcomeEmbed = new MessageEmbed().setTitle(`${member.user.tag}`).setDescription(global.messageJoin).setColor('RANDOM')
    console.log(member.user.tag)

    channel.send({embeds: [welcomeEmbed]})
	},
}
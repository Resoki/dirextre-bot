const { MessageEmbed, Channel } = require("discord.js")
const global = require('../Config/global.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(bot, member) {
    //Joue à >
    bot.user.setActivity(global.activityBot)
    bot.user.setStatus(global.statusBot == true ? 'online' : 'dnd')
    
	},
}
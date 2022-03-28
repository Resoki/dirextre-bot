const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')

module.exports = {
	name: 'ready',
	once: true,
	execute(bot, member) {
    //Joue à >
		bot.user.setActivity(global.activityBot);
		bot.user.setStatus(global.statusBot == true ? 'online' : 'dnd');
	},
}
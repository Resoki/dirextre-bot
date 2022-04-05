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

     
    const guild = bot.guilds.cache.get(global.guild_id);
    var memberCount = guild.memberCount

		cron.schedule('* * * * *', () => {
			console.log('Bot ON');
      const channel = bot.channels.cache.find(channel => channel.id === '960553941328863262');
      channel.setName(`✨ Membres: ${memberCount} ✨`)
      
		  });
	},
}
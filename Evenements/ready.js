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
    console.log(memberCount)

		cron.schedule('* * * * *', () => {
			console.log('Bot ON');
      const channel = bot.channels.cache.find(channel => channel.id === '898598664795201546');
      channel.setName(`✨ Membres: ${memberCount} ✨`)
      
		  });
	},
}
const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, bot) {
    //Joue à >
    console.log(interaction.member)
    try {
    const channelName =`ticket-${interaction.member.user.username}`;
    console.log(bot.channels)

    const channel = bot.channels.cache.find(ch => ch.name.startsWith(channelName.toLowerCase()));
    
	if(interaction.values[0] === 'select_probleme_ig') {
           //category Probleme IG
        channel.setParent(`${global.ticketCategoryIg}`)
       
    }

    if(interaction.values[0] === 'select_probleme_site') {
        channel.setParent(`${global.ticketCategorySite}`)
       

    }

    if(interaction.values[0] === 'select-others') {
   
        channel.setParent(`${global.ticketCategoryAutres}`)
     

    }
}
    catch(err) {
        console.log(err)
    }

	},
}
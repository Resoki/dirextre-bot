const { MessageButton } = require('discord.js');
const global = require('../Config/global.json');

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, bot) {
        if(interaction.isButton()) return;
        try {
        const channelName =`ticket-${interaction.member.user.username}`;

        const channel = bot.channels.cache.find(ch => ch.name.startsWith(channelName.toLowerCase()));
        
        if(interaction.values[0] === 'select_probleme_ig') {
            channel.setParent(`${global.ticketCategoryIg}`)
            interaction.reply('Ton ticket a été moove dans la section Problème IG')
        }

        if(interaction.values[0] === 'select_probleme_site') {
            channel.setParent(`${global.ticketCategorySite}`)
            interaction.reply('Ton ticket a été moove dans la section Problème Site')
        }

        if(interaction.values[0] === 'select-others') {
            channel.setParent(`${global.ticketCategoryAutres}`)
            interaction.reply('Ton ticket a été moove dans la section Autres')
        
       channel.send({components: [row]})
        }
    }
        catch(err) {
            console.log(err)
        }
},
}
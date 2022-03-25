const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction) {
    //Joue à >
    console.log(interaction.member)
    const channelName =`ticket-${interaction.member.user.username}`;
    let display =  interaction.member.guild.channels.create(channelName, {
        type: "GUILD_TEXT",
        permissionOverwrites: [
        {
            id: interaction.member.guild.roles.everyone,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        }
        ],
      })

	if(interaction.values[0] === 'open-ticket') {
        console.log('probleme ig')
        interaction.reply('cc')

    }

	},
}
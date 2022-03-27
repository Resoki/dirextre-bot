const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction) {
    //Joue à >
    console.log(interaction.member)
    try {
    const channelName =`ticket-${interaction.member.user.username}`;
    
	if(interaction.customId === 'open-ticket') {
        let display =  interaction.member.guild.channels.create(channelName, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
            {
                id: interaction.member.guild.roles.everyone,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            }
            ],
          }).then((channel) =>{
           //category Probleme IG
              // channel.setParent(`${global.ticketCategoryIg}`)
              const embed = new MessageEmbed().setTitle('Ticket 🎫').setDescription('Sélectionnez la catégorie de votre ticket pour en ouvrir un !')
              .setFooter(`Vulcarya.fr ${new Date()}`).setColor('BLUE')
      
      
              const row = new MessageActionRow()
                  .addComponents(
                  new MessageSelectMenu()
                      .setCustomId('select')
                      .setPlaceholder('Séléctionnez la catégorie du ticket')
                      .addOptions([
                          {
                              label: '🎮 Problème IG',
                              value: 'select_probleme_ig',
                          },
                          {
                              label: '🚧 Problème Site',
                              value: 'select_probleme_site',
                          },
                          {
                              label: ' 📚Autres',
                              value: 'select-others',
                          },
                      ]),
                  );
              
            channel.send({embeds: [embed], components: [row]})
          });
    }


}
    catch(err) {
        console.log(err)
    }

	},
}
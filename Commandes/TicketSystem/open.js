const Discord = require('discord.js');
const { MessageButton } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'open',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    try {
        const channelName =`ticket-${message.author.username}`;
        const embed = new MessageEmbed().setTitle('Ticket').setDescription('Sélectionnez la catégorie de votre ticket')
        .setFooter(`Vulcarya.fr ${new Date()}`)

        const btnOpen = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('btn-open-ticket')
            .setLabel('Open')
            .setColor('BLUE')

        )

        const row = new MessageActionRow()
            .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Séléctionnez la catégorie du ticket')
                .addOptions([
                    {
                        label: 'Problème IG',
                        value: 'select_probleme_ig',
                    },
                    {
                        label: 'Problème Site',
                        value: 'select_probleme_site',
                    },
                    {
                        label: 'Autres',
                        value: 'select-others',
                    },
                ]),
            );
        
      message.channel.send({embeds: [embed], components: [row]})
       
  }
    catch (error) {
        return message.channel.send(`Erreur . \nError: ${error}`);
    }
  }
   
}
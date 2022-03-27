const Discord = require('discord.js');
const { MessageButton } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'openticket',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    try {
        const channelName =`ticket-${message.author.username}`;
        const embed = new MessageEmbed().setTitle('Ticket 🎫').setDescription('Sélectionnez la catégorie de votre ticket pour en ouvrir un !')
        .setFooter(`Vulcarya.fr ${new Date()}`).setColor('BLUE')

        const row = new MessageActionRow()
            .addComponents(
            new MessageButton()
                .setCustomId('open-ticket')
                .setLabel('open ticket')
                .setStyle('PRIMARY'),
               
            );
        
      message.channel.send({embeds: [embed], components: [row]})
       
  }
    catch (error) {
        return message.channel.send(`Erreur . \nError: ${error}`);
    }
  }
   
}
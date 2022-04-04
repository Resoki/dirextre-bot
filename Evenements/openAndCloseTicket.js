const { MessageEmbed, MessageActionRow,MessageButton, MessageSelectMenu,Permissions } = require('discord.js');
const global = require('../Config/global.json');

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, bot) {
    try {
    const channelName =`ticket-${interaction.member.user.username}`.toLocaleLowerCase();
    let alreadyChannel = bot.channels.cache.find(c => c.name === `${channelName}`);      
    
	if(interaction.customId === 'open-ticket') {
        if(alreadyChannel) return interaction.reply(`${interaction.member.user.username}, tu as déjà un ticket d'ouvert`)
        interaction.channel.send(`${interaction.member.user.username}, ton channel a été ouvert`);

        let channelLog = interaction.guild.channels.cache.find(ch => ch.id.startsWith(global.channelLog));
        const embedLog = new MessageEmbed().setDescription(`**${interaction.member.user.username}** a ouvert un ticket !`).setColor('GREEN')
        .setTimestamp()
        channelLog.send({embeds: [embedLog]})
        

        let display =  interaction.member.guild.channels.create(channelName, {
            type: "GUILD_TEXT",
                permissionOverwrites: [
                    {   
                        id: interaction.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: interaction.user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                    },
            ],
          }).then((channel) =>{
           //category Probleme IG
              // channel.setParent(`${global.ticketCategoryIg}`)
              channel.send(`<@${interaction.member.user.id}>`)
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

                  const row2 = new MessageActionRow()
                  .addComponents(
                  new MessageButton()
                  .setCustomId('close-ticket')
                  .setLabel('Fermer le ticket')
                  .setStyle('DANGER'),
  
              );
              channel.setParent('960593260970135593') // categorie ticket
              
             channel.send({embeds: [embed], components: [row,row2]})
          });
    }
    if(interaction.isButton() && interaction.customId === 'close-ticket') {
        let alreadyChannel = bot.channels.cache.find(c => c.name === `${channelName}`);    
        alreadyChannel.delete()
        let channelLog = interaction.guild.channels.cache.find(ch => ch.id.startsWith(global.channelLog));
        const embedLog = new MessageEmbed().setDescription(`Le ticket de **${interaction.member.user.username}** a été supprimé !`).setColor('RED').setImage(interaction.member.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        channelLog.send({embeds: [embedLog]})
   
      
        
    }
    if(interaction.customId === 'reclame-ticket'){
        interaction.channel.send(`Le ticket sera traité par ${interaction.member.user.username}`)
    }
}
    catch(err) {
        console.log(err)
    }

	},
}
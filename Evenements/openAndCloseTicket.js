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

        let display =  interaction.member.guild.channels.create(channelName, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: interaction.member.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.SEND_MESSAGES],
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
    if(interaction.customId === 'close-ticket') {
        let alreadyChannel = bot.channels.cache.find(c => c.name === `${channelName}`);    
        
       
        const embedDelete = new MessageEmbed().setTitle('INFO ❌').setDescription('Le ticket va être supprimé !')
        interaction.channel.send({embeds: [embedDelete]}).then((msg)=>{
          setTimeout(()=> {
            msg.delete();
            let channelLog = interaction.guild.channels.cache.find(ch => ch.id.startsWith(global.channelLog));
            const embedLog = new MessageEmbed().setDescription(`${interaction.member.user.username} a **fermé** le ticket`).setColor('RED')
            .setTimestamp()
            channelLog.send({embeds: [embedLog]})
          }, 2000)
      
        })
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
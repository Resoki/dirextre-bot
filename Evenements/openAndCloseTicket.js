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
        interaction.channel.send(`${interaction.member.user.username}, ton channel a été ouvert`).then((msg) => {
            setTimeout = () =>{
                msg.delete()
            , 4000}
          
        })

        let display =  interaction.member.guild.channels.create(channelName, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
            {
                id: interaction.member.guild.roles.everyone,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            }
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
              
             channel.send({embeds: [embed], components: [row,row2]})
          });
    }
    if(interaction.customId === 'close-ticket') {
        let alreadyChannel = bot.channels.cache.find(c => c.name === `${channelName}`);    
       

        const embedDelete = new MessageEmbed().setTitle('INFO ❌').setDescription('Le ticket va être supprimé !')
        interaction.channel.send({embeds: [embedDelete]}).then((msg)=>{
          setTimeout(()=> {
            alreadyChannel.delete();
            let channelLog = interaction.guild.channels.cache.find(ch => ch.id.startsWith(global.channelLog));
            const embedLog = new MessageEmbed().setDescription(`${interaction.member.user.username} a **fermé** son ticket`).setColor('RED')
            channelLog.send({embeds: [embedLog]})
          }, 2000)
      
        })
    }
}
    catch(err) {
        console.log(err)
    }

	},
}
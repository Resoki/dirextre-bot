const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'ticket',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    const channelName =`ticket-${message.author.username}`;

    let display = message.guild.channels.cache.find(ch => ch.name.startsWith(channelName.toLowerCase()));

    if(display){
      const embedError = new MessageEmbed().setTitle('INFO ❌').setDescription('Tu as déjà un ticket ouvert !')
      return message.channel.send({embeds: [embedError]})
    }
  
    try {
      let display =  message.guild.channels.create(channelName, {
          type: "GUILD_TEXT",
          permissionOverwrites: [
          {
              id: message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          }
          ],
      });
      const embedSuccess = new MessageEmbed().setTitle('INFO').setDescription(`Channel crée avec succès **${channelName}** 📝`).setColor('RANDOM')
      message.channel.send({embeds: [embedSuccess]});
      let channelLog = message.guild.channels.cache.find(ch => ch.name.startsWith(global.channelLog));
      if(!channelLog) return message.reply('Attention ! le channel log est incorrect')

      const date = new Date()
      const embedLog = new Discord.MessageEmbed().setDescription(`${message.author.username} a **ouvert** un ticket : #${channelName} 📝`)
      .setFooter(`${date}`).setColor('GREEN')
      channelLog.send({embeds: [embedLog]})
  }
  catch (error) {
      console.log(error);
      message.channel.send(`Erreur lors de la création du channel: '${channelName}'. \nError: ${error}`);
      return;
  }
  }
   
}
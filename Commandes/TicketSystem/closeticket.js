const Discord = require('discord.js');
const config = require('../../Config/global.json');
const moment = require('moment');
const { Permissions, MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'closeticket',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    try {
    const channelName =`ticket-${message.author.username}`;
    let display = message.guild.channels.cache.find(ch => ch.name.startsWith(channelName.toLowerCase()));

    const embedError = new MessageEmbed().setTitle('INFO ❌').setDescription('Tu dois etre dans le ticket pour pouvoir fermer !')

    if(display != message.channel) return message.channel.send({embeds: [embedError]})

    if(channelName) {
      const embedDelete = new MessageEmbed().setTitle('INFO ❌').setDescription('Le ticket va être supprimé !')
      message.channel.send({embeds: [embedDelete]}).then((msg)=>{
        setTimeout(()=> {
          message.channel.delete()
        }, 2000)
    
      })
      let channelLog = message.guild.channels.cache.find(ch => ch.id.startsWith(global.channelLog));

      const embedLog = new Discord.MessageEmbed().setDescription(`${message.author.username} a **fermé** son ticket`).setColor('RED')
      .setImage(message.author.displayAvatarURL({dynamic: true}))
      channelLog.send({embeds: [embedLog]})

    } 
  }
  catch(error) {
    message.reply(`Une erreur a eu lieu: ${error}`)
  }
  
  }
   
}
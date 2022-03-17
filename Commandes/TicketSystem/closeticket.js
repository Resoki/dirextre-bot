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
      message.channel.send({embeds: [embedDelete]})
      let number = 4
      setInterval(()=> {
        if(!number) return;
        number -= 1
         message.channel.send(`${number}`)
        if((number <1)){
           let channelLog = message.guild.channels.cache.find(ch => ch.name.startsWith('logs'));
           const date = new Date()
           const embedLog = new Discord.MessageEmbed().setDescription(`${message.author.username} a **fermé** son ticket`)
           .setFooter(`${date}`).setColor('RED')
           channelLog.send({embeds: [embedLog]})
           message.channel.delete()
        }
      }, 1000)

    
    } 
  }
  catch(error) {
    message.reply('Une erreur a eu lieu : ', error)
  }
  
  }
   
}
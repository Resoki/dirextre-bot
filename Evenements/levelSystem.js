const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
    //Joue à >
     if(!db.get(`${message.author.id}_XpTotal`)){
        db.add(`${message.author.id}_XpTotal`, 0)
        db.add(`${message.author.id}_xpCurrentLevel`, 0)
        db.add(`${message.author.id}_level`, 1)
    }
   db.add(`${message.author.id}_XpTotal`, 10)
   db.add(`${message.author.id}_xpCurrentLevel`, 10)

   if(!db.get(`${message.author.id}_xpNeedToRankUp`)) {
    db.set(`${message.author.id}_xpNeedToRankUp`, 50)
   }
    const xpCurrentLevel = db.get(`${message.author.id}_xpCurrentLevel`)
    const xpNeedToRankUp = db.get(`${message.author.id}_xpNeedToRankUp`)

   if(xpCurrentLevel >= xpNeedToRankUp) {
    db.add(`${message.author.id}_level`, 1)
    db.set(`${message.author.id}_xpCurrentLevel`, 0)
    db.set(`${message.author.id}_xpNeedToRankUp`, xpNeedToRankUp * 1.5)
    const level =  db.get(`${message.author.id}_level`)

    const embed = new MessageEmbed().setTitle(`${message.author.username}`)
    .setDescription(`Level up => **${level}**`).setColor('RANDOM')
    return message.channel.send({embeds: [embed]})
   }
},
}
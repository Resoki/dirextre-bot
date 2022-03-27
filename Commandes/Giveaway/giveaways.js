const Discord = require('discord.js');
const { MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')
const ms = require('ms')

module.exports = {
  name: 'giveaways',
  description: 'Create a giveaways',
  run: async(client, message, args) => {

    const ErrorPermission = new MessageEmbed()
    .setTitle('Giveaways')
    .setColor('PURPLE')
    .setDescription(`❌ Vous n'avez pas la permission.`)
    .setFooter('Giveaways', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74n7_Iisaqt3RKlfY4SyvVfP72_Qq9vjBzJ_Qea4EsR62aZzynLQRhgsyHS1pGSQibM4&usqp=CAU')

const ErrorChannel = new MessageEmbed()
    .setTitle('Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`🏢 Veuillez préciser un salon.`)
    .setFooter('Giveaways', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74n7_Iisaqt3RKlfY4SyvVfP72_Qq9vjBzJ_Qea4EsR62aZzynLQRhgsyHS1pGSQibM4&usqp=CAU')

const ErrorDuration = new MessageEmbed()
    .setTitle('Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`⌛ Veuillez préciser une durée (Exemple : d/m/s)`)
    .setFooter('Giveaways', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74n7_Iisaqt3RKlfY4SyvVfP72_Qq9vjBzJ_Qea4EsR62aZzynLQRhgsyHS1pGSQibM4&usqp=CAU')

const ErrorWinnersCount = new MessageEmbed()
    .setTitle('Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`🏆 Veuillez préciser un nombre de gagnant.`)
    .setFooter('Giveaways', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74n7_Iisaqt3RKlfY4SyvVfP72_Qq9vjBzJ_Qea4EsR62aZzynLQRhgsyHS1pGSQibM4&usqp=CAU')

const ErrorPrice = new MessageEmbed()
    .setTitle('Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`🎁 Veuillez préciser le prix du gagnant`)
    .setFooter('Giveaways', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74n7_Iisaqt3RKlfY4SyvVfP72_Qq9vjBzJ_Qea4EsR62aZzynLQRhgsyHS1pGSQibM4&usqp=CAU')

if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({
    embeds: [ErrorPermission]
})

let channel = message.mentions.channels.first()
if (!channel) return message.channel.send({
    embeds: [ErrorChannel]
})

let duration = args[1]

if (!duration || isNaN(ms(duration))) return message.channel.send({
    embeds: [ErrorDuration]
})

let winners = args[2]
if (isNaN(winners)) return message.channel.send({
    embeds: [ErrorWinnersCount]
})

let prize = args.slice(3).join(" ")
if (!prize) return message.channel.send({
    embeds: [(ErrorPrice)]
})

//.giveaways <#channel_name> <duration> <number winners> <price>
//EXEMPLE:
//.giveaways #taverne 2d 1 grade-ingame

client.giveawaysManager.start(channel, {
    duration: ms(duration),
    prize: 'Prix: ' + prize,
    winnerCount: 1,

    messages: {
        giveaway: '🎉 **GIVEAWAY** 🎉',
        giveawayEnded: '🎉 **GIVEAWAY TERMINÉ** 🎉',
        timeRemaining: `Temps restant:  **duration**`,
        inviteToParticipate: "Réagis avec  🎉  pour participer au giveaway !",
        embedFooter: "play.earthsky.fr",
        noWinner: "Aucun gagnant !",
        hostedBy: "Hebergé par: {user}",
        winners: "Gagnant(s): ",
        endAt: "Finit à ",
        units: {
            seconds: 'seconds',
            minutes: 'minutes',
            hours: 'hours',
            days: 'days',
            pluralS: false
        }
    }

}).catch(err => console.error('error:', err))

message.channel.send(`Un giveaway démarre:  ${channel}`).then((msg) => {
    setTimeout(() => {
        msg.delete()
    }, 15);
})
   
  
  }
   
}
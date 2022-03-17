const Discord = require('discord.js');
const { MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')
const ms = require('ms')

module.exports = {
  name: 'giveaways',
  description: 'Create a giveaways',
  run: async(client, message, args) => {

    const ErrorPermission = new MessageEmbed()
    .setTitle('EarthSky • Giveaways')
    .setColor('PURPLE')
    .setDescription(`<:dnd:875144453726285834> Vous n'avez pas la permission.`)
    .setFooter('play.earthsky.fr', 'https://cdn.discordapp.com/attachments/627845176819318824/893515970675638382/EarthSky_Icone_carre.png')

const ErrorChannel = new MessageEmbed()
    .setTitle('EarthSky • Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`<:dnd:875144453726285834> Veuillez préciser un salon.`)
    .setFooter('play.earthsky.fr', 'https://cdn.discordapp.com/attachments/627845176819318824/893515970675638382/EarthSky_Icone_carre.png')

const ErrorDuration = new MessageEmbed()
    .setTitle('EarthSky • Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`<:dnd:875144453726285834> Veuillez préciser une durée (Exemple : d/m/s)`)
    .setFooter('play.earthsky.fr', 'https://cdn.discordapp.com/attachments/627845176819318824/893515970675638382/EarthSky_Icone_carre.png')

const ErrorWinnersCount = new MessageEmbed()
    .setTitle('EarthSky • Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`<:dnd:875144453726285834> Veuillez préciser un nombre de gagnant.`)
    .setFooter('play.earthsky.fr', 'https://cdn.discordapp.com/attachments/627845176819318824/893515970675638382/EarthSky_Icone_carre.png')

const ErrorPrice = new MessageEmbed()
    .setTitle('EarthSky • Giveaways')
    .setColor('PURPLE')
    .setTimestamp()
    .setDescription(`<:dnd:875144453726285834> Veuillez préciser le prix du gagnant`)
    .setFooter('play.earthsky.fr', 'https://cdn.discordapp.com/attachments/627845176819318824/893515970675638382/EarthSky_Icone_carre.png')

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
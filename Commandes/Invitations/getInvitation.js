const Discord = require('discord.js');
const { MessageButton } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'getinvi',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    try {
        const invitesCounter = {}
        
        message.guild.invites.fetch()
        .then((invites) => {
            invites.forEach(invite => {
                console.log("invites", invite)
                const {uses, inviter} = invite
                const {username, discriminator} = inviter

                console.log(uses, username, discriminator)

                const name = `${username}#${discriminator}`;

                invitesCounter[name] = (invitesCounter[name] || 0) + uses

                
            })
            let replyText = 'Invites: '

            for (const invite in invitesCounter) {
                console.log(invite)
                const count = invitesCounter[invite]
                replyText += `\n${message.author.username} a été invité par ${invite} - ${count} invitations !`
            }
            message.reply(replyText)
        })




        
  }
    catch (error) {
        //return message.channel.send(`Erreur . \nError: ${error}`);
    }
  }
   
}
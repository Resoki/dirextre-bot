const Discord = require('discord.js');
const { MessageButton } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'topinvites',
  description: 'Open Ticket',
  run: async(client, message, args) => {
    let numberTop = 0;
    if(!args[0])numberTop = 10;
    if(args[0]) numberTop = args[0]
    if(!Number(numberTop)) return message.reply('Tu dois renseigner un nombre !')
    if(numberTop > 15) return message.reply('Tu ne peux pas afficher plus de 15 membres !')
        message.guild.invites.fetch().then((invites) => {
          const inviteCounter = {
           
          }
          const embed = new MessageEmbed().setTitle('🏆  Top Invitation 🏆 ').setDescription('Top invites on server').setColor('ORANGE')
          
    
          invites.forEach((invite) => {
            const { uses, inviter } = invite
            const { username, discriminator } = inviter
    
            const name = `${username}#${discriminator}`;

    
            inviteCounter[name] = (inviteCounter[name] || 0) + uses
          })
    
          let replyText = 'Invites:'
    
          const sortedInvites = Object.keys(inviteCounter).sort(
            (a, b) => inviteCounter[b] - inviteCounter[a]
          )
    
          console.log(sortedInvites)
    
          sortedInvites.length = numberTop
    
          for (const [iteration,invite] of sortedInvites.entries()) {
            const count = inviteCounter[invite];
            if((iteration+1) === 1) {
              embed.addField(`#${iteration + 1} 🥇`, `\n**${invite}** a invité **${!count ? 0 : count}** membres!`);
            }
            else if((iteration+1) === 2) {
              embed.addField(`#${iteration + 1} 🥈`, `\n**${invite}** a invité **${!count ? 0 : count}** membres!`);
            }
            else if((iteration+1) === 3) {
              embed.addField(`#${iteration + 1} 🥉`, `\n**${invite}** a invité **${!count ? 0 : count}** membres!`);
            }
            else {
              embed.addField(`#${iteration + 1}`, `\n${invite} a invité **${!count ? 0 : count}** membres!`);
            }
            
          }

          message.channel.send({embeds: [embed]})
        })
  

      }
          }
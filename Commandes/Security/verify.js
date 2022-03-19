const { Client, Message, MessageEmbed, Permission } = require('discord.js');
const global = require('../../Config/global.json');
const moment = require('moment');
const db = require('quick.db');


module.exports = {
  name: 'verify',
  description: 'Verify Profil',

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member

    try {

        if(db.get(`${message.author.id}_isVerified`)) {
            const embedAlreadyVerified = new MessageEmbed().setTitle('Verify').setDescription(`${message.author.username}, ton profil a déjà été verifié !`)
            return message.channel.send({embeds: [embedAlreadyVerified]})
        }

        if(!db.get(`${message.author.id}_numberVerify`)){
            const number = Math.floor(Math.random() * 100000) + 1;
            db.set(`${message.author.id}_numberVerify`, number)
        }

        const number = db.get(`${message.author.id}_numberVerify`)

        if(!number) return;
        if(number && !args[0]) {
            const embed = new MessageEmbed().setTitle('Verify').setDescription(`${message.author.username}, pour verifier ton profil, écrit !verify ${number}`)
             message.channel.send({embeds: [embed]})
        }
    
        if(!db.get(`${message.author.id}_isVerified`)) {
            if(args[0] === number.toString()) {
               db.set(`${message.author.id}_isVerified`, true)

               const embedSucces = new MessageEmbed().setTitle('Verify').setDescription(`${message.author.username} vien de verifier son profil !`)
               message.member.roles.add(global.verifiedRole)

               let channelLog = message.guild.channels.cache.get(global.channelLog)
         
               const date = new Date()
               const embedLog = new MessageEmbed().setTitle('Verify').setDescription(`${message.author.username} a **verifié** son profil 📝`)

               channelLog.send({embeds: [embedLog]})
               return message.channel.send({embeds: [embedSucces]})
            }
            console.log('CC')
        }
        
    }
    catch(err) {
        message.reply(err)
    }
  },
};
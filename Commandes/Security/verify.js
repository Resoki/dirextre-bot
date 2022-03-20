const { Client, Message, MessageEmbed, Permission } = require('discord.js');
const global = require('../../Config/global.json');
const moment = require('moment');
const db = require('quick.db');


module.exports = {
  name: 'verify',
  description: 'Verify Profil',

  run: async (message, args) => {

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
        }
    }
    catch(err) {
        message.reply(`Une erreur a eu lieu : ${err}`)
    }
  },
};
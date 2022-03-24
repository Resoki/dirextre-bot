const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json');
const db = require('quick.db');


module.exports = {
  name: 'verify',
  description: 'Verify Profil',
  usage: '!verif',
  run: async (bot, message, args) => {
    try {
        if(db.get(`${message.author.id}_isVerified`)) {
            const embedAlreadyVerified = new MessageEmbed().setTitle('Verification 🔧').setDescription(`${message.author.username}, ton profil a déjà été verifié ! ❌`)
            return message.channel.send({embeds: [embedAlreadyVerified]});
        }

        if(!db.get(`${message.author.id}_numberVerify`)){
            const number = Math.floor(Math.random() * 100000) + 1;
            db.set(`${message.author.id}_numberVerify`, number);
        }
        const number = db.get(`${message.author.id}_numberVerify`)

        if(!number) return;
        if(number && !args[0]) {
            const embed = new MessageEmbed().setTitle('Verification 🔧').setDescription(`${message.author.username}, pour verifier ton profil, écris **!verify ${number}**`).setColor('BLUE')
             message.channel.send({embeds: [embed]});
        }
    
        if(!db.get(`${message.author.id}_isVerified`)) {
            if(args[0] === number.toString()) {
               db.set(`${message.author.id}_isVerified`, true);

               const embedSucces = new MessageEmbed().setTitle('Verification 🔧').setDescription(`${message.author.username} vien de verifier son profil ! ✅`).setColor('BLUE');
               message.member.roles.add(global.verifiedRole);

               let channelLog = message.guild.channels.cache.get(global.channelLog);
               const embedLog = new MessageEmbed().setTitle('Verification 🔧').setDescription(`${message.author.username} a **verifié** son profil ✅`).setColor('BLUE');

               channelLog.send({embeds: [embedLog]});
               return message.channel.send({embeds: [embedSucces]});
            }
        }
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
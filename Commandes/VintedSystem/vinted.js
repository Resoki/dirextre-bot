const { MessageEmbed } = require('discord.js');
const global = require('../../Config/global.json');
const db = require('quick.db');
const vinted = require('vinted-api');


module.exports = {
  name: 'vinted',
  description: 'vinted',
  usage: '!vinted',
  run: async (bot, message, args) => {
    try {
        if(!args[0]) return message.reply('ecrivez une recherche')

        vinted.search('https://www.vinted.fr/vetements?search_text=' + args[0]).then((posts) => {
            console.log(posts); // all the posts that match this query
        
            for(item of posts.items){
                console.log(item.id)
                const embed = new MessageEmbed().setTitle(`Vinted`).setDescription(`${item.title}`)
                .addFields({name: 'Price', value: `${item.price} ${item.currency}`, inline: true},
                {name: 'Brand', value: `${item.brand_title}`, inline: true})
                .setThumbnail(`${item.url}`)
            message.channel.send({embeds: [embed]})
            }
            
   
              
            
          
    
        });
        
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
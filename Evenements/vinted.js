const global = require('../Config/global.json');
const cron = require('node-cron');
const db = require('quick.db')
const vinted = require('vinted-api');
const abonne = require('../Commandes/VintedSystem/abonne');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(message) {
    //Joue à >
    const doSomething = () => {
        console.log('vie')
        const abonnement = db.get(`vinted_abonnements`)
        vinted.search(`https://www.vinted.fr/vetements?search_text=${abonnement}`).then((posts) => {
            console.log(posts.items[0])

            const embed = new MessageEmbed().setTitle(`Vinted`).setDescription(`${posts.items[0].title}`)
            .addFields({name: 'Price', value: `${posts.items[0].price} ${posts.items[0].currency}`, inline: true},
            {name: 'Brand', value: `${posts.items[0].brand_title}`, inline: true})
            .setThumbnail(`${posts.items[0].url}`)
            let channelLog = message.guild.channels.cache.find(ch => ch.id === global.channelLog);
            channelLog.send({embeds : [embed]})
         
        })
    
    
    }

    const task = cron.schedule('* * * * *', () => { doSomething()});
    task.start()
        
	},
}
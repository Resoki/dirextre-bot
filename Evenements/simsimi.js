
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const global = require('../Config/global.json')

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
    if(!global.enabledSimsimi) return;
      if(message.author.bot) return;
        const text = message.content
            axios.get(`https://api.simsimi.net/v2/?text=${text}&lc=fr&cf=false`)
            .then((res)=>{
                const embed = new MessageEmbed().setTitle('SimSimi').setDescription(` ${res.data.success}`);
                return message.channel.send({embeds: [embed]});
            }).catch((err)=>message.channel.send(`Une erreur a eu lieu : \n ${err}`))

	},
}
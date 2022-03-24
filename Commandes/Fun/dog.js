const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'dog',
    description: 'random dog image',
    run: async(client, message, args) => {
      let image = ''
      await axios.get('https://random.dog/woof.json')
        .then((res)=> {
          if(!res.data.url) return message.reply('Veuillez refaire la commande');
          image = res.data.url;
        }).catch((err) => console.error(err));

      const embed = new MessageEmbed()
        .setTitle(`Random dogs`)
        .setImage(`${image}`)

        message.channel.send({ embeds: [embed] });
    }
}
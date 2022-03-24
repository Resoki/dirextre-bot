const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'clear',
    description: 'random dog image',
    run: async(client, message, args) => {
      if(!args[1]) message.reply('Ecrivez le nombre a delete')

    }
}
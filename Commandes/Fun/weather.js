const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'weather',
    description: 'random dog image',

    run: async(client, message, args) => {
      if(!args[0]) return message.reply('Vous devez renseigner une ville !');
      let city = args[0];
      let datas = { region: '', hours: '', temperature: '', humidity: '', iconUrl: '', status: ''}

      message.channel.send('Chargement...').then((message)=> {
        setTimeout(()=> message.delete(), 2000);
      })

      await axios.get(`https://weatherdbi.herokuapp.com/data/weather/${city}`)
      .then((res)=> {
        if(res.data.status == 'fail') return message.reply('Ville introuvable !')
        console.log(res.data)
        let response = res.data
            datas.region = response.region
            datas.hours = response.currentConditions.dayhour
            datas.temperature = response.currentConditions.temp.c
            datas.humidity = response.currentConditions.humidity
            datas.iconUrl = response.currentConditions.iconURL
            datas.status = response.currentConditions.comment

      }).catch((err) => console.error(err));

      const embed = new MessageEmbed()
        .setTitle(`Meteo - ${datas.region}`)
        .addFields({name: 'Status', value: `${datas.status} °C`, inline: true},
        {name: 'Temperature', value: `${datas.temperature} °C`, inline: true},
        {name: 'Humidité', value: `${datas.humidity}`, inline:true})
        .setThumbnail(`${datas.iconUrl}`)
        .setColor('blue')
        .setFooter(`${datas.hours}`)

        message.channel.send({ embeds: [embed] });
    }
}
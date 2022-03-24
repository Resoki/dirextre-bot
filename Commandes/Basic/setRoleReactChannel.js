const {MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const global = require('../../Config/global.json');

module.exports = {
  name: 'setrolereact',
  description: 'Show Profil',
  run: async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('primary')
            .setLabel(`${global.roleReactNameOne}`)
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('primarydd')
            .setLabel(`${global.roleReactNameTwo}`)
            .setStyle('PRIMARY'),
    );

    const embed = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle(`Role `)
        .setDescription(`Choisi un rôle ici pour l'appliquer`)
    message.channel.send({embeds: [embed], components: [row]});
  },
};
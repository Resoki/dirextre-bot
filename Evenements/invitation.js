const { MessageEmbed } = require('discord.js')
const global = require('../Config/global.json');

module.exports = {
	name: 'invitationCreate',
	once: false,
	execute(interaction, client) {
        member.guild.fetch().then(guildInvites => {
            const ei = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            const inviter = client.users.get(invite.inviter.id);
           console.log(`${member.user.tag} a rejoint, invité par  ${inviter.tag} !`);
          })
	},
}
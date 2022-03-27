const { MessageEmbed } = require('discord.js')
const global = require('../Config/global.json');

module.exports = {
	name: 'invitationCreate',
	once: false,
	execute(interaction, client) {
        member.guild.fetch().then(guildInvites => {
            // This is the *existing* invites for the guild.
            const ei = invites[member.guild.id];
            // Update the cached invites for the guild.
            invites[member.guild.id] = guildInvites;
            // Look through the invites, find the one for which the uses went up.
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            // This is just to simplify the message being sent below (inviter doesn't have a tag property)
            const inviter = client.users.get(invite.inviter.id);
           console.log(`${member.user.tag} joined using invite code - ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
          })
	},
}
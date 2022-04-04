const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const global = require('./Config/global.json')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
bot.commands = new Collection()

const { token } = require('./Config/global.json')

console.log(`Chargement du dossier Commandes`)
console.log(``)
const commandFolder = fs.readdirSync('./Commandes')

for (const folder of commandFolder) {
	const commandFile = fs.readdirSync(`./Commandes/${folder}`).filter(file => file.endsWith('.js'))
	for (const file of commandFile) {
		const command = require(`./Commandes/${folder}/${file}`)
		console.log(`> - ${file} chargé avec succès.`)
		bot.commands.set(command.name, command)
	}
}

const manager = new GiveawaysManager(bot, {
  storage: './Commandes/Giveaway/giveaways.json',
  default: {
      botsCanWin: false,
      embedColor: '#FAD02C',
      embedColorEnd: '#F8EFE4',
      reaction: '🎉'
  }
});

bot.giveawaysManager = manager;

const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
  kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
  banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  maxInterval: global.antiSpamIntervalMax, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, Merci de ne pas spam !", // Message that will be sent in chat upon warning a user.
  kickMessage: "**{user_tag}** a été kick pour spam", // Message that will be sent in chat upon kicking a user.
  muteMessage: "**{user_tag}** a été mute pour spam", // Message that will be sent in chat upon muting a user.
  banMessage: "**{user_tag}** a été banni pour spam", // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
  ignoredPermissions: ["ADMINISTRATOR"], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredMembers: [], // Array of User IDs that get ignored.
  unMuteTime:  10, // Amount of time (in minutes) a user will be muted for.
  removeMessages: true, // If the bot should remove all the spam messages when taking action on a user!
  modLogsEnabled: false, // If to enable modlogs
  modLogsChannelName: "logs", // channel to send the modlogs too!
  modLogsMode: "embed",
  // And many more options... See the documentation.
});

bot.on("messageCreate", (message) => antiSpam.message(message));

// Anti Raid
const {AntiRaid} = require('discord-antiraid');

const antiraid = new AntiRaid(bot, {
    rateLimit: 3,
    time: 10000,
    ban: true,
    kick: false,
    unrank: false,
    exemptMembers: [],
    exemptRoles: [],
    exemptEvent: [],
    reason: "discord-antiraid"
});

antiraid.on("punish", (member, reason, sanction) => {
  member.guild.channels.cache.get(global.channelAntiRaid).send(`${member.user.username} a été banni pour tentative de raid`)
});


bot.on('message', async message => {
  let prefix = '!';
  if(!message.guild) return;
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = bot.commands.get(command)
  if(cmd) cmd.run(bot, message, args)

});

console.log(``)

console.log(`Chargement du dossier Evenements`)
console.log(` `)
const eventFolder = fs.readdirSync('./Evenements').filter(file => file.endsWith('.js'))

for (const file of eventFolder) {
	const event = require(`./Evenements/${file}`)
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, bot))
    console.log(`> - ${file} chargé avec succès.`)
	} else {
		bot.on(event.name, (...args) => event.execute(...args, bot))
    console.log(`> - ${file} chargé avec succès.`)
	}
}

console.log(` `)

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.username}`)
})

bot.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId === 'primary') {
     interaction.guild.roles.fetch(global.roleIdOne)
     .then((role)=>{
      interaction.member.roles.add(role); 
     }).catch(console.error())

		await interaction.reply({ content: 'Rôle ajouté avec succes ! '})
	}
  if (interaction.customId === 'secondary') {
    interaction.guild.roles.fetch(global.roleIdTwo )
    .then((role)=>{
     interaction.member.roles.add(role); 
    }).catch(console.error())

		await interaction.reply({ content: 'Rôle ajouté avec succes ! '})
	}
});

bot.login(process.env.DJS_TOKEN || token)
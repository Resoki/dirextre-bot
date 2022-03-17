const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');


const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
bot.commands = new Collection()

const { token, prefix } = require('./Config/global.json')

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

bot.on('message', async message => {
  let prefix = '!';
  if(!message.guild) return;
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = bot.commands.get(command)
  if(cmd) cmd.run(bot, message, args)

})
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
bot.login(token)
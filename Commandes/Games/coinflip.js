
module.exports = {
  name: 'coinflip',
  description: 'coinflip',
  usage: '!coinflip color mise',
  run: async (bot, message, args) => {
    try {
        const color = args[0];
        const mise = args[1];
       if(!color) return message.reply('Preciser une couleur red/bleu, ex : !coinflip red 200')
       if(!mise) return message.reply('Preciser une mis, ex: 200')

        const colorTab = ['blue', 'red'];
        const choice = colorTab[Math.floor(Math.random() * colorTab.length)];
        message.channel.send(`L'ordinateur a choisi: **${choice}**, tu as choisi: **${color}**`);

        choice === color ?  message.channel.send('Tu as gagné !') : message.channel.send('Tu as perdu !');
        return;
     
    }
    catch(err) {
        return message.channel.send(`Une erreur a eu lieu \n ${err}`);
    }
  },
};
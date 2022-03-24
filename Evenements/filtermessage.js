const blackListWords = require('./blackListWords')
module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
        blackListWords.forEach((element)=> {
          if(message.content.includes(element)){
            message.channel.send(`Attention ${message.author.username}, il est interdit d'ecrire des insultes !`);
            message.delete();
          }
        })
    
	},
}
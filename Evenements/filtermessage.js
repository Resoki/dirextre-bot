const blackListWords = require('./blackListWords')
module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
        const test = message.content.split(' ')
       for(const item of test) {
         for(let i = 0; i< blackListWords.length; i++) {
           if(item === blackListWords[i]){
             message.channel.send(`Attention ${message.author.username}, il est interdit d'ecrire des insultes !`)
             message.delete()
           }
         }
       }
	},
}
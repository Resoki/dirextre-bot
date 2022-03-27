const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const global = require('../../Config/global.json')

module.exports = {
  name: 'test',
  description: 'Ban a user from the server',
  aliases: ['bonk'],
  emoji: '🔨',
  userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
  botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],

  run: async (client, message, args) => {
  
    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            context.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (context.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        return context.font;
    };

    context.strokeRect(0, 0, canvas.width, canvas.height);

	// Assign the decided font to the canvas
	context.font = applyText(canvas, interaction.member.displayName);
	context.fillStyle = '#ffffff';
	context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);
  },
};
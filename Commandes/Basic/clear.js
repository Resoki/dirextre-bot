const { Permissions } = require('discord.js');


module.exports = {
    name: 'clear',
    description: 'clear message',
    run: async(client, message, args) => {
      var amount = parseInt(args[0])
      const permission = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
      
      if (!permission)
        return message.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`);

        if (!amount) return message.channel.send(`Merci d'indiquer le nombre de messages à delete`)
        if (amount > 100 || amount < 1) return message.channel.send("Merci de choisir un nombre entre 1 et 100")

        message.channel.bulkDelete(amount).catch(err => {
              message.channel.send(':x: A cause de la limitation Discord, je ne peux pas supprimer les messages de plus de 14 jours') })

        let msg = await message.channel.send(`${amount} messages ont été supprimés !`)
        setTimeout(() => {
            msg.delete()
        }, 2000)

    }
}
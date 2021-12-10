module.exports = {
	name: 'autolibrary',
	description: 'Activates automation in the library channel',
	args: '',
	aliases: ['library', 'library channel'],
	cooldown: 3,
	argsrequired: false,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
		if (automatic || message.member.hasPermission (['ADMINSTRATOR'])) {
            const library = guild.channels.cache.get ('705138093044269116');
            client.on ('message', message => {
                if (message.channel.id === library.id && message.author.bot && !message.attachments.size > 0) {
                    message.delete ();
                }
                else if (message.channel.id === library.id && !message.attachments.size > 0) {
                    message.delete ();
                    library.send (`${Eemoji} That doesn't belong in this channel`, {
                        files: ['https://i.imgur.com/ZKSgjR5.png']
                    }).then(msg => {msg.delete({ timeout: 5000 })
                    })
                } 
            });
        };
    },
}
module.exports = {
	name: 'autosecret',
	description: 'Activates automation in the private channel',
	args: '',
	aliases: ['secret', 'secretchannel'],
	cooldown: 3,
	argsrequired: false,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
		const cron = require ('cron');
		if (automatic || message.member.hasPermission (['ADMINSTRATOR'])) {
			if(!automatic){
				Ewebhook.send (`${Cemoji} ${message.member} activated autosecret. (20301)`);
                message.channel.send (`${Cemoji} Turned on`);
			}
			const autoPrivate = new cron.CronJob('0 0 0 * * *', () => {
				const privaterole = guild.roles.cache.get ('695813066905878528');
				guild.members.cache.forEach(member => {
					member.roles.remove (privaterole);
				})
				let newprivaterole = [];
				newprivaterole = guild.members.cache.random(2);
				newprivaterole.forEach (member => {
					member.roles.add (privaterole);
				})
				const privatechannel = guild.channels.cache.get ('695813398793027594');
				Ewebhook.send (`${Cemoji} ${privatechannel} picked its new contestants ${newprivaterole[0]} and ${newprivaterole[1]}. (20302)`);
				privatechannel.send (`${Cemoji}` + ' Welcome! We randomly picked ' + `${newprivaterole[0].user.username}` + ' and ' + `${newprivaterole[1].user.username}` + ' to privatetly talk to each other!');
			});
			autoPrivate.start ();
			console.log ('autosecret up!');
		}
	},
};
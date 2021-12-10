module.exports = {
	name: 'kick',
	description: 'Moderators can kick people',
	args: '<user> [reason]',
	aliases: ['kick', 'remove', 'kicks', 'kicked', 'kicking'],
	cooldown: 3,
	argsrequired: true,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
		if (message.member.hasPermission (['KICK_MEMBERS'])) {
			let userid = args[0].replace(/[\\<>@#&!]/g, "");
			user = message.guild.members.cache.get (userid);
			let getreason = message.content.substring(message.content.indexOf('>') + 1);
			let reason = getreason || 'no specified reason';

			if (!user && message.member.hasPermission (['KICK_MEMBERS'])) {
				Ewebhook.send (`${Eemoji} ${message.member} tried to kick without mentioning anyone. (20001)`);
				return message.reply(`${Eemoji} ${message.member} Please mention a user to kick them!`);
			}
			else if (message.member.hasPermission (['KICK_MEMBERS'])) {
				user.kick(reason);
				Ewebhook.send (`${Cemoji} ${message.member} kicked ${user} for ${reason}. (20002)`);
				return message.channel.send (`${Cemoji} ${message.member} has been kicked by ${user} for ${reason}!`);
			}
			else if (getreason && user) {
				Ewebhook.send (`${Cemoji} ${message.member} tried to kick ${user} for ${reason}, but didn't have permissions, an appeal was sent to mods. (20003)`);
				const Awebhook = new Discord.WebhookClient(config.AwebhookID, config.AwebhookToken);
				let onlineMod = guild.members.filter(member => {
					member.roles.fins ()
				})
				//Awebhook.send (`${Cemoji} ${message.member} tried to kick ${user} for ${reason}, but didn't have permissions, `);
				//return message.channel.send (`${Cemoji} ${message.member} You do not have permissions to kick ${user}! Though your request has been sent to a mod.`);
			}
			else if (!getreason && user) {
				Ewebhook.send (`${Eemoji} ${message.member} tried to kick ${user} but didn't have permissions. (20004)`);
				return message.channel.send (`${Eemoji} ${message.member} You do not have permissions to kick ${user}!`);
			}
			else {
				Ewebhook.send (`${Eemoji} ${message.member} tried to kick someone but didn't have permissions. (20005)`);
				return message.channel.send (`${Eemoji} ${message.member} You do not have permissions to kick!`);
			}
		};
	},
};
module.exports = {
	name: 'ban',
	description: 'Moderators can ban people',
	args: '<user> [reason]',
	aliases: ['ban', 'bans', 'bann', 'banned', 'banning'],
	cooldown: 3,
	argsrequired: true,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
		if (message.member.hasPermission (['BAN_MEMBERS'])) {
			const member = message.mentions.members.first();
			member.ban();
			Ewebhook.send (`${Cemoji} ${message.member} banned ${member}. (20102)`);
			return message.channel.send (`${Cemoji} ` + member.toString() + ' has been banned by ' + message.member.toString() + '!');
		}
		else if (!message.member.hasPermission (['BAN_MEMBERS'])) {
			const member = message.mentions.members.first();
			Ewebhook.send (`${Eemoji} ${message.member} tried to ban ${member} but didn't have permissions. (20101)`);
			return message.channel.send (`${Eemoji}` + 'you don\'t have the permission to ban ' + member.toString() + '!');
		}
	},
};
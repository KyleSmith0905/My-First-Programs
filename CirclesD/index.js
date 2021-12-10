// To-do:
// Some channels have character limit
// Delete lone texts in art-library
// Make a questions channel
// Add fun games
// Send new emoji in #spam

const fs = require ('fs');
const Discord = require ('discord.js');
const config = require ('./config.json');
const client = new Discord.Client ();
client.commands = new Discord.Collection ();
global.client = client;

const commandFiles = fs.readdirSync ('./commands').filter (file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require (`./commands/${file}`);
	client.commands.set (command.name, command);
}

const cooldowns = new Discord.Collection();

client.once ('ready', () => {
	console.log ('Active!');

	let commandName = ['autospam', 'autosecret', 'autolibrary'];
	let message = null;
	let args = null;
	let automatic = true;
	const guild = client.guilds.cache.get ('694286027216650240');
	const Cemoji = guild.emojis.cache.get ('703842653929996300');
	const Eemoji = guild.emojis.cache.get ('703829135134294056');
	const Ewebhook = new Discord.WebhookClient(config.EwebhookID, config.EwebhookToken);

	commandName.forEach (commandName => {
		try {
			client.commands.get (commandName).execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook);
		}
		catch (error) {
			console.log(`Error with ${commandName}`);
		};
	});
});

client.on ('guildMemberAdd', member => {
	const Cemoji = member.guild.emojis.cache.get ('703842653929996300');
	const Swebhook = new Discord.WebhookClient(config.SwebhookID, config.SwebhookToken);
	const Ewebhook = new Discord.WebhookClient(config.EwebhookID, config.EwebhookToken);
	Swebhook.send (`${Cemoji} Welcome to the server, ` + member.toString() + '!');
	Ewebhook.send (`${Cemoji} ${member} joined the server. (10003)`, {
		username: 'Circles Bot - Helper',
	});
});

client.on ('message', message => {
	if (message.channel.type == 'text') {
		if (message.type === "PINS_ADD" && message.author.bot) return message.delete();
		if (!message.content.startsWith(config.prefix)) return;
		const Cemoji = message.guild.emojis.cache.get ('703842653929996300');
		const Eemoji = message.guild.emojis.cache.get ('703829135134294056');
		const Ewebhook = new Discord.WebhookClient(config.EwebhookID, config.EwebhookToken);
		const args = message.content.slice(config.prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get (commandName)
		|| client.commands.find (cmd => cmd.aliases && cmd.aliases.includes (commandName));

		if (!command) {
			Ewebhook.send (`${Eemoji} ${message.member} tried using \`${commandName}\` in ${message.channel} but it wasn't a command. (10001)`);
			return message.channel.send (`${Eemoji} That is not a command!`);
		};

		if (!cooldowns.has (command.name)) {
			cooldowns.set (command.name, new Discord.Collection);
		};

		const now = Date.now();
		const timestamps = cooldowns.get (command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has (message.author.id)) {
			const expirationTime = timestamps.get (message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				message.react ('702673088604798987');
				setTimeout (function() {
					message.reactions.cache.get ('702673088604798987').remove().catch(() =>
						message.reactions.removeAll ());
				}, 3000);
				return;
			};
		};

		timestamps.set(message.author.id, now);
		setTimeout (() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			let automatic = false;
			const guild = client.guilds.cache.get ('694286027216650240');
			command.execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook);
		}
		catch (error) {
			Ewebhook.send (`${Eemoji} ${message.member} tried using \`${commandName}\` in ${message.channel} but didn't work. (10002)`);
			return message.channel.send (`${Eemoji}` + ' There was an error executing this command!');
		};
	}
	else if (message.channel.type == 'dm' && message.content.startsWith(config.prefix)) {
		const SEemoji = ':orange_circle:';
		return message.channel.send (`${SEemoji} Nice try, there are currently no commands for Direct Messages!`);
	}
});

client.login (config.token);
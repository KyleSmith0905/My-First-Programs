module.exports = {
	name: 'autospam',
    description: 'Activates automation in the spam channel',
    args: '',
    aliases: ['spam', 'spamchannel'],
    cooldown: 3,
    argsrequired: false,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
        const cron = require ('cron');
		if (automatic || guild.member.hasPermission (['ADMINSTRATOR'])) {
            if(!automatic){
                Ewebhook.send (`${Cemoji} ${message.member} activated autospam. (20201)`);
                message.channel.send (`${Cemoji} Turned on`);
            }
            const spamchannel = guild.channels.cache.find (channel => channel.name === 'spam');
			const autospambefore = new cron.CronJob('0 0 0 * * 6', () => {
                spamchannel.send (`${Cemoji} This channel will completetly reset tomorrow.`).then (sentmessage => {
                    sentmessage.pin();
                })
            });
            autospambefore.start ();
            const autospamafter = new cron.CronJob('0 0 0 * * 0', () => {
                let oldspamchat = guild.channels.cache.find (channel => channel.name === 'spam');
                let oldspamchatposition = oldspamchat.position;
                oldspamchat.clone ();
                oldspamchat.delete ();
                setTimeout (function() {
                    let newspam = guild.channels.cache.find (channel => channel.name === 'spam');
                    console.log (newspam)
                    newspam.setPosition (oldspamchatposition);
                    newspam.send (`${Cemoji} ${newspam} has been reset and will do the same in 7 days!\nThis is to clear everything mentioned here.`);
                    Ewebhook.send (`${Cemoji} ${newspam} was reset nicely. (20202)`);
                }, 5000);
            });
            autospamafter.start ();
            console.log ('autospam up!');
		}
	},
};
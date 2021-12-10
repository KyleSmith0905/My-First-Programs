module.exports = {
	name: 'pin',
	description: 'Pin a message in a specified location',
    args: '<location> [distance]',
    aliases: ['pinned', 'post', 'important', 'pins', 'save', 'pinn'],
    cooldown: 15,
    argsrequired: false,
	guildonly: true,
	command: true,

	execute (config, message, args, Cemoji, Eemoji, guild, automatic, Discord, Ewebhook) {
        const submissionchannel = guild.channels.cache.get ('694387390365565052');
        let pinnerperms = message.member.permissionsIn (message.channel);
        if (message.channel.id == submissionchannel.id || pinnerperms.has ('MANAGE_MESSAGES')) {
            const Pemoji = guild.emojis.cache.get ('705647061659287632');
            const uppinalias = ['up', 'there', 'near', 'upward', 'done', 'before', '^'];
            const helpalias = ['help', 'helps', 'helped', 'support', 'use', 'uses', 'usage', 'argument', '?'];
            if (!uppinalias.includes (args[0]) && !helpalias.includes (args[0])) {
                if (message.attachments.size > 0 || pinnerperms.has ('MANAGE_MESSAGES')) {
                    message.pin ();
                    Ewebhook.send (`${Cemoji} ${message.member} pinned his own message. (20401)`);
                    return message.react (Pemoji);
                } 
                else {
                    Ewebhook.send (`${Eemoji} ${message.member} tried to pin a message without an image. (20402)`);
                    return message.channel.send (`${Eemoji} You could only pin images here!`);
                }
            }
            else if (!helpalias.includes (args[0])) {
                if (message.channel.id == submissionchannel.id) {
                    try {
                        message.channel.messages.fetch ({limit: 10}).then (m => {
                            let attachmentmessages = m.filter (msg => msg.attachments.size > 0);
                            let firstattachmentmessage = attachmentmessages.first ();
                            firstattachmentmessage.pin ();
                            Ewebhook.send (`${Cemoji} ${message.member} pinned a recent image sent. (20403)`);
                            return firstattachmentmessage.react (Pemoji);
                        })
                    }
                    catch (error) {
                        Ewebhook.send (`${Eemoji} ${message.member} tried to pin an image, but none was there. (20404)`);
                        return message.channel.send (`${Eeomji} There is no recent images to pin!`);
                    } 
                }
                else {
                    let pinvalue = +args[1] + 1;
                    if (pinvalue > 10) {
                        Ewebhook.send (`${Eemoji} ${message.member} tried to pin an image more than 10 messages away. (20405)`);
                        return message.channel.send (`${Eeomji} You can't pin something more than 10 messages away!`)
                    }
                    message.channel.messages.fetch ({limit: pinvalue || 2}).then (m => {
                        let thatmessage = m.last ();
                        if (thatmessage.system == false){
                            thatmessage.pin ();
                            Ewebhook.send (`${Eemoji} ${message.member} pinned an image ${pinvalue} messages away. (20406)`);
                            return thatmessage.react (Pemoji);      
                        }
                        else {
                            Ewebhook.send (`${Eemoji} ${message.member} tried to pin a system message. (20407)`);
                            return message.channel.send (`${Eemoji} You can't pin a system message!`);
                        }
                    })
                }
            }
            else {
                const Hwebhook = new Discord.WebhookClient(config.HwebhookID, config.HwebhookToken);
                console.log (Hwebhook);
                if (message.channel.id == submissionchannel.id) {
                    const helpembed = new Discord.MessageEmbed()
                    .setColor ('#ffa500')
                    .setAuthor ('Pin Command', 'https://i.imgur.com/aQWU9vG.png')
                    .addField ('Description', 'The \`!pin <location>\` command allows people to pin messages using a single command')
                    .addField ('Usage', `To perform this command you need to type this in ${submissionchannel} (moderators could use this in any channel) with the following arguments:`)
                    .addField ('!pin here', 'Pins the message being sent with the command', true)
                    .addField ('!pin up', 'Pins the most recent message containing an image', true)
                    Ewebhook.send (`${Eemoji} ${message.member} needed help on pin command. (20408)`);
                    Hwebhook.send (`${message.member} This is the channel to ask for help in`, {
                        username: 'Circles Bot - Helper',
                        embeds: [helpembed],
                    })
                }
                else {
                    const helpembed = new Discord.MessageEmbed()
                    .setColor ('#ffa500')
                    .setAuthor ('Pin Command', 'https://i.imgur.com/aQWU9vG.png')
                    .addField ('Description', 'The \`!pin <location>\` command allows people to pin messages using a single command')
                    .addField ('Usage', `To perform this command you need to type this in ${submissionchannel} (moderators could use this in any channel) with the following arguments:`)
                    .addField ('!pin here', 'Pins the message being sent with the command', true)
                    .addField ('!pin up', 'Pins a message right above the message unless a value is given', true)
                    Ewebhook.send (`${Eemoji} ${message.member} needed help on pin command. (20409)`);
                    const spamchannel = guild.channels.cache.find (channel => channel.name === 'spam');
                    if (message.channel.id == spamchannel.id) {
                        Hwebhook.send (`${message.member}`, {
                            username: 'Circles Bot - Helper',
                            embeds: [helpembed],
                        })
                    }
                    else {
                        Hwebhook.send (`${message.member} This is the channel to ask for help in`, {
                            username: 'Circles Bot - Helper',
                            embeds: [helpembed],
                        })
                    }
                }
            }
        }
        else {
            EwebhookZ.send (`${Eemoji} ${message.member} tried to pin a message outside ${submissionchannel}. (20410)`);
            return message.channel.send (`${Eemoji} You could only pin messages in ${submissionchannel}!`);
        }
    }
}
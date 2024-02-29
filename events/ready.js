const client = require('../');
const { Activitytype, ActivityType } = require('discord.js');

client.on('ready', () => {
    console.log(`${client.user.tag} is now logged in and ready to be used!`);

    // Set activity status
    client.user.setActivity({
        // Watching [number of members] members
        name: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members!`,
        type: ActivityType.Watching
    });

    client.user.setStatus('idle');

});
const fs = require('fs');
const ascii = require('ascii-table');

module.exports = () => {
    let eventsTable = new ascii().setHeading('Events', 'Status'); // Create ASCII Table
    let events = fs.readdirSync(`./events`); // Events folder
    for (let file of events) {
        require(`../events/${file}`); // require event file
        eventsTable.addRow(file.split('.js')[0], '✅ Ready');
    };

    console.log(eventsTable.toString().brightCyan);

};
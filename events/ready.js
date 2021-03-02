// #####################################
//               On Ready
// #####################################
// loads when bot is started up
// All initalizing processes need to go in this
module.exports = (client) => {

    // Setting the bot presence on login
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with myself',
            type: 'PLAYING'
        }
    });

    console.log(`${client.user.tag} has logged in!`);

};
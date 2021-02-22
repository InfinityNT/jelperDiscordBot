const Commando = require('discord.js-commando');

module.exports = class Reboot extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			group: 'dev',
			memberName: 'reboot',
			description: 'Reinicia el bot.',
			userPermissions: ['ADMINISTRATOR'],
		});
	}

	run(message) {
		message.channel.send('I\'ll be back mamasita...')
			.then(() => {
				process.exit(1);
			});
	}
};
const Commando = require('discord.js-commando');

module.exports = class Marco extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'marco',
			group: 'misc',
			memberName: 'marco',
			description: 'Solo un comando random.',
		});
	}

	run(message) {
		return message.reply('polo!');
	}
};
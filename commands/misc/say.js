const Commando = require('discord.js-commando');

module.exports = class SayCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: ['parrot', 'copy'],
			group: 'misc',
			memberName: 'say',
			description: 'Responde con el texto que ingreses.',
			args: [
				{
					key: 'text',
					prompt: '¿Qué te gustaría que el bot dijera?',
					type: 'string',
				},
			],
		});
	}

	run(message, { text }) {
		return message.reply(text);
	}
};
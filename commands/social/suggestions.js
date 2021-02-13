const Commando = require('discord.js-commando');

module.exports = class Suggestions extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'suggestions',
			group: 'social',
			memberName: 'suggestions',
			description: 'Agrega a tu mensaje de reglas, las reacciones de aceptar y rechazar.',
			userPermissions: ['ADMINISTRATOR'],
			clientPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_ROLES'],
		});
	}

	async run(message, args) {
		args = args.split(' ');
		const { mentions } = message;
		const { channels } = mentions;
		const targetChannel = channels.first() || message.channel;

		if (channels.first()) {
			args.shift();
		}

		await message.delete();

		const fetchedMessages = await targetChannel.messages.fetch();
		const ruleMsg = fetchedMessages.first();
		ruleMsg.react('👍');
	}
};
const Commando = require('discord.js-commando');

module.exports = class messageCleaner extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clean',
			aliases: ['cc', 'clear'],
			group: 'misc',
			memberName: 'clean',
			description: 'Borra entre 1-100 mensajes a la vez.',
			args: [
				{
					key: 'numberOfMessages',
					prompt: '¿Cuántos mensajes vas a querer borrar papi?',
					type: 'string',
				},
			],
		});
	}
	async run(message, { numberOfMessages }) {
		let quantity = Number(numberOfMessages);

		await message.delete();

		if (quantity > 100) {
			message.channel.send('Solo puedes eliminar hasta un máximo de 100 mensajes a la vez!').then((msg) => msg.delete({ timeout: 1000 * 2 }));
			return;
		}

		if (numberOfMessages === 'a' || numberOfMessages === 'all') {
			quantity = 100;
		}

		message.channel.bulkDelete(quantity, true)
			.then((messages) => {
				message.channel.send(`**Se han eliminado ${messages.size}/${quantity} mensajes.**`)
					.then((msg) => {
						msg.delete({ timeout: 1000 * 3 });
					});
			});
	}
};
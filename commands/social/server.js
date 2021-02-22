const Commando = require('discord.js-commando');
const minecraft = require('@utils/minecraft');

module.exports = class minecraftServer extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'server',
			group: 'social',
			memberName: 'server',
			description: 'Maneja el servidor de Minecraft desde Discord!',
			userPermissions: ['ADMINISTRATOR'],
			details: 'Con este comando podrás abrir, cerrar y reiniciar el servidor de Minecraft de manera remota.',
			hidden: true,
		});
	}

	run(message, args) {
		if (!args) {
			message.channel.send('¿Qué deseas hacer?. Recuerda que debes introducir alguna instrucción: open || kill || status || reboot');
			return;
		}

		args = args.split(' ');
		const i = args.shift().toLowerCase();

		switch (i) {
		case 'open':
			minecraft.startServer(message);
			break;
		case 'kill':
			minecraft.killServer(message);
			break;
		case 'status':
			minecraft.checkStatus(message);
			break;
		case 'reboot':
			minecraft.rebootServer(message);
			break;
		}
	}
};
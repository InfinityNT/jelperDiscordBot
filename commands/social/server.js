const Commando = require('discord.js-commando');
const minecraft = require('@utils/minecraft');

module.exports = class minecraftServer extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'server',
			group: 'social',
			memberName: 'server',
			description: 'Maneja el servidor de Minecraft desde Discord!',
			details: 'Con este comando podrás abrir, cerrar y reiniciar el servidor de Minecraft de manera remota.',
			hidden: true,
		});
	}

	run(message, args) {
		if (!message.member.roles.cache.some(r => r.name === 'Dragons')) {
			message.channel.send('No tienes los permisos necesarios para usar este comando.');
			return;
		}

		if (!args) {
			message.channel.send('¿Qué deseas hacer?. Recuerda que debes introducir alguna instrucción: open || kill || status || reboot || ip');
			return;
		}

		args = args.split(' ');
		const i = args.shift().toLowerCase();

		switch (i) {
		case 'open':
			minecraft.start(message);
			break;
		case 'kill':
			minecraft.kill(message);
			break;
		case 'status':
			minecraft.checkStatus(message);
			break;
		case 'reboot':
			minecraft.reboot(message);
			break;
		case 'ip':
			minecraft.ip(message);
			break;
		default:
			message.channel.send('Recuerda que debes introducir alguna instrucción: open || kill || status || reboot || ip');
		}
	}
};
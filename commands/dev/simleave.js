const Commando = require('discord.js-commando');

module.exports = class simJoin extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'simleave',
			group: 'dev',
			memberName: 'simleave',
			description: 'Simula el abandono de un mienbro del servidor',
			userPermissions: ['ADMINISTRATOR'],
		});
	}

	run(message) {
		this.client.emit('guildMemberRemove', message.member);
		message.delete();
	}
};
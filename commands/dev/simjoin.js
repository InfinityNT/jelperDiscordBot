const Commando = require('discord.js-commando');

module.exports = class simJoin extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'simjoin',
			group: 'dev',
			memberName: 'simjoin',
			description: 'Simula la entrada de un miembro al servidor.',
			userPermissions: ['ADMINISTRATOR'],
		});
	}

	run(message) {
		this.client.emit('guildMemberAdd', message.member);
		message.delete();
	}
};
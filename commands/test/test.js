const Commando = require('discord.js-commando');

module.exports = class Test extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'test',
			memberName: 'test',
			description: 'Un comando usado para probar nuevas funciones!',
			userPermissions: ['ADMINISTRATOR'],
			format: '<args>',
			details: 'Usado solo por los desarolladores del bot, este commando sirve como punto de partida para el desarrollo de nuevas funciones para el bot.',
			hidden: true,
		});
	}

	run() {
		console.log('test command running...');
		console.log('test command finished.');
	}
};
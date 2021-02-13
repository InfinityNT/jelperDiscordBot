const Commando = require('discord.js-commando');
const goodbyeSchema = require('@schemas/goodbyeSchema');

module.exports = class setWelcome extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'setgoodbye',
			group: 'settings',
			memberName: 'setgoodbye',
			description: 'Configura un mensaje de despedida para tus miembros!. Usa "<@>" para etiquetar al miembro dentro del mensaje.',
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
			args: [
				{
					key: 'goodbyeMessage',
					default: 'Bye Bye <@>, vuelve pronto :cry:',
					prompt: '',
					type: 'string',
				},
			],
		});
	}

	async run(message, { goodbyeMessage }) {
		const guildID = message.guild.id;
		const guildName = this.client.guilds.cache.get(guildID).name;
		const channelID = message.channel.id;
		await goodbyeSchema.findOneAndUpdate(
			{
				guildId: guildID,
			},
			{
				guildId: guildID,
				channelId: channelID,
				goodbyeMessage: goodbyeMessage,
			},
			{
				upsert: true,
			},
		);
		message.channel.send(`El mensaje de despedida para el servidor **${guildName}** en el canal <#${channelID}> con el mensaje: **${goodbyeMessage}** esta listo!`)
			.then((msg) => {
				setTimeout(() => {
					msg.channel.bulkDelete(2);
				}, 1000 * 10);
			});
	}
};
const Commando = require('discord.js-commando');
const welcomeSchema = require('@schemas/welcomeSchema');

module.exports = class setWelcome extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'setwelcome',
			group: 'settings',
			memberName: 'setwelcome',
			description: 'Configura un mensaje de bienvenida para tus miembros recién llegados!. Usa "<@>" para etiquetar al miembro dentro del mensaje.',
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
			args: [
				{
					key: 'welcomeMessage',
					default: 'Bienvenido al servidor <@>! :kissing_heart:',
					prompt: '',
					type: 'string',
				},
			],
		});
	}

	async run(message, { welcomeMessage }) {
		const guildID = message.guild.id;
		const guildName = this.client.guilds.cache.get(guildID).name;
		const channelID = message.channel.id;
		await welcomeSchema.findOneAndUpdate(
			{
				guildId: guildID,
			},
			{
				guildId: guildID,
				channelId: channelID,
				welcomeMessage,
			},
			{
				upsert: true,
			},
		);
		message.channel.send(`El mensaje de bienvenida para el servidor **${guildName}** en el canal <#${channelID}> con el mensaje: **${welcomeMessage}** esta listo!`)
			.then((msg) => {
				setTimeout(() => {
					msg.channel.bulkDelete(2);
				}, 1000 * 10);
			});
	}
};
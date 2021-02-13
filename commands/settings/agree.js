const Commando = require('discord.js-commando');
const { addToCache } = require('@features/agree');
const agreeSchema = require('@schemas/agreeSchema');

module.exports = class setRules extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'agree',
			group: 'settings',
			memberName: 'agree',
			description: 'Agrega a tu mensaje de reglas, las reacciones de aceptar y rechazar.',
			userPermissions: ['ADMINISTRATOR'],
			clientPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_ROLES'],
		});
	}

	async run(message, args) {
		args = args.split(' ');
		const { guild, mentions } = message;
		const { channels } = mentions;
		const targetChannel = channels.first() || message.channel;

		if (channels.first()) {
			args.shift();
		}

		let role = args.shift();
		if (role.startsWith('<@&')) {
			role = role.substring(3, role.length - 1);
		}

		await message.delete();

		const fetchedMessages = await targetChannel.messages.fetch();
		const agreeMsg = fetchedMessages.first();

		addToCache(guild.id, agreeMsg, role);

		agreeMsg.react('✅');

		new agreeSchema({
			guildId: guild.id,
			channelId: targetChannel.id,
			messageId: agreeMsg.id,
			roleId: role,
		})
			.save()
			.catch((e) => {
				console.log(e);
				message.reply('Hubo un error al guardar en la base de datos, por favor reporta esto a los moderadores!')
					.then((msg) => {
						msg.delete({
							timeout: 1000 * 5,
						});
					});
			});
	}
};
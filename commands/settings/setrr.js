const Commando = require('discord.js-commando');
const roleSchema = require('@schemas/roleSchema');
const { addToCache } = require('../../features/features/rr');

module.exports = class setRoleReaction extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'setrr',
			group: 'settings',
			memberName: 'setrr',
			description: 'Establece el canal y el mensaje de tu selector de roles',
			userPermissions: ['ADMINISTRATOR'],
			clientPermissions: ['MANAGE_MESSAGES', 'MANAGE_ROLES'],
			aliases: ['rrmsg'],
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

		const text = args.join(' ');

		message.delete();

		const newMessage = await targetChannel.send(text);

		addToCache(guild.id, newMessage);

		new roleSchema({
			guildId: guild.id,
			channelId: targetChannel.id,
			messageId: newMessage.id,
		})
			.save()
			.catch(() => {
				message.reply('Hubo un error al guardar en la base de datos, por favor reporta esto a los moderadores!')
					.then((msg) => {
						msg.delete({
							timeout: 1000 * 5,
						});
					});
			});
	}
};
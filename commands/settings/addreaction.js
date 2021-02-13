const Commando = require('discord.js-commando');
const { fetchCache, addToCache } = require('@features/rr');
const roleSchema = require('@schemas/roleSchema');

module.exports = class addRoleReaction extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'addreaction',
			group: 'settings',
			memberName:'addreaction',
			description: 'Agrega un rol a tu selector de roles.',
			userPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
			clientPermissions: ['MANAGE_ROLES'],
			aliases: ['addrr'],
		});
	}

	async run(message, args) {
		args = args.split(' ');
		const { guild } = message;
		let emoji = args.shift();
		let role = args.shift();
		const displayName = args.join(' ');

		message.delete();

		if (role.startsWith('<@&')) {
			role = role.substring(3, role.length - 1);
		}

		const newRole = guild.roles.cache.find(r => {
			return r.name === role || r.id === role;
		});

		if (!newRole) {
			message.reply(`No se pudo encontrar el rol: ${role}`)
				.then((msg) => {
					msg.delete({ timeout: 1000 * 3 });
				});
			return;
		}

		role = newRole;

		if (emoji.includes(':')) {
			const emojiName = emoji.split(':')[1];
			emoji = guild.emojis.name.find(e => {
				return e.name === emojiName;
			});
		}

		const [fetchedMessage] = fetchCache(guild.id);
		if (!fetchedMessage) {
			message.reply('Ha ocurrido un error, por favor intenta de nuevo.');
			return;
		}

		const newLine = `${emoji} ${displayName}`;
		let { content } = fetchedMessage;

		if (content.includes(emoji)) {
			const split = content.split('\n');

			for (let a = 0; a < split.length; a++) {
				if (split[a].includes(emoji)) {
					split[a] = newLine;
				}
			}
			content = split.join('\n');
		}
		else{
			content += `\n${newLine}`;
			fetchedMessage.react(emoji);
		}

		fetchedMessage.edit(content);

		const obj = {
			guildId: guild.id,
			channelId: fetchedMessage.channel.id,
			messageId: fetchedMessage.id,
		};

		await roleSchema.findOneAndUpdate(obj, {
			// Esto es lo mismo que si copiaramos el contenido de 'obj'
			...obj,
			$addToSet: {
				roles: {
					emoji,
					roleId: role.id,
				},
			},
		}, {
			upsert: true,
		});

		addToCache(guild.id, fetchedMessage, emoji, role.id);
	}
};
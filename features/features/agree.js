const agreeSchema = require('@schemas/agreeSchema');

// {guildId: [message, role]}

const cache = {};

const fetchCache = (guildId) => cache[guildId] || [];

const addToCache = async (guildId, message, role) => {
	const array = cache[guildId] || [message, role];

	await message.channel.messages.fetch(message.id, true, true);

	cache[guildId] = array;
};

const handleReaction = (reaction, user, adding) => {
	const { message } = reaction;
	const { guild } = message;

	const [fetchedMessage, role] = fetchCache(guild.id);

	if (!fetchedMessage) {
		return;
	}

	if (fetchedMessage.id === message.id && guild.me.hasPermission('MANAGE_ROLES')) {
		const member = guild.members.cache.get(user.id);
		if (adding) {
			member.roles.add(role);
		}
		else {
			member.roles.remove(role);
		}
		return;
	}
};

module.exports = async (client) => {
	client.on('messageReactionAdd', (reaction, user) => {
		handleReaction(reaction, user, true);
	});
	client.on('messageReactionRemove', (reaction, user) => {
		handleReaction(reaction, user, false);
	});

	const results = await agreeSchema.find();

	for (const result of results) {
		const { guildId, channelId, messageId } = result;

		const guild = await client.guilds.cache.has(guildId);

		if (!guild) {
			console.log(`Agree: Eliminando el servidor: ${guildId} de la base de datos.`);
			await agreeSchema.deleteOne({ guildId });
			return;
		}

		const channel = await client.channels.cache.get(channelId);

		if (!channel) {
			console.log(`Agree: Eliminando el canal: ${channelId} de la base de datos.`);
			await agreeSchema.deleteOne({ channelId });
			return;
		}

		try {
			const cacheMessage = true;
			const skipCache = true;
			await channel.messages.fetch(messageId, cacheMessage, skipCache);
		}
		catch (error) {
			console.log(`Agree: Eliminando el mensaje: ${messageId} de la base de datos`);
			await agreeSchema.deleteOne({ messageId });
		}
	}
};

module.exports.addToCache = addToCache;
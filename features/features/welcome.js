const welcomeSchema = require('@schemas/welcomeSchema');

module.exports = async (client) => {
	const onJoin = async (member) => {
		const result = await welcomeSchema.findOne({ guildId: member.guild.id });
		const data = [result.channelId, result.welcomeMessage];
		const channelId = data[0];
		const text = data[1];
		const channel = member.guild.channels.cache.get(channelId);
		channel.send(text.replace(/<@>/g, `<@${member.id}>`));
	};

	client.on('guildMemberAdd', member => {
		onJoin(member);
	});
};
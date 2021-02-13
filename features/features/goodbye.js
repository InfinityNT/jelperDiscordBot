const goodbyeSchema = require('@schemas/goodbyeSchema');

module.exports = (client) => {
	const onLeave = async (member) => {
		const result = await goodbyeSchema.findOne({ guildId: member.guild.id });
		const data = [result.channelId, result.goodbyeMessage];
		const channelId = data[0];
		const text = data[1];
		const channel = member.guild.channels.cache.get(channelId);
		channel.send(text.replace(/<@>/g, `<@${member.id}>`));
	};

	client.on('guildMemberRemove', member => {
		onLeave(member);
	});
};
const moongose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const roleSchema = moongose.Schema({
	guildId: reqString,
	channelId: reqString,
	messageId: reqString,
	roles: [
		{
			emoji: reqString,
			roleId: reqString,
		},
	],
});

module.exports = moongose.model('roles-channels', roleSchema);
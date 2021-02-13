const moongose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const agreeSchema = moongose.Schema({
	guildId: reqString,
	channelId: reqString,
	messageId: reqString,
	roleId: reqString,
});

module.exports = moongose.model('agree-channels', agreeSchema);
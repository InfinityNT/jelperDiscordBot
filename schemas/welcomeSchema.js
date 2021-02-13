const moongose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const welcomeSchema = moongose.Schema({
	guildId: reqString,
	channelId: reqString,
	welcomeMessage: reqString,
});

module.exports = moongose.model('welcome-channels', welcomeSchema);
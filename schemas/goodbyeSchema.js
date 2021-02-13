const moongose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const goodbyeSchema = moongose.Schema({
	guidlId: reqString,
	channelId: reqString,
	goodbyeMessage: reqString,
});

module.exports = moongose.model('goodbye-channels', goodbyeSchema);
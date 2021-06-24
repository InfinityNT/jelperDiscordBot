const moongose = require('mongoose');
const { mongoLocalPath } = require('@root/config.json');

module.exports = async () => {
	await moongose.connect(mongoLocalPath, {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	return moongose;
};
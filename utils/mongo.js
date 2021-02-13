const moongose = require('mongoose');
const { mongoPath } = require('@root/config.json');

module.exports = async () => {
	await moongose.connect(mongoPath, {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
	return moongose;
};
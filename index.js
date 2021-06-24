require('module-alias/register');

const mongo = require('@utils/mongo');
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;
const Commando = require('discord.js-commando');
const path = require('path');
const config = require('@root/config.json');
const loadFeatures = require('@root/features/loadFeatures');

const client = new Commando.Client({
	owner: config.ownerID,
	prefix: config.globalprefix,
});

client.setProvider(
	MongoClient.connect(config.mongoLocalPath, { useUnifiedTopology: true })
		.then((bot) => new MongoDBProvider(bot, 'discordBot')),
).catch(console.error);

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('ready', async () => {
		loadFeatures(client);
		await mongo();
		console.log('Listo!');
	});

client.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		prefix: true,
		ping: false,
		eval: false,
		unknownCommand: false,
		commandState: true,
	})
	.registerGroups([
		['dev', 'Developers commands'],
		['misc', 'Misc commands'],
		['settings', 'Server settings'],
		['social', 'Social commands'],
		['stream', 'Streamers commands'],
		['test', 'Prototype commands'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);
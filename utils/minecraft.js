const spawn = require('child_process').spawn;
const publicIp = require('public-ip');
const dir = require('@root/config.json').minecraftServerDir;
let isOpen = false;
let server;

const startServer = async (message, reboot) => {
	const ip = await publicIp.v4();

	if (!isOpen) {
		try {
			if (!reboot) {
				message.channel.send(`El servidor se está abriendo, por favor espera unos momentos... **IP: ${ip}**`);
			}
			server = spawn('java', [
				'-Xmx4G',
				'-Xms1G',
				'-jar',
				'server.jar',
			],
			{
				cwd: dir,
				windowsHide: true,
			});
			isOpen = true;
		}
		catch(e) {
			message.channel.send(`ERROR!: Al parecer ocurrió un error al iniciar el servidor, por favor reporta esto con los moderadores.\n\`\`\`${e}\`\`\``);
			return;
		}
	}
	else if (isOpen) {
		message.channel.send('El servidor ya se encuentra abierto!. En caso de no ser así, por favor reportalo con los moderadores.');
	}

	server.on('exit', () => {
		isOpen = false;
	});

	process.on('exit', () => {
		server.kill();
	});
};

const killServer = async (message, reboot) => {
	if(isOpen) {
		try{
			server.kill();
			isOpen = false;
			if (!reboot) {
				message.channel.send('El servidor ha sido cerrado!');
			}
		}
		catch(e) {
			message.channel.send(`ERROR!: Al parecer ocurrió un error al cerrar el servidor, por favor reporta esto con los moderadores.\n\`\`\`${e}\`\`\``);
			return;
		}
	}
	else if (!isOpen) {
		if (!reboot) {
			message.channel.send('El servidor ya se encuentra cerrado!. En caso de no ser así por favor reportalo con los moderadores.');
		}
	}
};

const rebootServer = async (message) => {
	message.channel.send('El servidor se está reiniciando...');
	killServer(message, true);
	startServer(message, true);
};

const checkStatus = (message) => {
	if (isOpen) {
		message.channel.send('El servidor se encuentra abierto!');
	}
	else if (!isOpen) {
		message.channel.send('El servidor se encuentra cerrado!');
	}
};

const serverIp = async (message) => {
	const currentIp = await publicIp.v4();
	message.channel.send(`La ip actual es: ${currentIp}`);
};

module.exports.start = startServer;
module.exports.kill = killServer;
module.exports.reboot = rebootServer;
module.exports.checkStatus = checkStatus;
module.exports.ip = serverIp;
const path = require('path');
const fs = require('fs');

module.exports = (client) =>{
	const readFeatures = (dir) => {
		let files = fs.readdirSync(path.join(__dirname, dir));
		files = files.filter(f => f.endsWith('.js'));
		files.forEach(f => {
			const stat = fs.lstatSync(path.join(__dirname, dir, f));
			if (stat.isDirectory()) {
				readFeatures(path.join(dir, f));
			}
			else if (!stat.isDirectory()) {
				const feature = require(path.join(__dirname, dir, f));
				feature(client);
			}
		});
		console.log(`Cargadas un total de ${files.length} funciones!`);
	};
	readFeatures('./features/');
};
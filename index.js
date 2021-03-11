'use strict';

const Discord = require('discord.js');
const { prefix, token } = require('/.config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

function capitalize(word) {
	if (word) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	}

}

function pick_family(family, picker) {
	const options = [
		`Hmm... are you sure you want to pick the ${family} family, ${picker} :thinking:? Okay, the ${family} family it is!`,
		`The ${family} family is a great choice! They'll treat you well, ${picker}.`,
		`Ah! The ${family} family. They go way back. I remember this one time... nevermind. They're your story now, ${picker}!`,
		`${picker} has chosen the ${family} family!`,
		`You'll make the ${family} family proud, ${picker}! If not, I'm sure they'll forgive you.`,
		`The ${family} family is a fine choice for a fine person like yourself, ${picker}!`,
	];
	return options[Math.floor(Math.random() * options.length)];

}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// get an array of everything after the prefix, whitespace separated
	const args = message.content.slice(prefix.length).split(/(\s+)/).filter(w => w.trim().length > 0);

	// get the (lower case version) of the first element of the args array, removing it from the array in the process
	const command = args.shift().toLowerCase();

	switch (command) {
	case 'plants':
		message.channel.send('EVEN MORE PLANTS! :herb:');
		break;

	case 'claim':
		if (args.length == 0) {
			message.channel.send(`You need to choose a family, ${message.author}!`);
			break;
		}
		// eslint-disable-next-line no-case-declarations
		const cap_fam_name = args.map(capitalize).join(' ');
		// eslint-disable-next-line no-case-declarations
		const response = pick_family(cap_fam_name, message.author);
		message.channel.send(response);
		break;

	case 'beep':
		message.channel.send('Boop.');
		break;
	case 'boop':
		message.channel.send('Beep.');
		break;


	case 'server':
		message.channel.send(`This server's name is: ${message.guild.name}`);
		break;
	}
});

client.login(token);

// Automatically reconnect if the bot disconnects due to inactivity
client.on('disconnect', function(erMsg, code) {
	console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
	client.connect();
});
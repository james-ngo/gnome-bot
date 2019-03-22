var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const fs = require('fs');
const ytdl = require('ytdl-core');

// Configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// Initilize Discord Bot

var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

var server =

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
	// Our bot needs to know if it will execute a command
	// It will listen for messges that will start with '!'
	if (message.substring(0, 1) == '^') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];

		args = args.splice(1);
		switch(cmd) {
			case 'gnome':
				// join user's voice channel
				for (var channel in bot.channels) {
					if (bot.channels[channel].type == 2) {
						for (var member in bot.channels[channel].members) {
							if (member == userID) {
								bot.joinVoiceChannel(bot.channels[channel].id, function(error, events) {
									if (error) return console.error(error);
									bot.getAudioContext(bot.channels[channel].id, function(error, stream) {
										if (error) return console.error(error);
										ytdl('https://www.youtube.com/watch?v=6n3pFFPSlW4')
	  										.pipe(stream, {end: false});
									});
								});
								break;
							}
						}
					}
				}
			break;
		}
	}
});

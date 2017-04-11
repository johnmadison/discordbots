const Discord = require("discord.js");
const client = new Discord.Client();
var cmd=require('node-cmd');

var config = {
	token: "",
	guild: '',
	username: "JRM",
	id: ''
	};
	
client.on('ready', () => {
	console.log('cli ready!');
	
	//sendmsg('cli ready',chan.bot);
});
var flag = false;
client.on('message', m => {
	var msg = m.content;
	
	
	m.react(':eggplant:');
	
});

client.login(config.token);

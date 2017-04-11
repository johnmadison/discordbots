const Discord = require("discord.js");
const client = new Discord.Client();
var cmd=require('node-cmd');

var config = {
	token: "",
	guild: '',
	username: "JRM",
	id: ''
	};
	
var chan = {
	bot: '',
	general: ''
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	
	//sendmsg('cli ready',chan.bot);
});

client.on('message', m => {
	var msg = m.content;
	console.log(msg);
	console.log(m.author);
	if (msg[0] ==  "/" && m.author.username == config.username && m.author.id == config.id)
	{
		var command = msg.substring(1);
		cmd.get(
        command,
        function(data){
           sendmsg(data, m.channel.id);
        });
        
		m.delete();
		
	}
});

function sendmsg(msg,chan)
{
	client.guilds.get(config.guild).channels.get(chan).sendMessage("```"+msg+"```");
}

client.login(config.token);

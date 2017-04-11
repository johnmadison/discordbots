const Discord = require("discord.js");
const client = new Discord.Client();
var config = {token: ""};
client.on('ready', () => {console.log('gaybot ready!');});
client.on('message', m => {
	m.react("🇬")
	setTimeout(function(){m.react("🇦");},1000);
	setTimeout(function(){m.react("🇾");},2000);
});
client.login(config.token);

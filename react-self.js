const Discord = require("discord.js");
const client = new Discord.Client();
var cmd=require('node-cmd');
var fs = require('fs');
var swearjar = require('swearjar');
var getJSON = require('get-json');
var emoji = require('node-emoji');

var config = {
	token: "",
	guild: '',
	username: "JRM",
	id: ''
	};
	
var chan = {
	general: ''
};

client.on('ready', () => {
	console.log("cli ready!");
});

client.on('message', m => {
	
	var msg = m.content;
	if (msg.substring(0,5) == "react")
	{
		var cmd = msg.split(' ', 3);
		var id = cmd[1];
		var str = cmd[2];
		var target = m.channel.messages.get(id);
				var emojis = trans(str);
				console.log(emojis);

				var i = 0;
				emojis.forEach(function(e) {
					var make_my_func = the_p_func(e,target);
					//I wants to get funced up. 
					setTimeout(()=>make_my_func(),i*1200);
					i++;
					});
				m.delete();
			 
		
	}
});

function trans(str){
	
	var input = str.toUpperCase();
	var nums = [];
	var output = [];
	for (var i=0; i < input.length; i++)
	{
		var index = input.charCodeAt(i);
		index = index - 65;
		nums.push(index);
		output.push(alpha[index]);
	}
	return output;
}

the_p_func = function(emoji,m){
	
	return function(){
		try 
		{ m.react(emoji);}
		catch (e)
		{console.log(e);}
	};
};

var alpha = ["🇦", "🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"];

var red = ['🅰', '🅱',"☪","▶","3️⃣","🚩","↪","♓","ℹ","🗾","👌","1","Ⓜ","♑","🅾","🅿","❓","®","💲","✝","🖖","♈","👐","✖","🐰","💤"];

client.login(config.token);

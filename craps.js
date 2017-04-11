const Discord = require("discord.js");
const client = new Discord.Client();
var http = require('http');
const fs = require('fs');
const low = require('lowdb');
const db = low('db.json');
var _ = require('lodash');
const cmd = require('node-cmd');
db.read();


const config = {
	token:"Mjc0MDM1MzE4NDUyMjU2NzY4.C4bMPg.fAZFc6CsImHZsZDrq8n6dHucCJ8",
	guild: '208292873085386752',
	username: "JRM",
	id: '274035318452256768',
	delay: 6000
};

const chans = {
	general: '208292873085386752',
	bot: '260573474513354753'
};
var adminUsers = ['JRM','h0lybyte'];

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);	
	sendEmbed("Craps is Ready!", chans.bot,0x00FF00);
	//start();
});

client.on('message', m => {
	
	if (m.channel.id == chans.bot && m.author.id == config.id) m.delete(config.delay);
	if (m.content.substring(0,4) == "!craps");
	{
	if (adminUsers.includes(m.author.user))adminhandler(m);
	else handler(m);
	}
	
});

function handler(m)
{
	var cmd = m.content.split(" ");
	if (cmd[1] == "start")start();
	if (cmd[1] == "stop")stop();
}

function adminhandler(m)
{
	
}

var state = {started:false, first: true, pointset: false, point: 0, i:1};

function start()
{
	state.started = true;
	var timer = setInterval(function(){ 
		update(); 
		}, config.delay);
}

function stop()

{
	state.started = false;
	clearInterval(timer);
}

function update()

{
	if (state.first == true)
	{
		sendEmbed("***COME OUT ROLL***",chans.bot,0xFF0000);
		var dice = roll();
		sendmsg("[Dice 1]: "+dice.d1+"\n[Dice 2]: "+dice.d2, chans.bot);
		sendmsg("[Total]: "+dice.total,chans.bot);
		state.first = false;
		
		if (dice.total == 2 ||
			dice.total == 3 ||
			dice.total == 12){
				
			//craps, pass loses. 
			sendEmbed("***CRAPS !!! Pass line loses :(***",chans.bot,0xFF0000);
			reset();
			}
			
		if (dice.total == 7 ||
			dice.total == 11){
				
			//pass wins!
			sendEmbed("***WINNER Pass line wins!***",chans.bot,0x00FF00);
			reset();
			}
		if (dice.total == 4 ||
			dice.total == 5 ||
			dice.total == 6 ||
			dice.total == 8 ||
			dice.total == 9 ||
			dice.total == 10){
				
			if (state.point==0)
				{
				state.point = dice.total;
				state.pointset = true;
				sendEmbed("Point Set at : "+ dice.total, chans.bot,0x0000FF);
				state.i += 1;
				}
			}
	}
	else 
	{
		sendEmbed("*** Roll Number: "+state.i+" ***",chans.bot,0x0000FF);
		var dice = roll();
		sendmsg("[Dice 1]: "+dice.d1+"\n[Dice 2]: "+dice.d2, chans.bot);
		sendmsg("Total: "+dice.total,chans.bot);
		if (dice.total == state.point)
		{
		//pass line wins!	
		sendEmbed("***Pass line wins!***",chans.bot,0x00FF00);
		reset();
		return;
		}
		if (dice.total == 7)
		{
		//pass line loses!
		sendEmbed("***CRAPS !!! Pass line loses :(***",chans.bot,0xFF0000);
		reset();
		return;
		}
		if (dice.total !== 7)
		{
			 sendEmbed("no change, point set at : "+state.point,chans.bot,0x0000FF);
			 state.i += 1;
			 return;
		}
	}
}

function roll()
{
	var d1 = rand(1,6);
	var d2 = rand(1,6);
	var dice = {d1:d1,d2:d2,total:d1+d2};
	return dice;
}

function processBets()
{
	
}

function reset()

{
state.pointset = false;
state.point = false;
state.first = true;
state.i = 1;
sendmsg("***NEW GAME***",chans.bot);

return;
}


client.login(config.token);

function sendmsg(msg,chan)
{
	client.guilds.get(config.guild).channels.get(chan).sendMessage("```javascript\n"+msg+"\n```");
	
	
	
}

function sendEmbed(msg,chan,color)

{
	
	var embed = new Discord.RichEmbed()
              .setColor(color).setDescription(msg);
	client.guilds.get(config.guild).channels.get(chan).sendEmbed(embed);
}

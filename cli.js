const Discord = require("discord.js");
const client = new Discord.Client();
var cmd=require('node-cmd');
var fs = require('fs');
var swearjar = require('swearjar');
var getJSON = require('get-json');

var config = {
	token: "",
	guild: '286892114816794624',
	username: "JRM",
	id: '274035318452256768'
	};
	
var chan = {
	general: '286892114816794624'
};
var frames = [];
client.on('ready', () => {
	
	var raw = fs.readFileSync('sw1.txt').toString();
	var ar = raw.split("\n");
	
	frames = process(ar);
	
	console.log("cli ready!");
	//sendmsg('cli ready',chan.bot);
	
	
	console.log(client.guilds.get('290168555792629772').channels.get('290168556241289226'));
	
});

client.login(config.token);

client.on('message', m => {
	
	if (m.channel.id == "287383627971428353") m.delete(3000);
	
	if (m.channel.id == "288127097061244930" && m.author.username !=="JRM")
	{
		var msg = !m.content.toUpperCase();
		if (!msg.includes("GOD") || 
		!msg.includes("JESUS") || 
		!msg.includes("SPIRIT"))
		{
			m.delete();
		}
		
	}
	
	
	if (swearjar.profane(m.content) && m.channel.id == "288127097061244930")
	{
	
			getJSON('http://labs.bible.org/api/?passage=random&type=json', function(error, response){
			var q = response[0];
			m.reply(q.bookname +" "+q.chapter+":"+q.verse);
			m.reply(q.text);
			flag = false;
			
		});
	m.delete();	
	}
	var msg = m.content;
	if (msg == "/play" && m.author.username == config.username && m.author.id == config.id) play(m);
	
	
	if (msg =="/prune" && m.author.username == config.username && m.author.id == config.id) remove(m);
	//console.log(msg);
	//console.log(m.author);
	if (msg[0] ==  "/" && m.author.username == config.username && m.author.id == config.id)
	{
		var command = msg.substring(1);
		cmd.get(
        command,
        function(data){
          // sendmsg(data, m.channel.id);
          m.edit("```"+data+"```");
        });
        
		//m.delete();
		
	}
});

function sendmsg(msg,chan)
{
	client.guilds.get(config.guild).channels.get(chan).sendMessage("```"+msg+"```");
}

var kirby = ["(>'-')>","<('-'<)","^('-')^","v('-')v","(>'-')>"];
var i = 0;
function dance(m)
{
	
	m.edit(kirby[i]);
	i++;
	if (i == kirby.length) i = 0;
	setTimeout(function(){ dance(m); }, 1000);
}
var index = 0;
function play(m)
{
	
	m.edit("```\n"+frames[index].text+"\n```");
	index++;
	setTimeout(function(){ play(m); }, 1200);
}

var k = 1;
function cock(m)
{

	var out = "8";
	out += shaft(k);
	out += ">";
	k++;
	if (k > 100) return;
	m.edit(out);
	setTimeout(function(){ cock(m); }, 2000);
}
function shaft(n)
{var out = "";
for (var i = 0; i < n; i ++) out += "=";
return out;	
}

function process(ar)
{
	var c = 0;
	var i = 0;
	var len = ar.length;
	var frames = [];
	var output = "";
	for (i;i<len;i++)
	{
		
		if (c==0)
		{
			var delay = ar[i];
			c++;
		}
		else
		{
			output += ar[i]+"\n";
			c++
			if (c==14)
			{
				c = 0;
				var frame = {delay:delay,text:output};
				frames.push(frame);
				output = "";
			}
		}
	}
	return frames;
}
function remove(m)
{
	m.channel.fetchMessages({limit: 30})
 .then(messages => messages.every(msg => msg.delete()))
 .catch(console.error);
}


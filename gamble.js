const Discord = require("discord.js");
const client = new Discord.Client();
var http = require('http');
const fs = require('fs');
const low = require('lowdb');
const db = low('db.json');
var _ = require('lodash');
db.read();

var adminUsers = [];

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

var rude = ["nice try... please insert another token",
"think you can hack this?","cool trick bro",
"wrong...","trying to break this?","why do you think that would do something?",
"are you a potato?","dude seriously?","get a life....",
"is this how you get your kicks? typing weird inputs?",
"i bet you still wet the bed","does your mom know you're online?",
"you should probably quit the internet","fite me skrub",
"seriously, did you read the help command or are you just stupid?",
"why did you think that would work","oi vey....",
"keep trying... maybe you'll find the back door command",
"i bet u cant find the backdoor command",
"there really isn't a backdoor, or is there.....",
"i bet you have a 'love-pillow' that you sleep with",
"abandon all hope, all ye who enter....",
"how many of these responses are there?",
"I bet it took a long time to think up these responses...",
"this is a very self referential bot.",
"did you ever wonder what it would be like to be a potato?",
"are you trying to be funny?",
"I don't get it....","get shrekt","get shr3k7","good try skrubl0rd",
"keep on tryin....","why would you think that would work?",
"are you disabled?","Sponsored by COOL Ranch Doritos - TASTE THE RANCH!!!",
"The password is 1234i<3poni3z... dont tell ne1 tho"
];

var wheel = [
{id:"0",color:'green'},
{id:1,color:'red'},{id:2,color:'black'},{id:3,color:'red'},{id:4,color:'black'},{id:5,color:'red'},{id:6,color:'black'},{id:7,color:'red'},{id:8,color:'black'},{id:9,color:'red'},
{id:10,color:'black'},{id:11,color:'black'},{id:12,color:'red'},{id:13,color:'black'},{id:14,color:'red'},{id:15,color:'black'},{id:16,color:'red'},{id:17,color:'black'},{id:18,color:'red'},
{id:19,color:'red'},{id:20,color:'black'},{id:21,color:'red'},{id:22,color:'black'},{id:23,color:'red'},{id:24,color:'black'},{id:25,color:'red'},{id:26,color:'black'},{id:27,color:'red'},
{id:28,color:'black'},{id:29,color:'black'},{id:30,color:'red'},{id:31,color:'black'},{id:32,color:'red'},{id:33,color:'black'},{id:34,color:'red'},{id:35,color:'black'},{id:36,color:'red'},
{id:"00",color:'green'}
];

var col1 = [1,4,7,10,13,16,19,22,25,28,31,34];
var col2 = [2,5,8,11,14,17,20,23,26,29,32,35];
var col3 = [3,6,9,12,15,18,21,24,27,30,33,36];

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);	
});

var helptext = "```javascript\nExample usage: '!rou <bet> optional:<stake>' i.e. '!rou black 10' or just '!rou black' (the default stake is 1) \nValid Bets: 'even, odd, red, black, green, 1to18, 19to36, 1st12, 2nd12, 3rd12, col1, col2, col3' \nAfter your bet you can specify your stake example: '!rou black 10' is a bet on black for 10 credits.\nType '!rou board' to see a picture of the board\nType: '!rou bal' to get your balance\nYou can also bet on a single number like this '!rou 22' or '!rou 12'\n'!rou bottom5' and '!rou top5' return their respective values.```";
client.on('message', message => {
	console.log(message.content);
	var msgid = message.channel.id;
	msgid = msgid.toString();
	
	//check for #general or not
	if (msgid == "208292873085386752") return;

	var msg = message.content;
	
	if (msg.substring(0,4) == "!rou")
	{
		roulette(message,msg);
	}
});

function upWin(message, win, stake)
{
	var res = upBal(message.author.username, stake);
	message.reply(win);
	message.reply(res.msg);
}

function upLose(message, lose, stake)
{
	var res = upBal(message.author.username, stake);
	message.reply(lose);
	message.reply(res.msg);
}

function upBal(name, val)
{
	var user = db.get('users').find({ name: name}).value();
	user.bal = parseInt(parseInt(user.bal) + parseInt(val));
	//update the db
	fs.writeFileSync('db.json', JSON.stringify(db.getState()));
	return {msg: "updated user "+ name+" by "+val+", new balance is "+user.bal, name: name, val: val, newbal: user.bal};
}

function getallUsers()
{
	const users = db.get('users').value();
	return users;
}

function bottom5()
{
	var users = db.get('users').value();
	users = sortbykey(users, "bal");
	users = users.slice(0,5);
	return users;
}

function top5()
{
	var users = db.get('users').value();
	users = sortbykey(users, "bal");
	users = users.reverse();
	users = users.slice(0,5);
	return users;
}
	
function getBal(name)
{
	var user = db.get('users').find({ name: name}).value();
	return user.bal;	
}

function getUserByName(name)
{
	var user = db.get('users').find({ name: name}).value();
	return user;
}

function getUserById(id)
{
	var user = db.get('users').find({ id: id}).value();
	return user;
}

function sortbykey(array, key) 
{
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });   
}

function giveUser(msg)
{
	var cmd = msg.content.split(" ");
	var receiver = cmd[2];
	var amount = parseInt(cmd[3]);
	var request = upBal(receiver,amount);
	msg.reply(request.msg);
}

function trans(msg,sender,bal)
{
	
	var cmd = msg.content.split(" ");
	var receiver = cmd[2];
	var amount = parseInt(cmd[3].replace(/\D/g,''));
	
	if (amount > bal) 
	{
		msg.reply("not enough funds to complete transaction");
		return;
	}
	if (amount <= 0) 
	{
		msg.reply("negative amount");
		return;
	}
	var request = upBal(receiver,amount);
	msg.reply(request.msg);
	var request = upBal(sender,amount * -1);
	msg.reply(request.msg);
}



function roulette(message,msg)
{
	var lucky = wheel[rand(0,wheel.length)];
	var cmd = msg.substring(5);
	var ar = cmd.split(" ");
	
	if (ar.length > 0)var bet = ar[0];
	else var bet = "";
	
	if (ar.length > 1) var stake = parseInt(ar[1].replace(/\D/g,''));
	else var stake = 1;
	
	var bal = getBal(message.author.username);
	

	if (bet == "give" && adminUsers.includes(message.author.username))
	{
			giveUser(message);
			return;
	}
	
	if (bet == "give" && !adminUsers.includes(message.author.username))
	{
			
			trans(message, message.author.username,bal);
			return;
	}
	
	
	if (bet == "stop" && adminUsers.includes(message.author.username))
	{
			message.reply("stopping...");
			process.exit();
	}
	if ( bal <= 0 || stake > bal)
	{
		message.reply("Not Enough Funds!!!");
		return;
	}
	
	if (stake > 500) 
	{
		message.reply("That bet is too rich for our blood, slow your roll....");
		return;
	}
	
	
	
	
	if (bet == "")
	{
		message.reply("type '!rou help' for a list of valid bets and commands");
		return;
	}

	if (bet == "help" || bet == "hlp" || bet == "h")
	{ 
		message.reply(helptext);
		return;
	}
	
	if (bet == "getbal" || bet =="bal")
	{
		message.reply("your balance is: "+getBal(message.author.username));
		return;
	}
	if (bet == "top5")
	{	
		var temp = top5();
		message.reply("```javascript\n[1: "+temp[0].name+" "+temp[0].bal+"],\n[2: "+temp[1].name+" "+temp[1].bal+"],\n[3: "+temp[2].name+" "+temp[2].bal+"],\n[4: "+temp[3].name+" "+temp[3].bal+"],\n[5: "+temp[4].name+" "+temp[4].bal+"],\n```");
		return;
	}
	if (bet == "bottom5")
	{	
		var temp = bottom5();
		message.reply("```javascript\n[1: "+temp[0].name+" "+temp[0].bal+"],\n[2: "+temp[1].name+" "+temp[1].bal+"],\n[3: "+temp[2].name+" "+temp[2].bal+"],\n[4: "+temp[3].name+" "+temp[3].bal+"],\n[5: "+temp[4].name+" "+temp[4].bal+"],\n```");
		return;
	}
	
	if (bet == "board"){
		 message.reply("http://datagenetics.com/blog/july12015/table.jpg");
		 return;
	}
	var win = "```diff\n+ "+lucky.id +" " +lucky.color + " - Congrats! You Win! :) ```" ;
	var lose = "```diff\n- "+lucky.id + " " + lucky.color  + " - Sorry you lose :( ```" ;
	//console.log(bet);
	//console.log(lucky);
	switch (bet)
	{
		case "odd":
		if (lucky.id % 2 !== 0 && lucky.color !== "green") upWin(message, win, stake * 1);
		else upLose(message, lose, stake * -1); 
		break;
		case "even":
		if (lucky.id % 2 == 0 && lucky.color !== "green") upWin(message, win, stake * 1);
		else upLose(message, lose, stake * -1); 
		break;
		case "red":
		if (lucky.color == "red") upWin(message, win, stake * 1);
		else upLose(message, lose, stake * -1);
		break;
		case "black":
		if (lucky.color == "black") upWin(message, win, stake * 1);
		else upLose(message, lose, stake * -1);
		break;
		case "green":
		if (lucky.color == "green") upWin(message, win, stake * 34);
		else upLose(message, lose, stake * -1);
		break;
		case "1to18":
		if (lucky.id > 0 && lucky.id < 19) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "19to36":
		if (lucky.id > 18 && lucky.id < 37) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "1st12":
		if (lucky.id > 0 && lucky.id < 13) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "2nd12":
		if (lucky.id > 12 && lucky.id < 25) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "3rd12":
		if (lucky.id > 24 && lucky.id < 37) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "col1":
		if (col1.indexOf(lucky.id)!== -1) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "col2":
		if (col2.indexOf(lucky.id)!== -1) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		case "col3":
		if (col3.indexOf(lucky.id)!== -1) upWin(message, win, stake * 2);
		else upLose(message, lose, stake * -1);
		break;
		default:
		if (bet == "00" || bet == "0")
			{
				if (lucky.color == "green") upWin(message, win, stake * 34);
				else upLose(message, lose, stake * -1);
			}
		if (bet > 36 || bet < 0)
			{
				message.reply("invalid bet, type '!rou help' for list of bets");
			}
		else 
		{	
			if (bet == lucky.id) upWin(message, win, stake * 999);
			else if (bet >= 1 && bet <= 36) upLose(message,lose, stake * -1   );
			else message.reply(rude[rand(0,rude.length)]);
			
		}
		break;
	}
}

client.login("Mjc0MDM1MzE4NDUyMjU2NzY4.C4bMPg.fAZFc6CsImHZsZDrq8n6dHucCJ8");





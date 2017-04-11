const Discord = require("discord.js");
const client = new Discord.Client();
var Request = require('request');
var http = require('http');

var config = {};
config.token = "YOUR TOKEN";
config.guild = "YOUR GUILD";
config.username = "YOUR USERNAME"

const Endpoint = "https://discordapp.com/api/v6/guilds/"+config.guild+"/members/@me/nick";

var kirby = ["(>'-')>","<('-'<)","^('-')^","v('-')v","(>'-')>"];

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function dance()
{
	return config.username + " " + kirby[rand(0,kirby.length)];
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	nc();
});
// the initial delay factor. 
const repeat = 2000;

function nc(){
        const Data = {
			nick: dance(), 
            token: config.token
        }
        const Headers = {
            authorization: config.token,
            'content-type': 'application/json'
        }
        Request({
            method: 'PATCH',
            headers: Headers,
            json:    Data,
            uri:     Endpoint
        }, (Error, Response, Body) => {
            console.log(Body);
            var delay = Body.retry_after;
            if(Body.message === 'You are being rate limited.') 
            {
				var t = setTimeout(()=>{nc();},repeat+delay);
			}
			else
			{
				var t = setTimeout(()=>{nc();},repeat);
			}
        });
	}
client.login(config.token);



const Discord = require("discord.js");
const client = new Discord.Client();
var http = require('http');
var getJSON = require('get-json');

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


var img = ['./git.png','./gud.png','./skrub.png'];
function f(obj) {
    for (var a in obj) return a;
}
client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	//console.log(f(client.guilds));
	//client.rest.methods.getGuildMember(f(client.guilds) ,client.user).then(function(){},console.log("error"));
	

	var i = 0;

	var interval = setInterval(() => {
			
            client.user.setAvatar(img[i])
			.then(function(){
				console.log(img[i]);
				i++;
				
				if (i == img.length) i = 0;
				console.log(`New avatar set!`);
				client.user.setGame("PONG");
			})
			.catch(console.error);

        }, 1200);
	
});

var started = false;
var member = {};
client.on('message', message => {
	
	console.log(JSON.stringify(message.member));
   //message.author.id == client.user.username
    /*if (1) {
        
        var interval = setInterval(() => {
            //var random = message.guild.members.random().user.username;
            message.member.setNickname(zstr());
           
        }, 1000);
    }*/
  
});



client.login("Mjc0MDM1MzE4NDUyMjU2NzY4.C4bMPg.fAZFc6CsImHZsZDrq8n6dHucCJ8");



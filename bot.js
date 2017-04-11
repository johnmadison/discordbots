const Discord = require("discord.js");
const client = new Discord.Client();
var Request = require('request');
const Endpoint = "https://discordapp.com/api/v6/guilds/YOURUSERID/members/@me/nick";
var http = require('http');
var getJSON = require('get-json');
var options = {
  host: 'api.coindesk.com',
  path: '/v1/bpi/currentprice/USD.json'
};

var config = {};
config.token = "";

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function btc(){
	  var body = {};
	var req = http.get(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  var b = res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
	}).on('end', function() {
     body = Buffer.concat(bodyChunks);
    //console.log('BODY: ' + body);
    // ...and/or process the entire body here.
	localStorage.setItem('body', body);
  });

});

return req;

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

}
btc();




var base = 10000;
var a = [];
for (var i = 0; i < base; i++)
{
	a.push(String.fromCharCode(i+64));
}

var j = "ĴĵJʝЈјژǰ૭ⅉ⒥Ⓙⓙ";
var r = "®ℜRrŔřŗŖƦȐȑЯ";
var m = "ΜmɱʍҦӍӎਅற";

var kirby = ["(>'-')>","<('-'<)","^('-')^","v('-')v","(>'-')>"];

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomstr(n)
{
	var output= "";
	for (var i =0; i<n; i++)
	{
		output += a[r(0,9999)];
	}
	return output;
}

function jrm()
{
	var output ="";
	output += j[rand(0,j.length)];
	output += r[rand(0,r.length)];
	output += m[rand(0,m.length)];
	return output;
}

function dance()
{
	return jrm() + " " + kirby[rand(0,kirby.length)];
}
var i = 9999;
function zstr()
{
	//var name = client.user.username;
	
	var name = dance();
	i--;
	if (i < 0) return "SEGMENTATION FAULT";
	return name;
}



client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	var btcprice = JSON.parse(localStorage.getItem('body'));
	console.log(btcprice.bpi.USD.rate_float.toFixed(0));
	
	setInterval(() => {
  

        const Data = {
            nick: zstr(),
            token: config.token
        }

        const Headers = {
            authorization: Data.token,
            'content-type': 'application/json'
        }

        Request({
            method: 'PATCH',
            headers: Headers,
            json:    Data,
            uri:     Endpoint
        }, (Error, Response, Body) => {
            console.log(Body);
            if(Body.message === 'You are being rate limited.') i--;
        });

    }, 1500);
});


var started = 0;
client.on('message', message => {
	
	if (message.content === '!ifyerhappyandyouknowit') 
     {
		 message.reply("Clap your hands! *clap clap*");
	}
	if (message.content === "!poke")
	{
	getJSON('http://pokeapi.co/api/v2/pokemon/'+rand(1,719), function(error, response){
		var poke = response.name;
		var image = "http://www.pokestadium.com/assets/img/sprites/official-art/"+poke+".png";
		message.reply(image);
	});
    //var poke = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+rand(1,151)+".png";
    //message.reply(poke);
	
	}
	
	//admin stuff after here
	if (message.author.username !== client.user.username) return;
     if (message.content === '!btcprice') 
     {
	var btcprice = JSON.parse(localStorage.getItem('body'));
	var usd = btcprice.bpi.USD.rate_float.toFixed(2);
	message.reply("USD: $"+usd);
		 
	}
	
	
        
   //message.author.id == client.user.username
    /*if (1) {
        
        var interval = setInterval(() => {
            //var random = message.guild.members.random().user.username;
         
			    if (message.member !== "null")
			    {
					var temp = message.member;
				}
			    temp.setNickname(zstr());
			
				
			
           
        }, 1000);
    }*/
  
});



client.login(config.token);


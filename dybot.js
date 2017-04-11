const Discord = require("discord.js");
const client = new Discord.Client();
var Request = require('request');
var $ = require('jquery');
var cmd=require('node-cmd');

var http = require('http');
var getJSON = require('get-json');
var options = {
  host: 'api.coindesk.com',
  path: '/v1/bpi/currentprice/USD.json'
};

const randomWord = require('random-word');

var swearjar = require('swearjar');

var config = {};
config.token = "";
config.guild = "286892114816794624";

const Endpoint = "https://discordapp.com/api/v6/guilds/"+config.guild+"/members/@me/nick";

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function btc(){
	  var body = {};
	var req = http.get(options, function(res) {
  var bodyChunks = [];
  var b = res.on('data', function(chunk) {
    bodyChunks.push(chunk);
	}).on('end', function() {
     body = Buffer.concat(bodyChunks);
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
var m = "ΜmɱʍҦӍӎਅற﷽";

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

var name ="";

function rig()
{
	
	cmd.get(
        "rig",
        function(data){
        
        var temp = data.split("\n");
        
       
       name =  temp[0] ;
        
        });	
        
   
}

function righelper()
{
	rig();
	return name;
}


function dance()
{
	return jrm() + " " + kirby[rand(0,kirby.length)];
}
var i = 9;
function zstr()
{
	//var name = client.user.username;
	
	var name = dance();
	i--;
	if (i < 0) 
	{
		if (i == -10)
		{
		i = 9999;
		return "Resetting Grid...";
		}
		return "Segmentation fault"+i;
	}
	
	return name+a[i];
}





client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	//client.guilds.get('286892114816794624').channels.get('208292873085386752').sendMessage('sup doods');
	var btcprice = JSON.parse(localStorage.getItem('body'));
	console.log(btcprice.bpi.USD.rate_float.toFixed(0));
	//start da name changa
	nc();
	
		
});

const repeat = 10000;
function penis(n,str)
{
	var output = "8";
	for (var i=0; i < n; i++)
	{
		output += "=";
	}
	output += ">";
	output += " "+str;
	return output;
}
function nc(){

        const Data = {
			//uncomment for dancing name
            //nick: zstr(), 
            nick: righelper(),
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

var started = 0;
client.on('message', message => {
	
	

	

	
	
	if (message.content === "!poke")
	{
	getJSON('http://pokeapi.co/api/v2/pokemon/'+rand(1,719), function(error, response){
		var poke = response.name;
		var image = "http://www.pokestadium.com/assets/img/sprites/official-art/"+poke+".png";
		message.reply(image);
	});

	}
	if (message.content === '!btcprice') 
     {
	var btcprice = JSON.parse(localStorage.getItem('body'));
	var usd = btcprice.bpi.USD.rate_float.toFixed(2);
	message.reply("USD: $"+usd);
		 
	}
	if (message.content === '!btcpenis') 
     {
	var btcprice = JSON.parse(localStorage.getItem('body'));
	var usdbefore = btcprice.bpi.USD.rate_float.toFixed(2);
	usd = parseInt(usdbefore/100);
	message.reply(penis(usd,usdbefore));
		 
	}
	
	//admin stuff after here
	if (message.author.username !== client.user.username) return;
     
	
});


function getword() {

return jrm() + randomWord();

}


client.login(config.token);



const fs = require('fs');
const low = require('lowdb');
const db = low('db.json');
const Discord = require("discord.js");
const client = new Discord.Client();



var config = {};
config.token = "";
config.ep = "";

client.on('ready', () => {
client.guilds.first().fetchMembers().then(function (response) {
   parsemembers(response);
}, function (error) {
    console.error('uh oh: ', error);   // 'uh oh: something bad happened’
});



});

function parsemembers(input)
{
	const members = input.members;
	members.forEach(function(member) {
    console.log(member.user.username);
    db.get('users')
  .push({ name: member.user.username, bal: 2000 , id: member.user.id})
  .write();
});


fs.writeFileSync('db.json', JSON.stringify(db.getState()));

console.log("success!");

process.exit();
}


db.defaults({ users: [] })
  .write();
  

  


client.login(config.token);



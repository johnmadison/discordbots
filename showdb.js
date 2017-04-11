


function main()

{
	
console.log(getBal("JRM"));

var update = upBal("JRM",93);

console.log(update.msg);

process.exit();
	
}

function upBal(name, val){

var user = db.get('users')
  .find({ name: name})
  .value();
  
 //console.log(user.bal);
 
 user.bal = user.bal + val;
 
 //console.log(user.bal);
 
 fs.writeFileSync('db.json', JSON.stringify(db.getState()));
 
 return {msg: "updated user "+ name+" "+val+", new balance is "+user.bal, name: name, val: val, newbal: user.bal};
}




function getallUsers()
{
	const users = db.get('users').value();
	return users;
}


function showtop5()
{
	
}

function getBal(name)
{
	var user = db.get('users')
  .find({ name: name})
  .value();
  return user.bal;	
}

function getUserByName(name)
{
	var user = db.get('users')
  .find({ name: name})
  .value();
  
  return user;
}

function getUserById(id)
{
	var user = db.get('users')
  .find({ id: id})
  .value();
  
  return user;
}

//main();


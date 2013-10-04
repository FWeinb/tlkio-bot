var request = require('request');

module.exports  = {

  description : 'Recieve a random cat',
  usage       : 'kitteh',
  activate    : true,

  register : function(client, plugins){

    client.registerCommand("kitteh", function(message){

    	request({
    		url: "http://thecatapi.com/api/images/get?format=src&type=gif",
    		followRedirect: false
    	}, function(error, response){
    		if(!error)
    			client.say(response.headers.location);
    	})

    });

  }
};

var pck = require("../package.json");

module.exports  = {

  description : 'ask me who I am',
  usage       : 'info',

  register : function(client, plugins){

    client.registerCommand("info", function(message){
      var age = pck.version.split(".");
      	  age[0] = age[0] + ".";
      	  age = age[0] + age[1] + age[2];
      client.say("My name is " + pck.name + ", but my friends call me " + pck.alias + ". \
      	I'm currently in v" + pck.version + " \
      	(Which'd probably translate to " + age*10 + " in human years)...  \n \
      	My lovely master is " + pck.author + ", and he licensed me under the " + pck.license + "-license");
    });

  }

};
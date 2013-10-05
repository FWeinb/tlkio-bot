var request = require('request');

module.exports  = {

  description : 'Recieve a random cat',
  usage       : 'kitteh',

  register : function(client, plugins){

    var kittehLink = function(rand){
      return "http://thecatapi.com/api/images/get?format=src&type=gif&t="+rand+"&tlkio=.gif";
    };

    client.registerCommand("kitteh", function(message){
      if (message.commands.length === 0){
        client.say(kittehLink(+new Date()));
      }else if(message.commands.length > 0 && message.commands[0] === "bomb"){
        var count = message.commands[1] || 5;
        for (var i=0;i<count;i++){
          client.say(kittehLink((+new Date()) + '' + i));
        }
      }

    });


  }
};

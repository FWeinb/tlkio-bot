module.exports  = {

  description : 'Reverse a string',
  usage       : 'reverse %string%',
  activate    : true,

  register : function(client, plugins){

    client.registerCommand("reverse", function(message){
      client.say(message.commands[0].split("").reverse().join(""));
    });

  }

};
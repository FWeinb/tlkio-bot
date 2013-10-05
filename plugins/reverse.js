module.exports  = {

  description : 'Reverse a string',
  usage       : 'reverse %string%',


  register : function(client, plugins){

    client.registerCommand("reverse", function(message){
      client.say(message.text.split('').reverse().join(''));
    });

  }

};

module.exports  = {

  description : 'Make me say something to a specific user',
  usage       : 'tell @user %string%',

  register : function(client, plugins){
    var that = this;

    client.registerCommand("tell", function(message){

      if(message.commands.length <= 1){
        client.say('Usage: '+that.usage);
        return;
      }

      client.say(message.commands.join(" "));
    });

  }

};
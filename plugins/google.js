module.exports  = {

  description : 'let me google for you',
  usage       : 'google|g %query%',

  register : function(client, plugins){
    var that = this;


    client.registerCommand(['google', 'g'], function(message){
      if (message.commands.length === 0){
        client.say('Usage: '+that.usage);
        return;
      }
      var query = message.commands.join(' ');
      client.say('Here is the google link ['+query+'](http://google.com/#q='+query+')');
    });

  }
};
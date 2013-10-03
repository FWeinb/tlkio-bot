module.exports  = {

  description : 'To get this help message',
  usage       : 'help|?',

  register : function(client, plugins){
    var helpMessage = '';

    plugins.forEach(function(plugin){
      helpMessage += '**'+plugin.usage.toLowerCase() + '** : ' + plugin.description + '  \n';
    });


    client.registerCommand(['help', '?'], function(message){
      client.say(helpMessage);
    });


  }

};
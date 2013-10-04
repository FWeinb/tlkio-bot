module.exports  = {

  description : 'Show a list of all or one specific plugin',
  usage       : '(help|?) || (help|?) %plugin%',


  register : function(client, plugins){

    client.registerCommand(['help', '?'], function(message){
      var msg = "";

      if(message.commands.length === 0){
        plugins.forEach(function(plugin){
          if (plugin.command)
            msg += "**" + plugin.usage + "**: " + plugin.description + ".  \n";
        });

        client.say(msg);
      }else{
        plugins.forEach(function(plugin){
          if (plugin.name.toLowerCase().indexOf(message.commands[0].toLowerCase()) === 0){
            console.log(plugin);
            if(plugin.activate){
              msg += "How to **" + message.commands[0] + "**, you say?  \n";
              msg += "Well, it's quite easy to **" + plugin.description.toLowerCase() + "** actually! ";
              msg += "Simply use this command \"**" + plugin.usage + "**\" and I shall grant you your uttermost desired wish...";
            }else{
              msg = "Well, **" + message.commands[0] + "**.js does exist but haven't been activated by my wonderful master.";
            }
            return false;
          }
          return true;
        });
        if(msg){ client.say(msg); }else{ client.say("Plugin **"+message.commands[0]+"**.js could not be found."); }
      }

    });

  }

};
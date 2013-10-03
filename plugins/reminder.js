module.exports  = {

  description : "Set a reminder for a specific period of time (e.g 1h55m)",
  usage       : "remindMeIn hhmmss",
  activate    : true,

  register : function(client, plugins){
    var that = this;

    client.registerCommand("remindMeIn", function(message){
      if(message.commands.length === 0){
        client.say("Usage: "+that.usage);
        return false;
      }else if(message.commands.length >= 2){
        client.say("Usage: "+that.usage);
        return false;
      }

      var time = ["","","",0];

      if(message.commands[0].indexOf("h") != -1){
        time[0] = message.commands[0].split("h")[0]*3600000;
      }
      if(message.commands[0].indexOf("m") != -1){
        if(message.commands[0].indexOf("h") != -1){
          time[1] = message.commands[0].split(/[hm]/)[1]*60000;
        }else{
          time[1] = message.commands[0].split("m")[0]*60000;
        }
      }
      if(message.commands[0].indexOf("s") != -1){
        if(message.commands[0].indexOf("m") != -1){
          time[0] = message.commands[0].split(/[ms]/)[1]*1000;
        }else if(message.commands[0].indexOf("h") != -1){
          time[0] = message.commands[0].split(/[hs]/)[1]*1000;
        }else{
          time[0] = message.commands[0].split("s")[0]*1000;
        }
      }

      time[3] = time[0]+time[1]+time[2];

      client.say("Sure thing @"+message.fromUser.nickname+"! I'll remind you in "+message.commands[0]+"...");
      setTimeout(function(){
        client.say("Hey, @"+message.fromUser.nickname+"..? Remember that you asked me to remind you? Well, it's time.");
      }, time[3]);
    });

  }
};
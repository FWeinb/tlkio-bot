module.exports  = {

  description : "Set a reminder for a specific period of time (e.g 1h55m0s)",
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

      var arr = message.commands[0].split(/[hms]/),
          time = 0;
      for(var i=0; i<arr.length; i++){
        if(i==0) time = time+arr[i]*3600000;
        if(i==1) time = time+arr[i]*60000;
        if(i==2) time = time+arr[i]*1000;
      }

      client.say("Sure thing @"+message.fromUser.nickname+"! I'll remind you in "+message.commands[0]+"...");
      setTimeout(function(){
        client.say("Hey, @"+message.fromUser.nickname+"..? Remember that you asked me to remind you? Well, it's time.");
      }, time);
    });

  }
};
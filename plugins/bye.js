module.exports  = {

  description : 'Never again leave without a friendly goodbye',
  usage       : 'Bye',

  register : function(client, plugins){

    var phrases = ['Bye', 'Cu', 'Cya', 'Goodbye', 'G\'night', 'See you', 'Night', 'Later!'];

    client.registerCommand(phrases, function(message){
      client.say("@"+message.fromUser.name+" "+phrases[Math.floor(Math.random()*phrases.length)]);
    });

  }
};

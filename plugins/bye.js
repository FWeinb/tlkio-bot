module.exports  = {

  description : 'Never again leave without a friendly goodbye',
  usage       : 'Bye',
  activate    : true,

  register : function(client, plugins){

    var phrases = ['Bye', 'Cu', 'Cya', 'Goodbye', 'G\'night', 'See you', 'Night', 'Later!'];

    client.registerCommand(phrases, function(message){
      client.say("@"+message.fromUser.nickname+" "+phrases[Math.floor(Math.random()*phrases.length)]);
    });

  }
};

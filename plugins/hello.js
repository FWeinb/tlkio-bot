module.exports  = {

  description : 'let me say hi to you',
  usage       : 'Hi',
  activate    : true,

  register : function(client, plugins){

    var phrases = [ 'Hi', 'Hai', 'Hi!', 'Haj', 'Hey', 'Hello', 'Hellow', 'Hallo!', 'Herrow'];

    function getRandomHi(){
      return phrases[Math.floor(Math.random()*phrases.length)];
    }

    function sendHi(nickname){
      client.say('@'+nickname + ' ' + getRandomHi());
    }

    client.registerCommand(phrases, function(message){
      sendHi(message.fromUser.nickname);
    });

  }
};

module.exports  = {

  description : 'let me say hi to you',
  usage       : 'Hi',

  register : function(client, plugins){

    var phrases = [ 'Hi', 'Hai', 'Hi!', 'haj', 'Hey'];

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
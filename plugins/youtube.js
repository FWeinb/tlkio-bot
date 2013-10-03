var request = require('request');

module.exports  = {

  description : 'Search on YouTube and get a random video',
  usage       : 'youtube|yt %searchTerm%',

  register : function(client, plugins){
    var that = this;

    client.registerCommand(['youtube', 'yt'], function(message){

      if (message.commands.length === 0) {
        client.say('Usage: '+ that.usage);
       return;
      }

      var searchterm = message.commands.join('');

      request('http://gdata.youtube.com/feeds/api/videos?q='+searchterm+'&v=2&alt=jsonc', function(error, response, body){
        if (error){
          client.say('Sorry, try again later');
          return;
        }

        try{
          var json = JSON.parse(body);

          if (json.data.items.length !== 0){
            var randomID = Math.floor(Math.random()*json.data.items.length);
            var title = json.data.items[randomID].title;
            client.say('['+title+'](http://www.youtube.com/watch?v='+json.data.items[randomID].id+')');
          }else{
            client.say('Nothing found for: '+searchterm);
          }
        }catch (e){
          client.say('Nothing found for: '+searchterm);
        }
      });
    });


  }
};

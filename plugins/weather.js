var weather = require('openweathermap');
    weather.defaults({units:'metric', lang:'en', mode:'json'});

module.exports  = {

  description : 'Will show the current weather',
  usage       : 'weather %location%',

  register : function(client, plugins){
    var that = this;

    client.registerCommand('weather', function(message){

      if (message.commands.length === 0) {
        client.say('Usage: '+that.usage);
        return;
      }

      var serachFor = message.commands.join(' ');

      if (serachFor.length >= 3){
        try{
          weather.find({q: serachFor, cnt:1}, function(weatherData){
              if (weatherData.count > 0){
                var list = weatherData.list[0];
                client.say('It\'s '+list.main.temp+'°C in ['+serachFor + '](http://maps.google.com/maps?z=12&t=m&q=loc:'+list.coord.lon+'+-'+list.coord.lat+'); ' + list.weather[0].description);
              }else{
                client.say('Nothing found');
              }
          });
        }catch (e){
          client.say('Nothing found');
        }
      }else{
        client.say('The location must contain at least 3 chars');
      }
    });


  }

};


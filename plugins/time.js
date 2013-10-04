var moment = require('moment');

module.exports  = {

  description : 'Get current time',
  usage       : 'time',

  register : function(client, plugins){
    client.registerCommand('time', function(data){
      client.say('It is ' + moment.utc().format('h:mm')+'h (utc)');
    });
  }

};

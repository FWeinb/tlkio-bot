var moment = require('moment');

module.exports  = {

  description : 'Get current time',
  usage       : 'time',
  activate    : true,

  register : function(client, plugins){
    client.registerCommand('time', function(data){
      client.say('It is ' + moment().format('h:mm')+'h');
    });
  }

};

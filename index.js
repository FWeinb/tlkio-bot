var coffeeScript  = require('coffee-script'),
    TlkioClient   = require('tlkio-client'),
    PluginManager = require('./lib/Plugins');


// Extend the TlkioClient with a registerCommand function
TlkioClient.prototype.registerCommand = function(command, callback){
  var that = this;

  if (callback === undefined) return;

  console.log("Add Command(s):", command);

  if (command instanceof String || typeof(command) === 'string'){
    that.on('command__'+command.toLowerCase(), callback);
  }else if (command instanceof Array){
    command.forEach(function(item){
      that.on('command__'+item.toLowerCase(), callback);
    });
  }
  return this;
};


// The connection
var config = require('./config');
    config.room = process.argv[2] || config.room;

// Create new client
var client = new TlkioClient(config);

// If init is done
client.on('init', function(tlkio){
  console.log('['+tlkio.user.nickname+'] Joined Room: ' + tlkio.room);


  client.on('message', function(message){
    var messageText = message.text;

    if (messageText.toLowerCase().indexOf('@'+tlkio.user.nickname.toLowerCase()) === 0){
      var commands = messageText.trim().toLowerCase().split(' ');
      if (commands.length > 0){
          var keyCommand = commands[1].toLowerCase();

          // Remove the first two commands
          commands.shift();
          commands.shift();

          message.commands = commands;

          // Invoke the command
          client.emit('command__'+keyCommand, message);
      }
    }
  });

  // Create a PluginManager and scan for plugins
  new PluginManager(client).scan('./plugins');
});




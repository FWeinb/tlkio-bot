var TlkioClient   = require('./lib/tlkio-client'),
    PluginManager = require('./lib/Plugins');

// The connetion
var config = require('./config');

config.channel = process.argv[2] || config.channel;


console.log('[Bot] Started ', config);

// Create new Client
var client = new TlkioClient(config);

// If init is done
client.on('init', function(connection){

  // Create a PluginManager
  new PluginManager(client)
  .scan('./plugins');


});



var fs    = require('fs'),
    p     = require('path');

function Plugins(client) {
  this.client  = client;
  this.plugins = [];
}

Plugins.prototype  = {

  scan : function scan(path) {
    var that = this;

    fs.readdirSync(path).forEach(function(plugin) {
      // Only use js files.
      if (!endsWith(plugin, '.js')) return;

      // Get the path
      var fullPath = p.resolve(path, plugin);
      that.loadPlugin(plugin, fullPath);

    });

    // Register plugins
    this.plugins.forEach(function(plugin){
      if(!plugin.activate) return; // Check if plugin should be activated
        try{
          console.log('[Plugin] Register Plugin: ' + plugin.name);
          plugin.register(that.client, that.plugins);
        } catch (e){
          console.log('[Plugin] Can\'t register plugin '+ plugin.name + '\nReason:' + e);
        }
    });

    console.log('[Plugin] Done loading');
  },

  loadPlugin : function loadPlugin(name, path) {

    var plugin = require(path);
        plugin.activate= plugin.activate || true;
        plugin.name    = plugin.name || name; // Add the filename as name to the plugin.
        plugin.command = plugin.usage ? true : false; // If usage is defined it is a command

    // Add the plugin to the plugins list.
    this.plugins.push(plugin);

    if(plugin.activate)
      console.log('[Plugin] Load plugin: ' + name);
  }
};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports  = Plugins;
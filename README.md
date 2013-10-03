tlkio-bot
=====

Just a quick and dirty little tlkio-bot with a simple plugin mechanisim.

# Live Demo

tlk.io channel: [tlkiobot](http://tlk.io/tlkiobot)


# Getting started

  1. Fork this repo
  2. `npm install`
  3. `node index.js %channel%`

For configuration see the `config.json`


# Writing plugins

Basic Structure:
```
module.exports  = {

  description : 'Say Hi', // Just a short description
  usage       : 'hi',     // How to use this plugin
  activate    : true,     // If plugin should be activated or not

  register : function(client, plugins){

    // Register a command
    client.registerCommand('hi', function(message){
      // Reply
      client.say('@'+message.fromUser.nickname+' Hi');
    });

  }

};
```

Save this as eg. `hi.js` in the plugins folder. **Restart**

# API

The `register` method of each plugin will be called passing a `client` object and a array of `plugins` contaning all loaded plugins.

## The `client` object

The client object is used to communicate with tlk.io and register for commands

###  Methods

`client.say('String')`

Will send a Message with the content 'String'

`client.registerCommand(''|[], function(message){})`

This function will take as the first argument either a String or an Array of Strings and as a second a callback.
If a user writes `@%nameOfTheBot% %command%` it will trigger the registered command callback.

A `message` object looks like this:
```
{
  text : 'Pure Text',
  html : '<b>Pure</b> Text',

  // User that wrote this
  fromUser : {
    nickname : 'NameOfUser',
    twitter  : true|false,
    avatar   : 'url to Avatar'
  },

  commands : ['Array', 'of', 'all', 'commands']
}
```



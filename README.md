tlkio-bot
=====
Just a small little chatbot.

All things connection related is in [tlkio-client](https://github.com/FWeinb/tlkio-client) if you want a little bit more have a look at GitHub's [hubot](https://github.com/github/hubot) in combination with my [hubot-tlkio](https://github.com/FWeinb/hubot-tlkio) adapter.


# Live Demo

tlk.io channel: [tlkiobot](http://tlk.io/tlkiobot)

# Getting started

  1. Fork this repo
  2. `npm install`
  3. `node index.js %channel%`

For configuration see the `config.json`

# Writing plugins

## Command plugins
```
module.exports  = {

  description : 'Say Hi', // Just a short description
  usage       : 'hi',     // How to use this plugin
  activate    : false,     // If plugin should be activated or not alway true if ommited

  register : function(client, plugins){

    // Register a command
    client.registerCommand('hi', function(message){
      // Reply
      client.say('@'+message.fromUser.name+' Hi');
    });

  }

};
```

Save this as eg. `hi.js` in the plugins folder. **Restart**

## Special plugins

If you omit the declartion of `decription` and `usage` your plugin will be tagged as `command = false`. This is usefull if you
don't need to registerCommand() and just want to listen to 'user_joined' etc. (See SayHelloOnJoined.js or SayHiToAll.js)

# API

The `register` method of each plugin will be called passing a `client` object and a array of `plugins` contaning all loaded plugins.

## The `client` object

The client object is used to communicate with tlk.io and register for commands

###  Methods

`client.say('String')`

Will send a Message with the content 'String'

`client.registerCommand(''|[], function(message){})`

This function will take either a string or an array of strings as the first argument and a callback as second.
If a user writes `@%nameOfTheBot% %command%` it will trigger the registered command callback for the used `%command%`.

the callback will be called with a `message` object which looks like this:
```
{
  id   : 'messgaeid',
  text : 'Pure Text',
  html : '<b>Pure</b> Text',

  // User that wrote this
  fromUser : {
    id  : 'ID',
    name : 'NameOfUser',
    details : {
      twitter  : true|false,
      avatar   : 'url of avatar'
    }
  },

  commands : ['array', 'of', 'all', 'commands'] // All lowercase
}
```

`client.on('user_joined' | 'user_left' | 'online_participants', function(data))`

Register special events.

`user_joined` will call the callback function with a user object like this:
```{
  id    : 'userid',
  name  : 'NameOfUser',
  details : {
    twitter  : true|false,
    avatar   : 'url of avatar'
  }
}
```
`user_left` will only contain the token like this:
```
{
  id    : 'userid'
}
```

'online_participants' will call the callback function with an array of registered users and the count of guests. This event will only fire once after the bot joined.
```
[{
  id    : 'userid',
  name  : 'NameOfUser',
  details : {
    twitter  : true|false,
    avatar   : 'url of avatar'
  }
}, ...]
```

See `SayHellOnJoined.js` and `SayHiToAll.js` in `plugins`






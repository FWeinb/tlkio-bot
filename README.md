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

## Command plugins
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
  text : 'Pure Text',
  html : '<b>Pure</b> Text',

  // User that wrote this
  fromUser : {
    nickname : 'NameOfUser',
    twitter  : true|false,
    avatar   : 'url of avatar'
  },

  commands : ['Array', 'of', 'all', 'commands']
}
```

`client.on('user_joined' | 'user_left' | 'online_participants', function(data))`

Register special events.

`user_joined` will call the callback function with a user object like this:
```{
  token    : 'tlkiousertoken',
  nickname : 'NameOfUser',
  twitter  : true|false,
  avatar   : 'url of avatar'
}
```
`user_left` will only contain the token like this:
```
{
  token    : 'tlkiousertoken'
}
```

'online_participants' will call the callback function with an array of registered users and the count of guests. This event will only fire once  after the bot joined.
```
[{
  like the user object from user_joined
}, ...]
```

See `SayHellOnJoined.js` and `SayHiToAll.js` in `plugins`






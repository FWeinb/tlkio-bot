var Q               = require('q'),
    util            = require('util'),
    EventEmitter    = require('events').EventEmitter,

    request         = require('request'),
    WebSocketClient = require('websocket').client;


// The Public API
var TlkIOClient = function(options){
  var self = this;
  // Get CsrfToken and chat_id, add participant
  RequestCsrfToken(options)
  .then(function(tlkio){

    // Talkio will hold the csrftoken, chatid and a sendMessage function.

    // Connect to the WebSocket
    InitWebSocketClient(tlkio, self)
    .then(function(){
      self.connection = tlkio;
      self.emit('init', tlkio);
    });

  });
};

// Inherit the EventEmitter
util.inherits(TlkIOClient, EventEmitter);

// Make it possible to Say something.
TlkIOClient.prototype.say = function(message){
   this.connection.sendMessage(message);
   return this;
};
TlkIOClient.prototype.registerCommand = function(command, callback){
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


module.exports = TlkIOClient;


// Private Functions

function RequestCsrfToken(options){
  // Create a deferred object
  var deferred = Q.defer();

  request({
    method : 'GET',
    uri    : 'http://tlk.io/'+options.channel,
    jar    : true
  }, function(error, response, body){

    /* I now regex is bad, but it get's shit done... */
    var matchCsrf   = /<meta content="(.*?)" name="csrf-token" \/>/.exec(body), // Extract CSRF Token
        matchChatId = /chat_id: '(.*?)'/.exec(body); // Extract chat:_id

    // Create a tlkio object that holdes these infos.
    var tlkio = {
      csrf   : matchCsrf[1],
      chatid : matchChatId[1]
    };


    postRequest( {
        uri     : 'http://tlk.io/api/participant',
        channel : options.channel,
        csrf    : tlkio.csrf,
        data    : options.user
      },
      function(error, response, body){
        // The body will hold the user as JSON
        tlkio.user        = JSON.parse(body);
        tlkio.user.avatar = options.user.avatar; // add the avatar to the user object

        // Prepare the message post request
        var messagesRequest = {
          uri     : 'http://tlk.io/'+options.channel+'/messages',
          channel : options.channel,
          csrf    : tlkio.csrf
        };

        tlkio.sendMessage = function(message){
          messagesRequest.data = {body : message};
          postRequest(messagesRequest);
        };
        // Resolve
        deferred.resolve(tlkio);
      });
  });

  return deferred.promise;
}


function InitWebSocketClient(tlkio, tlkioClient){
  var deferred  = Q.defer();
  var client    = new WebSocketClient();

  client.on('connect', function(connection) {

    // Action Map
    var actions = {
      // Subscribe and authenticate user
      onInit : function (){
        connection.sendUTF('5:::{"name":"subscribe","args":[{"chat_id":"'+tlkio.chatid+'","user_info":null}]}');
        connection.sendUTF('5:::{"name":"authenticate","args":['+JSON.stringify(tlkio.user)+']}');

        // Resolve the promise
        deferred.resolve();
      },

      message : function(args){
          var data = args.data,
              type = args.type.toLowerCase();

          // If it's a message
          if (type === 'message'){

            // If it's not a message from us
            if (data.token !== tlkio.user.token){

              // Removing all the html tags
              var message = data.body.trim().replace(/(<([^>]+)>)/ig,'');

              if (message.toLowerCase().indexOf('@'+tlkio.user.nickname.toLowerCase()) === 0){
                var commands = message.split(' ');
                if (commands.length > 0){
                  if (commands[1] !== undefined){
                    var keyCommand = commands[1].toLowerCase();

                    // Remove the first to commands
                    commands.shift();
                    commands.shift();

                    // Invoke the command
                    tlkioClient.emit('command__'+keyCommand, {text : message, html : data.body, fromUser : data.user, commands : commands});
                  }
                }
              }
            }
          }else if(type === 'user_joined' || type === 'user_left' || type === 'guest_joind'){
            tlkioClient.emit(type, data);
          }else if(type === 'online_participants'){
            tlkioClient.emit(type, data.users, data.guests_count);
          }
      }
    };

    connection.on('message', function(message) {
      if (message.utf8Data.indexOf('1::') === 0){
        actions.onInit();
      } else if (message.utf8Data.indexOf('5:::') === 0){
        var json = JSON.parse(message.utf8Data.substr(4)),
            func = actions[json.name];

        if (func){
          json.args = json.args.map(function(i){ return JSON.parse(i);});
          func.apply(actions, json.args);
        }
      }
    });

    // KeepAlive
    setTimeout(function beat(){
      connection.sendUTF('2::');
      setTimeout(beat, 45000);
    }, 45000);

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

  });



  client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error);
  });

  request({
    method : 'GET',
    uri    : "http://ws.tlk.io/socket.io/1",
    headers : {
      origin : 'http://tlk.io'
    }
  }, function(error, response, body){
    var parts = body.split(':');
    client.connect('ws://ws.tlk.io/socket.io/1/websocket/'+parts[0], undefined, 'http://tlk.io');
  });

  return deferred.promise;
}

/*
 * options : { uri : '', channel : '', csrf : '', data : {}}
 */
function postRequest(options, callback){
  request({
    method : 'POST',
    uri : options.uri,
    jar : true,
    headers : {
      Origin : 'http://tlk.io',
      Referer: 'http://tlk.io/'+options.channel,
      'X-CSRF-Token' : options.csrf,
      'X-Requested-With':'XMLHttpRequest',
      'Content-Type':'application/json',
      'Accept':'application/json, text/javascript, */*; q=0.01'
    },
    body : JSON.stringify(options.data)
  }, callback ? callback : undefined);
}
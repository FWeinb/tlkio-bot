module.exports  = {

  register : function(client, plugins){

    client.on('online_participants', function(users, guests_count){
      var message = 'Hi ';
      for (var i=0;i<users.length;i++){
        var user = users[i];
        message += ' @'+user.name;
      }
      if (guests_count > 0){
        message += ' and ' + guests_count + ' guest';
      }

      client.say(message);
    });


  }

};